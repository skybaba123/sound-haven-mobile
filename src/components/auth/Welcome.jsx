import {
  Alert,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutDown,
  FlipInXUp,
  FlipOutXUp,
} from "react-native-reanimated";
import React, { useContext, useEffect, useRef, useState } from "react";
import { theme } from "../../utils/colors";
import LottieView from "lottie-react-native";
import { ThemeContext } from "../../store/theme";

const Welcome = ({ onLogin, onCreate }) => {
  const [swap, setSwap] = useState(false);
  const themeCtx = useContext(ThemeContext);
  const colorIndex = themeCtx.colorIndex;
  const animationOne = useRef(null);
  const animationTwo = useRef(null);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the App?", [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
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

  useEffect(() => {
    swapAnimation();
    animationOne.current?.play();
  }, [swap]);

  const MalePerson = () => {
    return (
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
        style={styles.animationContainer}
      >
        <LottieView
          ref={animationOne}
          style={{ width: "100%", height: "auto" }}
          source={require("../../../assets/lottie/66307-meditation-wait-please.json")}
        />
      </Animated.View>
    );
  };

  const FemalePerson = () => {
    return (
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOutDown.duration(1000)}
        style={styles.animationContainer}
      >
        <LottieView
          ref={animationTwo}
          style={{ width: "100%", height: "auto" }}
          source={require("../../../assets/lottie/47575-meditation.json")}
        />
      </Animated.View>
    );
  };

  const swapAnimation = () => {
    setTimeout(() => {
      setSwap(!swap);
      setTimeout(() => {
        swap && animationOne.current?.play();
        !swap && animationTwo.current?.play();
      }, 10);
    }, 4000);
  };

  return (
    <Animated.View
      entering={FlipInXUp.duration(700)}
      exiting={FlipOutXUp.duration(700)}
      style={styles.container}
    >
      <Text style={[styles.logoText, { color: theme[`pT-${colorIndex}`] }]}>
        Sound Haven
      </Text>

      {!swap && <MalePerson />}
      {swap && <FemalePerson />}

      <View style={styles.buttonsContainer}>
        <Pressable
          android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
          onPress={onCreate}
          style={styles.buttonOne}
        >
          <Text style={[styles.btnText, { color: theme[`pT-${colorIndex}`] }]}>
            Open an account
          </Text>
        </Pressable>

        <Pressable
          android_ripple={{ color: theme[`ac-${colorIndex}`] }}
          onPress={onLogin}
          style={[
            styles.buttonTwo,
            { backgroundColor: theme[`sBg-${colorIndex}`] },
          ]}
        >
          <Text style={[styles.btnText, { color: theme[`pT-${colorIndex}`] }]}>
            Already have an account? Sign in
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
  },

  logoText: {
    fontFamily: "satisfy",
    fontSize: 35,
  },

  animationContainer: {
    width: "100%",
    heightL: "auto",
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  buttonOne: {
    marginBottom: 5,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "80%",
  },

  buttonTwo: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "80%",
  },

  btnText: {
    fontFamily: "montserrat-regular",
    fontSize: 16,
    fontWeight: "bold",
  },
});
