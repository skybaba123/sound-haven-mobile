import { View } from "react-native";
import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { theme } from "../../utils/colors";
import { ThemeContext } from "../../store/theme";

const PlayingAnimation = ({ width, height }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        style={{ width, height }}
        autoPlay={true}
        loop={true}
        colorFilters={[
          { keypath: "Shape Layer 3", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 2", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 1", color: theme[`ac-${colorIndex}`] },
        ]}
        source={require("../../../assets/lottie/1954-playing.json")}
      />
    </View>
  );
};

export default PlayingAnimation;
