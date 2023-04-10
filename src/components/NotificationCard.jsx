import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { UiContext } from "../store/ui";
import formattedDate from "../utils/formattedDate";
import {
  deleteNotificationApi,
  readNotificationApi,
  sendNotificationApi,
} from "../utils/api";
import BeamingAnimation from "./lottie/BeamingAnimation";

const NotificationCard = ({
  title,
  content,
  createdAt,
  read,
  index,
  setNotification,
  id,
}) => {
  const [deleted, setDeleted] = useState(false);
  const colorIndex = useContext(ThemeContext).colorIndex;
  const uiCtx = useContext(UiContext);
  const [readState, setReadState] = useState(read);

  const deleteHandler = async () => {
    setDeleted(true);
    const data = await deleteNotificationApi(id);
    uiCtx.toastBoard("Deleted");
    setTimeout(() => {
      setNotification((prev) => prev.filter((n) => n._id !== id));
    }, 1500);
  };

  const sendNotificationHandler = async () => {
    const fication = await sendNotificationApi(
      "Security",
      "A user tried to login into your account and we will check"
    );
    setNotification((prev) => [fication, ...prev]);
  };

  const notificationCardHandler = async () => {
    if (!readState) {
      await readNotificationApi(id);
      setReadState(true);
    }
  };

  const notification = (
    <Animated.View
      exiting={SlideOutRight}
      entering={SlideInLeft}
      style={[
        styles.container,
        { backgroundColor: theme[`sBg-${colorIndex}`] },
      ]}
    >
      <Pressable
        onPress={notificationCardHandler}
        android_ripple={{ color: theme[`ac-${colorIndex}`] }}
        style={styles.pressableContainer}
      >
        {!readState && (
          <BeamingAnimation width={25} height={25} style={styles.beaming} />
        )}

        <View style={[styles.subContainer, { marginBottom: "4%" }]}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: theme[`pT-${colorIndex}`], width: 160 },
            ]}
          >
            {title}
          </Text>
          <Pressable onPress={deleteHandler}>
            <FontAwesome5
              name="times"
              size={30}
              color={theme[`ac-${colorIndex}`]}
            />
          </Pressable>
        </View>

        <View style={styles.subContainer}>
          <Text
            numberOfLines={1}
            style={[
              styles.description,
              { color: theme[`sT-${colorIndex}`], width: 140 },
            ]}
          >
            {content}
          </Text>
          <Text
            style={[styles.description, { color: theme[`sT-${colorIndex}`] }]}
          >
            {formattedDate(createdAt)}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return !deleted && notification;
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: "2%",
  },

  pressableContainer: {
    padding: 15,
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "montserrat-bold",
  },

  description: {
    fontFamily: "montserrat-medium",
  },

  beaming: {
    position: "absolute",
  },
});
