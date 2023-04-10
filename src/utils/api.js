import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const SERVER_URL = "https://sound-haven-server.onrender.com/"

export const createUser = async (fullName, email, password, refferedBy) => {
  try {
    const newUser = { fullName, email, password, refferedBy };
    const res = await fetch(
      `${SERVER_URL}user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }

    console.log(data.newUser);

    await AsyncStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = { email, password };
    const res = await fetch(
      `${SERVER_URL}user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    await AsyncStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const setUserNameApi = async (userName) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}user/setusername/${userName}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}user/getuser`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reducePointsApi = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}user/points/reduce`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    return data.points;
  } catch (error) {
    console.log(error);
  }
};

export const addNewFavoriteApi = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}user/newfavorite/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const removeFavoriteApi = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}user/removefavorite/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPlaylistApi = async (title) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}playlist/create`,
      {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const userPlaylistApi = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}playlist`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addSoundPlaylistApi = async (playlistId, soundId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}playlist/addsound/${playlistId}/${soundId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaylistApi = async (playlistId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}playlist/delete/${playlistId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendNotificationApi = async (title, content) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}notification/create`,
      {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const userNotificationApi = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}notification/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const readNotificationApi = async (notificationId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}notification/user/read/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotificationApi = async (notificationId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}notification/user/delete/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllNotificationApi = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Unauthorized access");
    const res = await fetch(
      `${SERVER_URL}notification/user/deleteAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

