import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/theme";
import { theme } from "../../utils/colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SoundContext } from "../../store/soundFunc";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deletePlaylistApi, userPlaylistApi } from "../../utils/api";
import GenLoadingAnimation from "../lottie/GenLoadingAnimation";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { UiContext } from "../../store/ui";
import NoDataAnimation from "../lottie/NoDataAnimation";

const Playlist = ({ cover, title, id, playlist }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const navigation = useNavigation();
  const soundCtx = useContext(SoundContext);
  const uiCtx = useContext(UiContext);
  const [showActions, setShowActions] = useState(false);

  const playlistNavigationHandler = () => {
    navigation.navigate("SingleScreen", {
      screen: "playlistContent",
      params: { id, playlist, title },
    });
  };

  const deletePlaylistHandler = async () => {
    await deletePlaylistApi(id);
    const playlistArr = await userPlaylistApi();
    const transformedPlaylist = playlistArr.map((list) => ({
      title: list.title,
      id: list._id,
      playlist: list.playlist,
    }));
    soundCtx.updatePlaylist(transformedPlaylist.reverse());
    uiCtx.toastBoard("Playlist Deleted");
  };

  const items = (
    <Pressable
      onLongPress={() => setShowActions(true)}
      onPress={playlistNavigationHandler}
      style={styles.containerImage}
      android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
    >
      {cover ? (
        <Image
          source={cover}
          style={{ width: 50, height: 50, marginRight: "5%" }}
        />
      ) : (
        <Entypo
          name="folder-music"
          size={50}
          color={theme[`sBg-${colorIndex}`]}
        />
      )}

      <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
        {title}
      </Text>
    </Pressable>
  );

  const actions = (
    <Animated.View
      entering={FadeInLeft.duration(400)}
      exiting={FadeOutRight.duration(200)}
      style={styles.actionsContainer}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons
          style={{ marginRight: "5%" }}
          name="delete"
          size={50}
          color={theme[`sBg-${colorIndex}`]}
        />
        <Text style={[styles.actionText, { color: theme[`pT-${colorIndex}`] }]}>
          Delete Playlist?
        </Text>
      </View>

      <Pressable
        onPress={deletePlaylistHandler}
        android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
        style={{ backgroundColor: theme[`ac-${colorIndex}`], padding: 6 }}
      >
        <Text style={[styles.actionText, { color: theme[`pT-${colorIndex}`] }]}>
          Ok
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setShowActions(false)}
        android_ripple={{ color: theme[`pBg-${colorIndex}`] }}
        style={{ backgroundColor: theme[`sBg-${colorIndex}`], padding: 6 }}
      >
        <Text style={[styles.actionText, { color: theme[`pT-${colorIndex}`] }]}>
          Cancel
        </Text>
      </Pressable>
    </Animated.View>
  );

  return <>{showActions ? actions : items}</>;
};

const MyPlaylist = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);
  const [loading, setLoading] = useState(false);
  const noData = soundCtx.allPlaylist.length <= 0;

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={soundCtx.toggleAddPlaylistBoard}
          style={styles.addPlaylist}
        >
          <MaterialIcons
            name="my-library-add"
            size={50}
            color={theme[`ac-${colorIndex}`]}
          />
          <Text
            style={{
              color: theme[`pT-${colorIndex}`],
              fontFamily: "montserrat-medium",
            }}
          >
            New Playlist
          </Text>
        </Pressable>

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
    </>
  );
};

export default MyPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    paddingVertical: "2%",
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
    alignItems: "center",
    marginBottom: "5%",
  },

  addPlaylist: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "46%",
    marginBottom: "3%",
  },

  text: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: "5%",
  },

  actionText: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
  },

  icon: {},

  listContainer: {
    width: "100%",
    marginBottom: "20%",
  },
});
