import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { theme } from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ThemeContext } from "../../store/theme";
import { AuthContext } from "../../store/auth";
import { createUser, getUser } from "../../utils/api";
import GenLoadingAnimation from "../lottie/GenLoadingAnimation";

const CreateAccount = ({ onWelcome, setChangeScreen }) => {
  const themeCtx = useContext(ThemeContext);
  const colorIndex = themeCtx.colorIndex;
  const autCtx = useContext(AuthContext);
  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPassWordInput] = useState("");
  const [refferedByInput, setRefferedByInput] = useState("");
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

  const anyEmptyField =
    fullNameInput.trim() === "" ||
    emailInput.trim() === "" ||
    passwordInput.trim() === "";

  const createUserHandler = async () => {
    if (anyEmptyField) {
      return Alert.alert(
        "invalid",
        "Full Name, Email or Password cannot be empty"
      );
    }

    setIsloading(true);
    const token = await createUser(
      fullNameInput,
      emailInput.toLowerCase(),
      passwordInput,
      refferedByInput
    );
    const user = await getUser();
    autCtx.authenticateUser(token, user);
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
          Create Account
        </Text>

        <View>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme[`sBg-${colorIndex}`] },
            ]}
          >
            <Ionicons
              name="ios-person-circle-outline"
              size={24}
              color={theme[`sT-${colorIndex}`]}
              style={styles.icon}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={theme[`pT-${colorIndex}`]}
              textContentType="name"
              autoCorrect={false}
              value={fullNameInput}
              onChangeText={(enteredText) => {
                setFullNameInput(enteredText);
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
              autoCorrect={false}
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

          <View style={{ width: "100%" }}>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: theme[`sBg-${colorIndex}`] },
              ]}
            >
              <Ionicons
                name="ios-person-circle-outline"
                size={24}
                color={theme[`sT-${colorIndex}`]}
                style={styles.icon}
              />
              <TextInput
                placeholder="Refferal Name (optional)"
                placeholderTextColor={theme[`pT-${colorIndex}`]}
                textContentType="name"
                autoCorrect={false}
                value={refferedByInput}
                onChangeText={(enteredText) => {
                  setRefferedByInput(enteredText);
                }}
                style={[styles.input, { color: theme[`pT-${colorIndex}`] }]}
              />
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "info",
                    "User Name of the person that invited you"
                  );
                }}
              >
                <Entypo
                  name="info-with-circle"
                  size={24}
                  color={theme[`sT-${colorIndex}`]}
                />
              </Pressable>
            </View>

            <Text>hello</Text>
          </View>
        </View>

        <Pressable
          onPress={createUserHandler}
          android_ripple={{ color: theme[`pBg-${colorIndex}`] }}
          style={[
            styles.button,
            { backgroundColor: theme[`ac-${colorIndex}`] },
          ]}
        >
          <Text style={[styles.btnText, { color: theme[`pT-${colorIndex}`] }]}>
            Create Account
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

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
  },

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
