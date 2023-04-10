import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import NotificationCard from "../components/NotificationCard";
import {
  deleteAllNotificationApi,
  sendNotificationApi,
  userNotificationApi,
} from "../utils/api";
import GenLoadingAnimation from "../components/lottie/GenLoadingAnimation";
import { UiContext } from "../store/ui";
import NoDataAnimation from "../components/lottie/NoDataAnimation";

const Notification = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const uiCtx = useContext(UiContext);

  const noData = notification.length <= 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userNotifications = await userNotificationApi();
      setNotification(userNotifications);
      setLoading(false);
    };
    fetchData();
  }, []);

  const clearAllHandler = async () => {
    if (noData) {
      return uiCtx.toastBoard("Nothing to clear");
    }
    setLoading(true);
    const data = await deleteAllNotificationApi();
    if (data.deleted.acknowledged) {
      setNotification([]);
      uiCtx.toastBoard("Cleared");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "5%",
        }}
      >
        <Pressable
          onPress={clearAllHandler}
          style={{ padding: 10 }}
          android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
        >
          <Text
            style={{
              color: theme[`pT-${colorIndex}`],
              fontFamily: "montserrat-bold",
            }}
          >
            Clear all
          </Text>
        </Pressable>
      </View>

      {loading && <GenLoadingAnimation width={100} height={100} />}

      {!loading && (
        <>
          {noData && <NoDataAnimation width={300} height={300} />}

          <FlatList
            data={notification}
            renderItem={({ item, index }) => (
              <NotificationCard
                title={item.title}
                content={item.content}
                createdAt={item.createdAt}
                id={item._id}
                read={item.read}
                index={index}
                setNotification={setNotification}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "15%",
    paddingHorizontal: "5%",
  },
});
