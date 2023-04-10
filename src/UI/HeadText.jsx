import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";

const HeadText = ({ text, style }) => {
  const themeCtx = useContext(ThemeContext);
  const colorIndex = themeCtx.colorIndex;
  return (
    <Text
      style={[styles.logoText, { color: theme[`pT-${colorIndex}`] }, style]}
    >
      {text}
    </Text>
  );
};

export default HeadText;

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "satisfy",
    fontSize: 35,
    textAlign: "center",
  },
});
