import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BottomSliderFull from "../UI/BottomSliderFull";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { SoundContext } from "../store/soundFunc";

const AddPlaylist = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    const backAction = () => {
      soundCtx.toggleAddPlaylistBoard();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const addNewPlaylist = () => {
    if (titleInput.length <= 3) {
      return Alert.alert("Playlist", "Title too small");
    }
    soundCtx.addNewPlaylistHandler(titleInput);
    soundCtx.toggleAddPlaylistBoard();
  };

  return (
    <BottomSliderFull>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Pressable onPress={soundCtx.toggleAddPlaylistBoard}>
            <AntDesign
              name="left"
              size={27}
              color={theme[`pT-${colorIndex}`]}
            />
          </Pressable>

          <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
            Add Playlist Title
          </Text>

          <Pressable
            onPress={addNewPlaylist}
            style={[
              styles.button,
              { backgroundColor: theme[`ac-${colorIndex}`] },
            ]}
          >
            <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
              OK
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
          Playlist Title
        </Text>

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme[`sBg-${colorIndex}`] },
          ]}
        >
          <TextInput
            autoCorrect={false}
            maxLength={30}
            placeholderTextColor={theme[`sT-${colorIndex}`]}
            placeholder="Please enter playlist title"
            value={titleInput}
            onChangeText={(newTex) => setTitleInput(newTex)}
            style={[styles.input, { color: theme[`pT-${colorIndex}`] }]}
          />
          <FontAwesome
            name="times-circle"
            size={24}
            color={theme[`pT-${colorIndex}`]}
          />
        </View>
      </View>
    </BottomSliderFull>
  );
};

export default AddPlaylist;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "7%",
    paddingHorizontal: "4%",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "8%",
  },

  text: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 1.5,
  },

  input: {
    flex: 1,
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },

  inputContainer: {
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
    borderRadius: 5,
    marginBottom: "20%",
  },
});
