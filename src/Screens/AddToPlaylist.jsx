import {
  Alert,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BottomSliderFull from "../UI/BottomSliderFull";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { theme } from "../utils/colors";
import { ThemeContext } from "../store/theme";
import { SoundContext } from "../store/soundFunc";
import { addSoundPlaylistApi, userPlaylistApi } from "../utils/api";
import { UiContext } from "../store/ui";
import GenLoadingAnimation from "../components/lottie/GenLoadingAnimation";
import NoDataAnimation from "../components/lottie/NoDataAnimation";

const Playlist = ({ title, playlist, id }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);
  const options = soundCtx.currentSoundOptions;
  const uiCtx = useContext(UiContext);

  const addToPlaylistHandler = async () => {
    if (playlist.includes(options.id)) {
      uiCtx.toastBoard("Already exist");
      return;
    }
    await addSoundPlaylistApi(id, options.id);
    playlist.unshift(options.id);
    uiCtx.toastBoard("Sound Added");
  };

  return (
    <Pressable
      onPress={addToPlaylistHandler}
      style={styles.playlistItem}
      android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
    >
      <Entypo
        name="folder-music"
        size={50}
        color={theme[`sBg-${colorIndex}`]}
      />

      <Text style={[styles.textItem, { color: theme[`pT-${colorIndex}`] }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const AddToPlaylist = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);

  const [loading, setLoading] = useState(false);
  const noData = soundCtx.allPlaylist.length <= 0;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const playlistArr = await userPlaylistApi();
      if (!playlistArr) return console.log("login or signup");
      const transformedPlaylist = playlistArr.map((list) => ({
        title: list.title,
        id: list._id,
        playlist: list.playlist,
      }));
      soundCtx.updatePlaylist(transformedPlaylist.reverse());
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const backAction = () => {
      soundCtx.toggleAddToPlaylistBoard();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <BottomSliderFull>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Pressable onPress={soundCtx.toggleAddToPlaylistBoard}>
            <AntDesign
              name="left"
              size={27}
              color={theme[`pT-${colorIndex}`]}
            />
          </Pressable>

          <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
            Add To Playlist
          </Text>
        </View>

        <View style={styles.listContainer}>
          {loading && <GenLoadingAnimation width={100} height={100} />}

          {!loading && (
            <>
              {noData && <NoDataAnimation width={300} height={300} />}
              
              <FlatList
                showsVerticalScrollIndicator={false}
                data={soundCtx.allPlaylist}
                renderItem={({ item }) => (
                  <Playlist
                    title={item.title}
                    id={item.id}
                    playlist={item.playlist}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
        </View>
      </View>
    </BottomSliderFull>
  );
};

export default AddToPlaylist;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "7%",
    paddingHorizontal: "4%",
  },

  text: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: "25%",
  },

  textItem: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: "3%",
  },

  titleContainer: {
    flexDirection: "row",
    marginBottom: "8%",
  },

  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    paddingVertical: "2%",
  },

  listContainer: {
    width: "100%",
    marginBottom: "20%",
  },
});
