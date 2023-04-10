import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import BottomSliderFull from "../UI/BottomSliderFull";
import { SoundContext } from "../store/soundFunc";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import GenLoadingAnimation from "../components/lottie/GenLoadingAnimation";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AuthContext } from "../store/auth";
import { formattedTime } from "../utils/formattedDate";

const Playing = () => {
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);
  const colorIndex = useContext(ThemeContext).colorIndex;
  const currentSound =
    soundCtx.currentSoundArray.current[soundCtx.currentSoundIndex.current];
  const { width, height } = Dimensions.get("screen");

  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const time = setInterval(() => {
      soundCtx.soundRef.current && getStatus();
    }, 500);

    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    const backAction = () => {
      soundCtx.togglePlayingBoard();
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

  const getStatus = useCallback(async () => {
    try {
      const status = await soundCtx.soundRef.current.getStatusAsync();
      const { positionMillis, durationMillis, isLoaded } = status;
      const percentage = (positionMillis / durationMillis) * 100;
      isLoaded
        ? setDuration(formattedTime(durationMillis))
        : setDuration("0:00");
      isLoaded
        ? setPosition(formattedTime(positionMillis))
        : setPosition("0:00");
      isLoaded ? setProgress(percentage) : setProgress(0);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { id: playingSoundId } =
    soundCtx.currentSoundArray.current[soundCtx.currentSoundIndex.current];

  const isFav = authCtx.favoriteSounds.includes(playingSoundId);

  const addToPlaylistHandler = () => {
    const { image, soundName, owner, id, url } =
      soundCtx.currentSoundArray.current[soundCtx.currentSoundIndex.current];

    soundCtx.getCurrentSoundOptions(
      image,
      soundName,
      owner,
      id,
      url,
      soundCtx.currentSoundIndex.current,
      soundCtx.currentSoundArray.current
    );

    soundCtx.toggleAddToPlaylistBoard();
    soundCtx.togglePlayingBoard();
  };

  const addToFavouriteHandler = () => {
    soundCtx.addNewFavouriteHandler(playingSoundId);
  };

  return (
    <BottomSliderFull onPress={soundCtx.togglePlayingBoard}>
      <ImageBackground style={{ flex: 1 }} source={currentSound?.image}>
        <View
          style={[styles.container, { backgroundColor: "rgba(0, 0, 0, 0.87)" }]}
        >
          <Pressable
            onPress={soundCtx.togglePlayingBoard}
            style={{
              width: "80%",
              marginBottom: "10%",
            }}
          >
            <Ionicons
              name="md-chevron-down-outline"
              size={40}
              color={theme[`ac-${colorIndex}`]}
            />
          </Pressable>

          <Image style={styles.imageStyle} source={currentSound?.image} />

          <Text
            style={[styles.soundText, { color: theme[`pT-${colorIndex}`] }]}
          >
            {currentSound?.soundName}
          </Text>
          <Text
            style={[styles.ownerText, { color: theme[`sT-${colorIndex}`] }]}
          >
            {currentSound?.owner}
          </Text>

          <View style={styles.controller}>
            {soundCtx.modeUpdate === "singleMode" && (
              <Pressable
                onPress={soundCtx.setPlayingMode.bind(this, "loopMode")}
              >
                <MaterialIcons
                  name="repeat-one"
                  size={30}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            )}

            {soundCtx.modeUpdate === "loopMode" && (
              <Pressable
                onPress={soundCtx.setPlayingMode.bind(this, "singleMode")}
              >
                <MaterialIcons
                  name="loop"
                  size={30}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            )}

            <Pressable onPress={addToPlaylistHandler}>
              <MaterialIcons
                name="playlist-add"
                size={30}
                color={theme[`sT-${colorIndex}`]}
              />
            </Pressable>

            {isFav && (
              <Pressable onPress={addToFavouriteHandler}>
                <AntDesign
                  name="heart"
                  size={30}
                  color={theme[`ac-${colorIndex}`]}
                />
              </Pressable>
            )}

            {!isFav && (
              <Pressable onPress={addToFavouriteHandler}>
                <AntDesign
                  name="hearto"
                  size={30}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            )}
          </View>

          <View style={{ width: "100%", paddingHorizontal: "12%" }}>
            <View
              style={[
                styles.statusbarContainer,
                { backgroundColor: theme[`sBg-${colorIndex}`] },
              ]}
            >
              <View
                style={[
                  styles.statusbar,
                  {
                    backgroundColor: theme[`ac-${colorIndex}`],
                    width: `${progress}%`,
                  },
                ]}
              ></View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: theme[`sT-${colorIndex}`],
                  fontFamily: "montserrat-medium",
                }}
              >
                {position}
              </Text>
              <Text
                style={{
                  color: theme[`sT-${colorIndex}`],
                  fontFamily: "montserrat-medium",
                }}
              >
                {duration}
              </Text>
            </View>
          </View>

          <View style={styles.controller}>
            <Pressable onPress={soundCtx.playPrevHandler}>
              <AntDesign
                name="stepbackward"
                size={35}
                color={theme[`ac-${colorIndex}`]}
              />
            </Pressable>

            <Pressable onPress={soundCtx.fastBackward}>
              <Entypo
                name="controller-fast-backward"
                size={35}
                color={theme[`ac-${colorIndex}`]}
              />
            </Pressable>

            {!soundCtx.isLoading && !soundCtx.isPlaying && (
              <Animated.View
                exiting={FadeOut.duration(100)}
                entering={FadeIn.duration(100)}
              >
                <Pressable onPress={soundCtx.playSound}>
                  <MaterialIcons
                    name="play-circle-filled"
                    size={width > 411 ? 100 : 70}
                    color={theme[`ac-${colorIndex}`]}
                  />
                </Pressable>
              </Animated.View>
            )}

            {soundCtx.isLoading && (
              <Animated.View
                exiting={FadeOut.duration(100)}
                entering={FadeIn.duration(100)}
              >
                <GenLoadingAnimation width={100} height={100} />
              </Animated.View>
            )}

            {!soundCtx.isLoading && soundCtx.isPlaying && (
              <Animated.View
                exiting={FadeOut.duration(100)}
                entering={FadeIn.duration(100)}
              >
                <Pressable onPress={soundCtx.pauseSound}>
                  <MaterialIcons
                    name="pause-circle-filled"
                    size={width > 411 ? 100 : 70}
                    color={theme[`ac-${colorIndex}`]}
                  />
                </Pressable>
              </Animated.View>
            )}

            <Pressable onPress={soundCtx.fastforward}>
              <Entypo
                name="controller-fast-forward"
                size={35}
                color={theme[`ac-${colorIndex}`]}
              />
            </Pressable>

            <Pressable onPress={soundCtx.playNextHandler}>
              <AntDesign
                name="stepforward"
                size={35}
                color={theme[`ac-${colorIndex}`]}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </BottomSliderFull>
  );
};

export default Playing;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "5%",
  },

  imageStyle: {
    width: "80%",
    height: "40%",
    borderRadius: 10,
    marginBottom: "5%",
  },

  statusbarContainer: {
    height: 6,
    width: "100%",
    marginBottom: "2%",
    borderRadius: 10,
  },

  statusbar: { height: 6, borderRadius: 10 },

  soundText: {
    fontFamily: "montserrat-bold",
    fontSize: 17,
    marginBottom: "3%",
  },

  ownerText: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
    marginBottom: "10%",
  },

  controller: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginBottom: width >= 411 ? 30 : 10,
  },
});
