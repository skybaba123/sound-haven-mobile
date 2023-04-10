import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

const BottomSliderSmall = ({ children, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress} style={styles.overlay}></Pressable>
      <Animated.View
        entering={SlideInDown.duration(500)}
        exiting={SlideOutDown.duration(500)}
        style={styles.container}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default BottomSliderSmall;

const styles = StyleSheet.create({
  container: {
    height: "50%",
    bottom: 0,
    width: "100%",
    backgroundColor: "#151515",
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
