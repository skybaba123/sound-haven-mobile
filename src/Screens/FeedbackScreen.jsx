import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FeedbackScreen</Text>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "15%",
  },
});
