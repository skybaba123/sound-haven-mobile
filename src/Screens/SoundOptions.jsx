import {
  BackHandler,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import BottomSliderSmall from "../UI/BottomSliderSmall";
import { SoundContext } from "../store/soundFunc";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth";

const SoundOptions = () => {
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);
  const options = soundCtx.currentSoundOptions;
  const colorIndex = useContext(ThemeContext).colorIndex;
  const isFav = authCtx.favoriteSounds.includes(options.id);

  const addToFavouriteHandler = () => {
    soundCtx.addNewFavouriteHandler(options.id);
  };

  const addToPlaylistHandler = () => {
    soundCtx.toggleAddToPlaylistBoard();
    soundCtx.toggleOptionBoard();
  };

  useEffect(() => {
    const backAction = () => {
      soundCtx.toggleOptionBoard();
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
    <BottomSliderSmall onPress={soundCtx.toggleOptionBoard}>
      <Animated.View
        entering={FadeInDown.duration(1000)}
        style={styles.container}
      >
        <View
          style={[
            styles.detailsContainer,
            { borderBottomColor: theme[`ac-${colorIndex}`] },
          ]}
        >
          <Image style={styles.imageStyle} source={options?.image} />
          <View>
            <Text
              style={[styles.soundName, { color: theme[`pT-${colorIndex}`] }]}
            >
              {options?.soundName}
            </Text>
            <Text style={[styles.owner, { color: theme[`sT-${colorIndex}`] }]}>
              {options?.owner}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={addToFavouriteHandler}
          style={styles.itemsContainer}
        >
          {isFav && (
            <AntDesign
              name="heart"
              size={25}
              color={theme[`ac-${colorIndex}`]}
            />
          )}

          {!isFav && (
            <AntDesign
              name="hearto"
              size={25}
              color={theme[`ac-${colorIndex}`]}
            />
          )}

          <Text
            style={[styles.itemsText, { color: theme[`pT-${colorIndex}`] }]}
          >
            Favourite
          </Text>
        </Pressable>

        <Pressable onPress={addToPlaylistHandler} style={styles.itemsContainer}>
          <MaterialIcons
            name="playlist-add"
            size={25}
            color={theme[`ac-${colorIndex}`]}
          />

          <Text
            style={[styles.itemsText, { color: theme[`pT-${colorIndex}`] }]}
          >
            Add to Playlist
          </Text>
        </Pressable>

        <Pressable style={styles.itemsContainer}>
          <Ionicons
            name="person-outline"
            size={25}
            color={theme[`ac-${colorIndex}`]}
          />
          <Text
            style={[styles.itemsText, { color: theme[`pT-${colorIndex}`] }]}
          >
            Owner
          </Text>
        </Pressable>
      </Animated.View>
    </BottomSliderSmall>
  );
};

export default SoundOptions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.3,
    paddingBottom: "3%",
    marginBottom: "4%",
  },

  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: "4%",
  },

  soundName: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginBottom: "1%",
  },

  owner: {
    fontFamily: "montserrat-medium",
    fontSize: 13,
  },

  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "6%",
  },

  itemsText: {
    fontFamily: "montserrat-medium",
    fontSize: 13,
    marginLeft: "5%",
  },
});
