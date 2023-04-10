import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { theme } from "../utils/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../store/theme";
import { UiContext } from "../store/ui";

const FavToast = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const uiCtx = useContext(UiContext);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container]}
    >
      <View style={styles.contentContainer}>
        {uiCtx.favToastMode === "add" && (
          <AntDesign name="heart" size={50} color={theme[`ac-${colorIndex}`]} />
        )}
        {uiCtx.favToastMode === "remove" && (
          <Ionicons
            name="heart-dislike-outline"
            size={50}
            color={theme[`sBg-${colorIndex}`]}
          />
        )}

        <Text style={styles.text}>
          {uiCtx.favToastMode === "add"
            ? "Added To Favourites"
            : "Removed From Favourites"}
        </Text>
      </View>
    </Animated.View>
  );
};

export default FavToast;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    alignItems: "center",
  },

  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },

  text: {
    color: theme["pT-0"],
    fontFamily: "montserrat-medium",
    marginTop: "5%",
  },
});
