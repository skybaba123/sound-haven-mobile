import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
const StatusBarIN = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  return (
    <StatusBar
      backgroundColor={theme[`pBg-${colorIndex}`]}
      style={theme[`sb-${colorIndex}`]}
    />
  );
};

export default StatusBarIN;
