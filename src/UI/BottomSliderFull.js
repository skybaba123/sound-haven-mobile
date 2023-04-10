import { Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { theme } from "../utils/colors";
import { ThemeContext } from "../store/theme";

const BottomSliderFull = ({ children, onPress }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <>
      <Pressable onPress={onPress} style={styles.overlay}></Pressable>
      <Animated.View
        entering={SlideInDown.duration(300)}
        exiting={SlideOutDown.duration(300)}
        style={[
          styles.container,
          { backgroundColor: theme[`pBg-${colorIndex}`] },
        ]}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default BottomSliderFull;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    bottom: 0,
    width: "100%",
    position: "absolute",
    zIndex: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },

  overlay: {
    height: "100%",
    bottom: 0,
    width: "100%",
    position: "absolute",
    zIndex: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    backgroundColor: "black",
    opacity: 0.5,
  },
});
