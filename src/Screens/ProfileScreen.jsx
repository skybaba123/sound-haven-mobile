import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HeadText from "../UI/HeadText";
import profileImage from "../../assets/images/IMG_20210723_191354_886.jpg";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getUser();
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
    authCtx.setSubscribed(!authCtx.subscribed);
    console.log(authCtx.subscribed);
    if (authCtx.subscribed) {
      Alert.alert("subscribed", "Your'e now subscribed");
    } else {
      Alert.alert("UnSubscribed", "You've unsubscribed");
    }
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

      <Image style={styles.imageStyle} source={profileImage} />
      <Text style={[styles.nameText, { color: theme[`pT-${colorIndex}`] }]}>
        {authCtx.fullName}
      </Text>

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
