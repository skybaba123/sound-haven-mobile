import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/auth";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../../store/theme";
import { theme } from "../../utils/colors";
import { setUserNameApi } from "../../utils/api";
import Load from "../../UI/Load";

const AccountDetails = () => {
  const authCtx = useContext(AuthContext);
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [userNameInput, setUserNameInput] = useState("");
  const [loading, setLoading] = useState(false);

  const setUserNameHandler = async () => {
    if (userNameInput.length <= 3) {
      return Alert.alert(
        "Invalid",
        "User Name should have atleast 4 characters"
      );
    }

    if (userNameInput.includes(" ")) {
      return Alert.alert("Invalid", "Remove spaces between characters");
    }

    setLoading(true);
    const newUserName = await setUserNameApi(userNameInput);

    if (newUserName.exist) {
      setLoading(false);
      return Alert.alert("error", newUserName.exist);
    }

    authCtx.setUserName(newUserName.userName);
    console.log(newUserName);
    console.log("hello");
    setLoading(false);
  };

  //   authCtx.setUserName(undefined);

  return (
    <View>
      <Text style={[styles.accountText, { color: theme[`pT-${colorIndex}`] }]}>
        Account
      </Text>

      <View style={styles.itemContainer}>
        <View style={styles.innerContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme[`sBg-${colorIndex}`] },
            ]}
          >
            <Ionicons
              name="person"
              size={24}
              color={theme[`ac-${colorIndex}`]}
            />
          </View>

          <Text style={[styles.itemText, { color: theme[`pT-${colorIndex}`] }]}>
            {authCtx.fullName}
          </Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.innerContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme[`sBg-${colorIndex}`] },
            ]}
          >
            <MaterialIcons
              name="email"
              size={24}
              color={theme[`ac-${colorIndex}`]}
            />
          </View>

          <Text style={[styles.itemText, { color: theme[`pT-${colorIndex}`] }]}>
            {authCtx.email}
          </Text>
        </View>
      </View>

      {authCtx.userName && (
        <View style={styles.itemContainer}>
          <View style={styles.innerContainer}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme[`sBg-${colorIndex}`] },
              ]}
            >
              <AntDesign
                name="user"
                size={24}
                color={theme[`ac-${colorIndex}`]}
              />
            </View>

            <Text
              style={[styles.itemText, { color: theme[`pT-${colorIndex}`] }]}
            >
              {authCtx.userName}
            </Text>
          </View>
        </View>
      )}

      {!authCtx.userName && (
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme[`sBg-${colorIndex}`] },
          ]}
        >
          <TextInput
            value={userNameInput}
            onChangeText={(enteredText) => setUserNameInput(enteredText)}
            placeholder="Enter Your User Name"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={theme[`sT-${colorIndex}`]}
            style={[styles.input, { color: theme[`pT-${colorIndex}`] }]}
          />
          <Pressable
            onPress={setUserNameHandler}
            android_ripple={{ color: theme[`pBg-${colorIndex}`] }}
            style={[
              styles.button,
              { backgroundColor: theme[`ac-${colorIndex}`] },
            ]}
          >
            <Text style={[styles.button, { color: theme[`pT-${colorIndex}`] }]}>
              {loading ? <Load /> : "Set User Name"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  accountText: {
    fontFamily: "montserrat-bold",
    marginBottom: "6%",
    fontSize: 20,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5%",
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  inputContainer: {
    height: 50,
    borderRadius: 5,
    paddingLeft: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },

  input: {
    height: "100%",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    flex: 1,
  },

  button: {
    justifyContent: "center",
    paddingHorizontal: "2%",
    borderRadius: 5,
  },

  buttonText: {
    fontFamily: "montserrat-regular",
    fontSize: 15,
  },

  itemText: {
    fontFamily: "montserrat-regular",
    fontSize: 15,
  },
});
