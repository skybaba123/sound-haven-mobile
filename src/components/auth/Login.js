import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { theme } from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../store/theme";
import { getUser, loginUser } from "../../utils/api";
import { AuthContext } from "../../store/auth";
import GenLoadingAnimation from "../lottie/GenLoadingAnimation";

const Login = ({ onWelcome, setChangeScreen }) => {
  const themeCtx = useContext(ThemeContext);
  const colorIndex = themeCtx.colorIndex;
  const authCtx = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPassWordInput] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const backAction = () => {
      setChangeScreen("welcome");
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

  const anyEmptyField = emailInput.trim() === "" || passwordInput.trim() === "";

  const loginHandler = async () => {
    if (anyEmptyField) {
      return Alert.alert("invalid", "Email or Password cannot be empty");
    }

    setIsloading(true);
    const token = await loginUser(emailInput.toLowerCase(), passwordInput);
    const user = await getUser();
    authCtx.authenticateUser(token, user);
    setIsloading(false);
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(700)}
      exiting={FadeOutDown.duration(700)}
    >
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <Pressable
          onPress={onWelcome}
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="md-chevron-back-circle"
            size={30}
            color={theme[`pT-${colorIndex}`]}
          />
          <Text
            style={{
              color: theme[`pT-${colorIndex}`],
              fontFamily: "montserrat-regular",
            }}
          >
            GO Back
          </Text>
        </Pressable>

        <Text style={[styles.logoText, { color: theme[`pT-${colorIndex}`] }]}>
          Login
        </Text>

        <View>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme[`sBg-${colorIndex}`] },
            ]}
          >
            <Fontisto
              style={styles.icon}
              name="email"
              size={24}
              color={theme[`sT-${colorIndex}`]}
            />
            <TextInput
              textContentType="emailAddress"
              placeholder="Email"
              placeholderTextColor={theme[`pT-${colorIndex}`]}
              autoCorrect={hide}
              value={emailInput}
              onChangeText={(enteredText) => {
                setEmailInput(enteredText);
              }}
              style={[styles.input, { color: theme[`pT-${colorIndex}`] }]}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme[`sBg-${colorIndex}`] },
            ]}
          >
            <MaterialIcons
              name="lock"
              size={24}
              style={styles.icon}
              color={theme[`sT-${colorIndex}`]}
            />
            <TextInput
              textContentType="newPassword"
              placeholder="Password"
              placeholderTextColor={theme[`pT-${colorIndex}`]}
              secureTextEntry={hide}
              autoCorrect={false}
              value={passwordInput}
              onChangeText={(enteredText) => {
                setPassWordInput(enteredText);
              }}
              style={[styles.input, { color: theme[`pT-${colorIndex}`] }]}
            />
            {!hide && (
              <Pressable onPress={() => setHide(true)}>
                <MaterialCommunityIcons
                  name="eye"
                  size={24}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            )}
            {hide && (
              <Pressable onPress={() => setHide(false)}>
                <MaterialCommunityIcons
                  name="eye-off"
                  size={24}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            )}
          </View>
        </View>

        <Pressable
          onPress={loginHandler}
          android_ripple={{ color: theme[`pBg-${colorIndex}`] }}
          style={[
            styles.button,
            { backgroundColor: theme[`ac-${colorIndex}`] },
          ]}
        >
          <Text style={[styles.btnText, { color: theme[`pT-${colorIndex}`] }]}>
            Login
          </Text>
        </Pressable>

        {isLoading && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <GenLoadingAnimation width={300} height={300} />
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default Login;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   paddingVertical: 40,
  // },

  logoText: {
    fontFamily: "satisfy",
    fontSize: 35,
    marginBottom: "10%",
  },

  inputContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "80%",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    fontFamily: "montserrat-regular",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
  },

  icon: {
    marginRight: 10,
  },

  button: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "80%",
    marginTop: "30%",
  },

  btnText: {
    fontFamily: "montserrat-regular",
    fontSize: 16,
    fontWeight: "bold",
  },
});
