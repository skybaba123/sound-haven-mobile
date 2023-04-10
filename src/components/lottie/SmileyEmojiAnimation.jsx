import { View } from "react-native";
import LottieView from "lottie-react-native";

const SmileyEmojiAnimation = ({ width, height }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        source={require("../../../assets/lottie/9879-smiley-emoji.json")}
        autoPlay={true}
        loop={true}
        style={{
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

export default SmileyEmojiAnimation;
