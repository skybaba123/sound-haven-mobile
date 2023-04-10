import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import { SoundContext } from "../store/soundFunc";
import PlayingAnimation from "./lottie/PlayingAnimation";

const Sound = ({
  image,
  soundName,
  owner,
  url,
  index,
  onPress,
  id,
  currentArray,
}) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);

  const active =
    soundCtx.currentSoundArray.current[soundCtx.currentSoundIndex.current]
      ?.id === id;

  const optionsHandler = () => {
    soundCtx.getCurrentSoundOptions(
      image,
      soundName,
      owner,
      id,
      url,
      index,
      currentArray
    );
    soundCtx.toggleOptionBoard();
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(700)}
      exiting={FadeOutDown.duration(700)}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: theme[`ac-${colorIndex}`] }}
        style={styles.subContainer}
      >
        <Image style={styles.image} source={image} />
        <View>
          <Text
            style={[
              styles.soundName,
              {
                color: active
                  ? theme[`ac-${colorIndex}`]
                  : theme[`pT-${colorIndex}`],
              },
            ]}
          >
            {soundName}
          </Text>
          <Text
            style={[
              styles.owner,
              {
                color: active
                  ? theme[`ac-${colorIndex}`]
                  : theme[`sT-${colorIndex}`],
              },
            ]}
          >
            {owner}
          </Text>
        </View>
      </Pressable>
      {active && soundCtx.isPlaying && (
        <PlayingAnimation width={80} height={80} />
      )}
      <Pressable onPress={optionsHandler}>
        <Feather
          name="more-vertical"
          size={26}
          color={theme[`ac-${colorIndex}`]}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Sound;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },

  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  image: {
    height: width > 411 ? 75 : 50,
    width: width > 411 ? 75 : 50,
    borderRadius: 10,
    marginRight: "3%",
  },

  soundName: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginBottom: "3%",
  },

  owner: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
  },
});
