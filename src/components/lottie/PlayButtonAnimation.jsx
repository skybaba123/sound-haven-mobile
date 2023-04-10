import { useContext } from "react";
import { Pressable } from "react-native";
import { ThemeContext } from "../../store/theme";
import LottieView from "lottie-react-native";
import { theme } from "../../utils/colors";

const PlayButtonAnimation = ({ width, height, onPress }) => {
  const themeCtx = useContext(ThemeContext);
  const colorIndex = themeCtx.colorIndex;

  return (
    <Pressable onPress={onPress} style={{ alignItems: "center" }}>
      <LottieView
        source={require("../../../assets/lottie/83707-play-button-pulse.json")}
        autoPlay={true}
        loop={true}
        colorFilters={[
          { keypath: "Shape Layer 1", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 2", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 3", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 4", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 5", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 6", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 7", color: theme[`ac-${colorIndex}`] },
          { keypath: "Shape Layer 8", color: theme[`pT-${colorIndex}`] },
          { keypath: "Shape Layer 9", color: theme[`ac-${colorIndex}`] },
        ]}
        style={{
          width: width,
          height: height,
        }}
      />
    </Pressable>
  );
};

export default PlayButtonAnimation;
