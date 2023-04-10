import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AccountDetails from "../components/settings/AccountDetails";

const SettingScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <AccountDetails />
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
    paddingHorizontal: "2%",
  },
});
