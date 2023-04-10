import { View } from "react-native";
import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { theme } from "../../utils/colors";
import { ThemeContext } from "../../store/theme";

const GenLoadingAnimation = ({ width, height }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        style={{ width, height }}
        autoPlay={true}
        loop={true}
        colorFilters={[
          { keypath: "Left", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 6", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 5", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 4", color: theme[`ac-${colorIndex}`] },
        ]}
        source={require("../../../assets/lottie/98194-loading.json")}
      />
    </View>
  );
};

export default GenLoadingAnimation;
