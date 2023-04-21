import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { theme } from "../utils/colors";
import { ThemeContext } from "../store/theme";
import PlayButtonAnimation from "../components/lottie/PlayButtonAnimation";
import SmileyEmojiAnimation from "../components/lottie/SmileyEmojiAnimation";
import { MaterialIcons } from "@expo/vector-icons";
import Sound from "../components/Sound";
import { allSounds } from "../utils/allSounds";
import { SoundContext } from "../store/soundFunc";
import { AuthContext } from "../store/auth";
import { UiContext } from "../store/ui";
import { useFocusEffect } from "@react-navigation/native";
import { fetchSounds, sendNotificationApi } from "../utils/api";

const HomeScreen = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UiContext);
  const [greetingText, setGreetingText] = useState("");
  const hour = new Date().getHours();
  const [recomended, setRecomended] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const fetchedSounds = await fetchSounds();
    setRecomended(
      fetchedSounds
        .sort((a, b) => {
          if (a.numOfPlay > b.numOfPlay) {
            return -1;
          } else if (b.numOfPlay > a.numOfPlay) {
            return 1;
          } else {
            return 0;
          }
        })
        .slice(0, 6)
    );
    setRefreshing(false);
  };

  useState(() => {
    onRefresh();
  }, []);

  useFocusEffect(
    useCallback(() => {
      uiCtx.setLoadingScreen(true);
    }, [])
  );

  useEffect(() => {
    if (hour <= 11) {
      setGreetingText("Morning");
    } else if (hour >= 12 && hour <= 15) {
      setGreetingText("Afternoon");
    } else if (hour >= 16 && hour <= 23) {
      setGreetingText("Evening");
    }
  }, [hour]);

  const playHandler = async () => {
    if (soundCtx.currentSoundArray.current.length === 0) {
      return Alert.alert("Play a sound", "You have no prevous played sound");
    }

    soundCtx
      .playSound()
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
    soundCtx.togglePlayingBoard();
  };

  const Header = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.logoText, { color: theme[`pT-${colorIndex}`] }]}>
          Sound haven
        </Text>

        <PlayButtonAnimation onPress={playHandler} width={250} height={250} />

        <Text
          style={[styles.greetingText, { color: theme[`pT-${colorIndex}`] }]}
        >
          Good {greetingText}, {authCtx.fullName}
        </Text>

        <View
          style={{
            borderRadius: 15,
            backgroundColor: theme[`sBg-${colorIndex}`],
            overflow: "hidden",
            marginBottom: "10%",
          }}
        >
          <Pressable
            onPress={() => {
              sendNotificationApi("Points", "This is to te");
            }}
            android_ripple={{ color: theme[`ac-${colorIndex}`] }}
            style={[styles.feelingsContainer]}
          >
            <SmileyEmojiAnimation width={80} height={80} />
            <Text
              style={[
                styles.feelingsText,
                { color: theme[`pT-${colorIndex}`] },
              ]}
            >
              How are you feeling Today
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={theme[`ac-${colorIndex}`]}
            />
          </Pressable>
        </View>

        <Text
          style={[styles.recomendText, { color: theme[`pT-${colorIndex}`] }]}
        >
          Recommended
        </Text>
      </ScrollView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recomended}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Sound
              onPress={soundCtx.soundPlayHandler.bind(
                this,
                index,
                item.id,
                recomended
              )}
              soundName={item.soundName}
              owner={item.owner}
              image={item.image}
              url={item.url}
              id={item.id}
              index={index}
              currentArray={recomended}
            />
          )}
          ListHeaderComponent={Header}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: "5%",
  },

  logoText: {
    fontFamily: "satisfy",
    fontSize: 35,
    textAlign: "center",
  },

  greetingText: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginBottom: "5%",
  },

  feelingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  feelingsText: {
    fontFamily: "montserrat-regular",
    fontSize: 15,
    marginRight: "7%",
  },

  recomendText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    marginBottom: "5%",
  },
});
