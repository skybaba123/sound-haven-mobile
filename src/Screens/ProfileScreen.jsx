import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HeadText from "../UI/HeadText";
// import profileImage from "../../assets/images/IMG_20210723_191354_886.jpg";
import { theme } from "../utils/colors";
import { ThemeContext } from "../store/theme";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth";
import { AntDesign } from "@expo/vector-icons";
import { getUser } from "../utils/api";
import Load from "../UI/Load";
import { UiContext } from "../store/ui";
import { SoundContext } from "../store/soundFunc";
import * as ImagePicker from "expo-image-picker";
import ImageResizer from "@bam.tech/react-native-image-resizer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Card = ({
  ionicons,
  fontAwesome,
  materialIcons,
  antDesign,
  title,
  onPress,
}) => {
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
      style={[
        styles.cardStyle,
        { borderBottomColor: theme[`sBg-${colorIndex}`] },
      ]}
    >
      {ionicons && (
        <Ionicons name={ionicons} size={24} color={theme[`ac-${colorIndex}`]} />
      )}

      {fontAwesome && (
        <FontAwesome
          name={fontAwesome}
          size={24}
          color={theme[`ac-${colorIndex}`]}
        />
      )}

      {materialIcons && (
        <MaterialIcons
          name={materialIcons}
          size={24}
          color={theme[`ac-${colorIndex}`]}
        />
      )}

      {antDesign && (
        <AntDesign
          name={antDesign}
          size={24}
          color={theme[`ac-${colorIndex}`]}
        />
      )}

      <Text style={[styles.cardText, { color: theme[`pT-${colorIndex}`] }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const ProfileScreen = ({ navigation }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UiContext);
  const soundCtx = useContext(SoundContext);
  const [loading, setLoading] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [profileImageBase64, setProfileImageBase64] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getUser();
      setProfileImageBase64(data?.avatar);
      authCtx.setPoints(data.points);
      setLoading(false);
    };
    fetchData();
  }, []);

  const themeHandler = () => {
    navigation.navigate("Theme");
  };

  const helpHandler = () => {
    navigation.navigate("SingleScreen", { screen: "Help" });
  };

  const walletHandler = () => {
    navigation.navigate("Wallet");
  };

  const notificationHandler = () => {
    navigation.navigate("SingleScreen", { screen: "Notification" });
  };

  const settingHandler = () => {
    navigation.navigate("Setting");
  };

  const feedbackHandler = () => {
    navigation.navigate("Feedback");
  };

  const subscribeHandler = () => {
    Alert.alert(
      "Alert",
      "This App is still in it's develpement stage, for now you can click on the switch above to turn on subscription if you don't have enough points to play sound"
    );
  };

  const logoutHandler = async () => {
    await navigation.navigate("Loading");
    await authCtx.logoutUser();
    soundCtx.soundRef.current && (await soundCtx.soundRef.current.stopAsync());
    setTimeout(() => {
      navigation.navigate("AuthNav");
      uiCtx.setLoadingScreen(false);
    }, 2500);
  };

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.08,
      base64: true,
    });

    if (!result.canceled) {
      try {
        setLoadingAvatar(true);
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(
          "https://sound-haven-server.onrender.com/user/avatar/upload",
          {
            method: "POST",
            body: JSON.stringify({ avatar: result.assets[0].base64 }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("File Too Large");

        console.log(res.status);
        const data = await res.json();
        setProfileImageBase64(data.avatar);
      } catch (error) {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        "No picture Chosen",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    setLoadingAvatar(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <HeadText text="Profile" style={styles.logoText} />
        </View>

        <Text style={[styles.cardText, { color: theme[`pT-${colorIndex}`] }]}>
          Pts:
          {loading ? (
            <Load size={20} color={theme[`ac-${colorIndex}`]} />
          ) : (
            authCtx.points
          )}
        </Text>
      </View>

      <Pressable
        onPress={pickImageHandler}
        style={[
          styles.imageStyle,
          { backgroundColor: theme[`sBg-${colorIndex}`] },
        ]}
      >
        {!profileImageBase64 && !loadingAvatar && (
          <Text
            style={[styles.profileText, { color: theme[`pT-${colorIndex}`] }]}
          >
            {authCtx.fullName[0].toUpperCase()}
            {authCtx.fullName[1].toUpperCase()}
          </Text>
        )}

        {loadingAvatar && <Load size={20} color={theme[`ac-${colorIndex}`]} />}

        {profileImageBase64 && !loadingAvatar && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: "data:image/jpeg;base64," + profileImageBase64 }}
          />
        )}
      </Pressable>
      <Text style={[styles.nameText, { color: theme[`pT-${colorIndex}`] }]}>
        {authCtx.fullName}
      </Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        value={switched}
        onValueChange={(value) => {
          setSwitched((prev) => !prev);
          authCtx.setSubscribed(value);
          console.log(value);
          value &&
            Alert.alert(
              "Dev Mode",
              "You're now subscribed\nAlways switch this on if you don't have points to play sound"
            );
          !value &&
            Alert.alert(
              "Dev Mode",
              "Subscription Turned off\nyou will now be charged with point for each sound played"
            );
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <Card
          onPress={notificationHandler}
          ionicons="notifications"
          title="Notification"
        />
        <Card
          onPress={subscribeHandler}
          fontAwesome="diamond"
          title="Subscribe"
        />
        {false && (
          <Card
            onPress={walletHandler}
            ionicons="wallet-sharp"
            title="Ref Wallet"
          />
        )}
        <Card onPress={helpHandler} ionicons="ios-help-outline" title="Help" />
        <Card onPress={themeHandler} ionicons="color-palette" title="Theme" />
        <Card
          onPress={settingHandler}
          ionicons="ios-settings"
          title="Settings"
        />
        <Card
          onPress={feedbackHandler}
          materialIcons="feedback"
          title="Feedback"
        />
        <Card onPress={logoutHandler} antDesign="logout" title="Logout" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: "5%",
    alignItems: "center",
  },

  logoText: { width: "100%", textAlign: "left", marginBottom: "10%" },

  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: "4%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  profileText: {
    fontFamily: "montserrat-bold",
    fontSize: 35,
  },

  nameText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    marginBottom: "4%",
  },

  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    borderBottomWidth: 0.5,
    paddingBottom: "10%",
  },

  cardText: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: "5%",
  },
});
