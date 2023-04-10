import { View } from "react-native";
import LottieView from "lottie-react-native";

const BeamingAnimation = ({ width, height, style }) => {
  return (
    <View style={[{ alignItems: "center" }, style]}>
      <LottieView
        source={require("../../../assets/lottie/1115-ripple.json")}
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

export default BeamingAnimation;
