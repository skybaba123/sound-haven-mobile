import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Favorite from "../components/library/Favorite";
import MyPlaylist from "../components/library/MyPlaylist";
import { ThemeContext } from "../store/theme";

import { theme } from "../utils/colors";

const Tab = createMaterialTopTabNavigator();

const LibraryScreen = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "montserrat-bold",
          },
          tabBarActiveTintColor: theme[`pT-${colorIndex}`],
          tabBarInactiveTintColor: theme[`sT-${colorIndex}`],
          tabBarIndicatorStyle: {
            backgroundColor: theme[`ac-${colorIndex}`],
            width: "2%",
            marginLeft: "17%",
            height: 5,
            borderRadius: 10,
          },
          tabBarStyle: {
            backgroundColor: theme[`pBg-${colorIndex}`],
            shadowColor: theme[`pBg-${colorIndex}`],
          },
        }}
        sceneContainerStyle={{
          backgroundColor: theme[`pBg-${colorIndex}`],
        }}
      >
        <Tab.Screen name="My Playlist" component={MyPlaylist} />
        <Tab.Screen name="Favorites" component={Favorite} />
      </Tab.Navigator>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingRight: "10%",
  },
});
