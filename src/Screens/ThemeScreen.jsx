import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const data = [
  {
    image: require(`../../assets/theme-preview/0.jpg`),
    id: 0,
    colors: [theme["pBg-0"], theme["ac-0"]],
  },

  {
    image: require(`../../assets/theme-preview/1.jpg`),
    id: 1,
    colors: [theme["pBg-1"], theme["ac-1"]],
  },

  {
    image: require(`../../assets/theme-preview/2.jpg`),
    id: 2,
    colors: [theme["pBg-2"], theme["ac-2"]],
  },

  {
    image: require(`../../assets/theme-preview/3.jpg`),
    id: 3,
    colors: [theme["pBg-3"], theme["ac-3"]],
  },

  {
    image: require(`../../assets/theme-preview/4.jpg`),
    id: 4,
    colors: [theme["pBg-4"], theme["ac-4"]],
  },

  {
    image: require(`../../assets/theme-preview/5.jpg`),
    id: 5,
    colors: [theme["pBg-5"], theme["ac-5"]],
  },
];

const ColorCard = ({ colors, confirm, id, onPress }) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <LinearGradient
      colors={colors}
      style={{
        width: width > 411 ? 100 : 60,
        height: width > 411 ? 100 : 60,
        borderRadius: 10,
        marginRight: 10,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {confirm === id && (
          <AntDesign
            name="checkcircle"
            size={width > 411 ? 50 : 30}
            color="white"
          />
        )}
      </Pressable>
    </LinearGradient>
  );
};

const ThemeScreen = ({ navigation }) => {
  const changeTheme = useContext(ThemeContext).changeTheme;
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [confirm, setConfirm] = useState(colorIndex);

  const previewThemeHandler = (id) => {
    setConfirm(id);
  };

  const activateTheme = () => {
    changeTheme(confirm);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: "70%", resizeMode: "contain" }}
        source={data[confirm].image}
      />

      <Pressable
        onPress={activateTheme}
        android_ripple={{ color: "grey" }}
        style={{
          backgroundColor: "white",
          padding: 10,
          marginTop: "3%",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontFamily: "montserrat-medium" }}>Activate theme</Text>
      </Pressable>

      <Animated.View
        entering={FadeInDown.duration(1000)}
        style={styles.colorContainer}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ColorCard
              colors={item.colors}
              confirm={confirm}
              id={item.id}
              onPress={previewThemeHandler.bind(this, item.id)}
            />
          )}
        />
      </Animated.View>
    </View>
  );
};

export default ThemeScreen;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: "15%",
    alignItems: "center",
  },

  colorContainer: {
    borderTopWidth: 2,
    borderTopColor: "white",
    width: "100%",
    bottom: width > 411 ? 30 : 20,
    position: "absolute",
    paddingTop: 15,
  },
});
