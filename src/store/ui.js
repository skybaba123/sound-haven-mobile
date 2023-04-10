import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import * as Notifications from "expo-notifications";

export const UiContext = createContext({
  toastBoard: (message) => {},
  favToast: false,
  favToastMode: "",
  faveToastBoard: () => {},
  soundNotification: async (title, body) => {},
  loadingScreen: true,
  setLoadingScreen: (boolean) => {},
});

const UiContextProvider = ({ children }) => {
  const [favToast, setFavToast] = useState(false);
  const [favToastMode, setFavToastMode] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setFavToastMode("");
      setFavToast(false);
    }, 2000);
    return () => clearInterval(time);
  }, [favToast]);

  const soundNotification = async (title, body) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        importance: "high",
      },
      trigger: null,
      identifier: "playing",
    });
  };

  const toastBoard = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const faveToastBoard = (mode) => {
    setFavToastMode(mode);
    setFavToast(true);
  };

  const contextValue = {
    toastBoard,
    favToast,
    favToastMode,
    faveToastBoard,
    soundNotification,
    loadingScreen,
    setLoadingScreen,
  };
  return (
    <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
  );
};

export default UiContextProvider;
