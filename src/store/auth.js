import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import * as Updates from "expo-updates";

export const AuthContext = createContext({
  isLoggedIn: String,
  authenticateUser: (token, user) => {},
  logoutUser: async () => {},

  fullName: String,
  setFullName: (fullName) => {},
  userName: String,
  setUserName: (userName) => {},
  email: String,
  setEmail: (email) => {},
  points: Number,
  setPoints: (points) => {},
  refBalance: String,
  setRefBalance: (refBalance) => {},
  emailVerified: Boolean,
  setEmailVerified: (emailVerified) => {},
  refferedBy: String,
  setRefferedBy: (refferedBy) => {},
  subscribed: Boolean,
  setSubscribed: (subscribed) => {},
  createdAt: String,
  setCreatedAt: (createdAt) => {},
  favoriteSounds: Array,
  setFavoriteSounds: (favoriteSounds) => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState(0);
  const [refBalance, setRefBalance] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [refferedBy, setRefferedBy] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [favoriteSounds, setFavoriteSounds] = useState([]);

  const authenticateUser = (token, user) => {
    setIsLoggedIn(token);
    updateUserDetails(user);
  };

  // useEffect(async () => {
  //   const reset = ["token", "mode", "currentSoundIndex", "activeArray"];
  //   await AsyncStorage.multiRemove(reset);
  // }, []);

  const updateUserDetails = (user = Object) => {
    const {
      fullName,
      email,
      points,
      refBalance,
      emailVerified,
      refferedBy,
      subscribed,
      createdAt,
      userName,
      favoriteSounds,
    } = user;

    setFullName(fullName);
    setEmail(email);
    setPoints(points);
    setRefBalance(refBalance);
    setEmailVerified(emailVerified);
    setRefferedBy(refferedBy);
    setSubscribed(subscribed);
    setCreatedAt(createdAt);
    setUserName(userName);
    setFavoriteSounds(favoriteSounds);
  };

  const logoutUser = async () => {
    // const reset = ["token", "mode", "currentSoundIndex", "activeArray"];
    // await AsyncStorage.multiRemove(reset);
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(null);
    // Updates.reloadAsync();
  };

  const contextValue = {
    isLoggedIn: !!isLoggedIn,
    authenticateUser,
    logoutUser,

    fullName,
    setFullName,
    email,
    setEmail,
    points,
    setPoints,
    refBalance,
    setRefBalance,
    emailVerified,
    setEmailVerified,
    refferedBy,
    setRefferedBy,
    subscribed,
    setSubscribed,
    createdAt,
    setCreatedAt,
    userName,
    setUserName,
    favoriteSounds,
    setFavoriteSounds,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
