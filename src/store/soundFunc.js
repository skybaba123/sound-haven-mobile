import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Audio, InterruptionModeAndroid } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./auth";
import { Alert } from "react-native";
import {
  addNewFavoriteApi,
  createPlaylistApi,
  reducePointsApi,
  removeFavoriteApi,
  userPlaylistApi,
} from "../utils/api";
import { UiContext } from "./ui";

// import * as MediaLibrary from "expo-media-library";

export const SoundContext = createContext({
  soundRef: null,
  playingBoard: Boolean,
  currentSound: Object,
  isPlaying: Boolean,
  getActiveArray: (currentArray) => {},
  getCurrentSound: (activeArray, id) => {},
  togglePlayingBoard: () => {},
  loadSound: (url) => {},
  soundPlayHandler: (index, id, currentArray) => {},
  playSound: () => {},
  pauseSound: () => {},
  fastforward: () => {},
  fastBackward: () => {},
  currentSoundIndex: Number,
  currentSoundArray: Array,
  getCurrentSoundIndex: (index) => {},
  getCurrentSoundId: (id) => {},
  currentSoundId: String,
  isLoading: Boolean,
  playNextHandler: () => {},
  playPrevHandler: () => {},
  setPlayingMode: (mode) => {},
  modeUpdate: String,
  optionBoard: Boolean,
  toggleOptionBoard: () => {},
  currentSoundOptions: Object,
  addPlaylistBoard: Boolean,
  toggleAddPlaylistBoard: () => {},
  allPlaylist: Array,
  updatePlaylist: (playlistArr) => {},
  addNewPlaylistHandler: (image, title) => {},
  toggleAddToPlaylistBoard: () => {},
  addToPlaylistBoard: Boolean,
  addNewFavouriteHandler: (id) => {},
  getCurrentSoundOptions: (
    image,
    soundName,
    owner,
    id,
    url,
    index,
    currentArray
  ) => {},
});

const SoundContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UiContext);

  const [playingBoard, setplayingBoard] = useState(false);
  const activeSound = useRef({});
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  const currentSoundIndex = useRef(null);
  const currentSoundArray = useRef([]);
  const currentSoundId = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const modeRef = useRef("loopMode");
  const [modeUpdate, setModeUpdate] = useState("loopMode");
  const [optionBoard, setOptionBoard] = useState(false);
  const [currentSoundOptions, setCurrentSoundOptions] = useState({});
  const [addPlaylistBoard, setAddPlaylistBoard] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [addToPlaylistBoard, setAddToPlaylistBoard] = useState(false);
  const toast = useContext(UiContext).toastBoard;
  const soundNotification = useContext(UiContext).soundNotification;
  const [soundStatus, setSoundStatus] = useState({});

  useEffect(() => {
    const fetchLocalStorages = async () => {
      try {
        const id = await AsyncStorage.getItem("soundId");
        const activeArray = await AsyncStorage.getItem("activeArray");
        const parsedActiveArray = JSON.parse(activeArray);
        const currentSoundIndex = await AsyncStorage.getItem(
          "currentSoundIndex"
        );
        const parsedCurrentSoundIndex = JSON.parse(currentSoundIndex);
        const mode = await AsyncStorage.getItem("mode");

        if (mode) {
          setPlayingMode(mode);
        }

        if (id && parsedActiveArray && parsedCurrentSoundIndex >= 0) {
          getCurrentSound(parsedActiveArray, id);
          getCurrentSoundIndex(parsedCurrentSoundIndex);
          getActiveArray(parsedActiveArray);
          await loadSound(parsedActiveArray[parsedCurrentSoundIndex].url);
          soundRef.current && (await soundRef.current.pauseAsync());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocalStorages();
  }, []);

  const addNewPlaylistHandler = async (title) => {
    try {
      const playlist = await createPlaylistApi(title);
      const newPlaylist = {
        title: playlist.title,
        id: playlist._id,
        playlist: playlist.playlist,
      };
      setAllPlaylist((prev) => [newPlaylist, ...prev]);
      uiCtx.toastBoard("Playlist Added");
    } catch (error) {
      uiCtx.toastBoard(error.message);
    }
  };

  const updatePlaylist = (playlistArr) => {
    setAllPlaylist(playlistArr);
  };

  const addNewFavouriteHandler = async (id) => {
    const isFav = authCtx.favoriteSounds.includes(id);
    if (isFav) {
      removeFavoriteApi(id);
      authCtx.setFavoriteSounds((prev) => prev.filter((fav) => fav !== id));
      uiCtx.faveToastBoard("remove");
    } else {
      addNewFavoriteApi(id);
      authCtx.setFavoriteSounds((prev) => [id, ...prev]);
      uiCtx.faveToastBoard("add");
    }
  };

  const loadSound = async (url) => {
    setIsLoading(true);
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const googleDriveUrl = `https://drive.google.com/u/0/uc?id=${url}&export=download`;
      const otherUrl = url;
      const checkUrl = url.toLowerCase().includes("http");

      console.log("loading...");
      const { sound } = await Audio.Sound.createAsync({
        uri: checkUrl ? otherUrl : googleDriveUrl,
      });
      soundRef.current = sound;
      console.log("playing");
      setIsLoading(false);
      await soundRef.current.playAsync();

      await soundNotification(
        "Playing Now",
        currentSoundArray.current[currentSoundIndex.current].soundName
      );

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        interruptionModeAndroid: (InterruptionModeAndroid.DuckOthers = 2),
      });

      soundRef.current.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.isPlaying === true) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }

        if (status.isLoaded) {
          try {
            if (modeRef.current === "singleMode") {
              await soundRef.current.setIsLoopingAsync(true);
            } else if (modeRef.current === "loopMode") {
              await soundRef.current.setIsLoopingAsync(false);
            }
          } catch (error) {
            console.log(error);
          }
        }

        if (status.didJustFinish) {
          if (modeRef.current === "loopMode") {
            playNextHandler();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const soundPlayHandler = async (index, id, currentArray) => {
    const status = await soundRef.current.getStatusAsync();
    if (!status?.isLoaded) {
      return uiCtx.toastBoard("Still loading");
    }
    try {
      if (!authCtx.subscribed && authCtx.points <= 0) {
        Alert.alert("Points", "Not enough to complete this action");
        throw new Error("You do not have enough points");
      }

      if (!authCtx.subscribed && authCtx.points > 0) {
        reducePointsApi();
        authCtx.setPoints((prev) => prev - 1);
      }

      Promise.resolve(getActiveArray(currentArray), getCurrentSoundIndex(index))
        .then(() => {
          togglePlayingBoard();
          getCurrentSoundId(id);
          getCurrentSound(currentSoundArray.current, id);
          loadSound(currentSoundArray.current[index].url);
          console.log("Playing from recomended");
        })
        .catch((error) => {
          if (error) {
            console.log("error");
          }
        });

      await AsyncStorage.setItem("soundId", id);
      await AsyncStorage.setItem("activeArray", JSON.stringify(currentArray));
      await AsyncStorage.setItem("currentSoundIndex", JSON.stringify(index));
    } catch (error) {
      uiCtx.toastBoard(error.message);
    }
  };

  const playSound = async () => {
    if (!currentSoundArray.current)
      return Alert.alert("Play Sound", "Start by playing a sound");
    soundRef.current?._loaded && (await soundRef.current.playAsync());
  };

  const pauseSound = async () => {
    soundRef.current?._loaded && (await soundRef.current.pauseAsync());
  };

  const fastforward = async () => {
    const status = await soundRef.current.getStatusAsync();
    const newPosition = (await status.positionMillis) + 10000;
    await soundRef.current.setPositionAsync(newPosition);
  };

  const fastBackward = async () => {
    const status = await soundRef.current.getStatusAsync();
    const newPosition = (await status.positionMillis) - 5000;
    await soundRef.current.setPositionAsync(newPosition);
  };

  const playNextHandler = async () => {
    const status = await soundRef.current.getStatusAsync();
    if (!status?.isLoaded) {
      return uiCtx.toastBoard("Still loading");
    }
    try {
      if (!authCtx.subscribed && authCtx.points <= 0) {
        Alert.alert("Points", "Not enough to complete this action");
        toast("Not enough Point to complete this action");
        throw new Error("you do not have enough points");
      }

      if (!authCtx.subscribed && authCtx.points > 0) {
        reducePointsApi();
        authCtx.setPoints((prev) => prev - 1);
      }

      if (currentSoundArray.current.length - 1 === currentSoundIndex.current) {
        currentSoundIndex.current = 0;
      } else {
        currentSoundIndex.current++;
      }

      await AsyncStorage.setItem(
        "soundId",
        currentSoundArray.current[currentSoundIndex.current].id
      );
      await AsyncStorage.setItem(
        "activeArray",
        JSON.stringify(currentSoundArray.current)
      );
      await AsyncStorage.setItem(
        "currentSoundIndex",
        JSON.stringify(currentSoundIndex.current)
      );

      getCurrentSound(
        currentSoundArray.current,
        currentSoundArray.current[currentSoundIndex.current].id
      );

      loadSound(currentSoundArray.current[currentSoundIndex.current].url);
    } catch (error) {
      console.log(error);
    }
  };

  const playPrevHandler = async () => {
    const status = await soundRef.current.getStatusAsync();
    if (!status?.isLoaded) {
      return uiCtx.toastBoard("Still loading");
    }
    try {
      if (!authCtx.subscribed && authCtx.points <= 0) {
        Alert.alert("Points", "Not enough to complete this action");
        toast("Not enough Point to complete this action");
        throw new Error("you do not have enough points");
      }

      if (!authCtx.subscribed && authCtx.points > 0) {
        reducePointsApi();
        authCtx.setPoints((prev) => prev - 1);
      }

      if (currentSoundIndex.current === 0) {
        currentSoundIndex.current = 0;
      } else {
        currentSoundIndex.current--;
      }

      await AsyncStorage.setItem(
        "soundId",
        currentSoundArray.current[currentSoundIndex.current].id
      );
      await AsyncStorage.setItem(
        "activeArray",
        JSON.stringify(currentSoundArray.current)
      );
      await AsyncStorage.setItem(
        "currentSoundIndex",
        JSON.stringify(currentSoundIndex.current)
      );

      getCurrentSound(
        currentSoundArray.current,
        currentSoundArray.current[currentSoundIndex.current].id
      );

      loadSound(currentSoundArray.current[currentSoundIndex.current].url);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentSound = (activeArray, id) => {
    activeSound.current = activeArray.find((sound) => sound.id === id);
  };

  const getActiveArray = (currentArray) => {
    currentSoundArray.current = currentArray;
  };

  const getCurrentSoundIndex = (index) => {
    currentSoundIndex.current = index;
  };

  const getCurrentSoundId = (id) => {
    currentSoundId.current = id;
  };

  const setPlayingMode = async (mode) => {
    modeRef.current = mode;
    setModeUpdate(modeRef.current);
    await AsyncStorage.setItem("mode", mode);
    toast(modeRef.current);
  };

  const togglePlayingBoard = () => {
    setplayingBoard(!playingBoard);
  };

  const toggleOptionBoard = () => {
    setOptionBoard(!optionBoard);
  };

  const toggleAddPlaylistBoard = () => {
    setAddPlaylistBoard(!addPlaylistBoard);
  };

  const toggleAddToPlaylistBoard = () => {
    setAddToPlaylistBoard(!addToPlaylistBoard);
  };

  const getCurrentSoundOptions = (
    image,
    soundName,
    owner,
    id,
    url,
    index,
    currentArray
  ) => {
    setCurrentSoundOptions({
      image,
      soundName,
      owner,
      id,
      url,
      index,
      currentArray,
    });
  };

  const contextValue = {
    soundRef,
    loadSound,
    playingBoard,
    soundPlayHandler,
    togglePlayingBoard,
    playSound,
    pauseSound,
    currentSound: activeSound.current,
    isPlaying,
    fastforward,
    fastBackward,
    getCurrentSound,
    getActiveArray,
    currentSoundArray,
    currentSoundIndex,
    getCurrentSoundIndex,
    getCurrentSoundId,
    currentSoundId,
    isLoading,
    playNextHandler,
    playPrevHandler,
    setPlayingMode,
    modeUpdate,
    optionBoard,
    toggleOptionBoard,
    currentSoundOptions,
    getCurrentSoundOptions,
    toggleAddPlaylistBoard,
    addPlaylistBoard,
    allPlaylist,
    updatePlaylist,
    addNewPlaylistHandler,
    toggleAddToPlaylistBoard,
    addToPlaylistBoard,
    addNewFavouriteHandler,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContextProvider;
