import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeadText from "../UI/HeadText";
import GenLoadingAnimation from "../components/lottie/GenLoadingAnimation";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <GenLoadingAnimation width={200} height={200} />
      <HeadText text={"Loading..."} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
