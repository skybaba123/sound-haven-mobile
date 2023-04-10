import { View } from "react-native";
import LottieView from "lottie-react-native";

const NoDataAnimation = ({ width, height, style }) => {
  return (
    <View style={[{ alignItems: "center" }, style]}>
      <LottieView
        source={require("../../../assets/lottie/67375-no-data.json")}
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

export default NoDataAnimation;
