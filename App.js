import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback, useContext, useEffect, useState } from "react";
import ThemeContextProvider, { ThemeContext } from "./src/store/theme";
import { theme } from "./src/utils/colors";
import SoundContextProvider, { SoundContext } from "./src/store/soundFunc";

import AuthScreen from "./src/Screens/AuthScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LibraryScreen from "./src/Screens/LibraryScreen";
import ExploreScreen from "./src/Screens/ExploreScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import ThemeScreen from "./src/Screens/ThemeScreen";
import HelpScreen from "./src/Screens/HelpScreen";
import Playing from "./src/Screens/Playing";

import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import StatusBarIN from "./src/components/StatusBarIN";
import HeadText from "./src/UI/HeadText";
import { Alert, Pressable, Text, View } from "react-native";
import SoundOptions from "./src/Screens/SoundOptions";
import AddPlaylist from "./src/Screens/AddPlaylist";
import PlaylistContent from "./src/Screens/PlaylistContent";
import AddToPlaylist from "./src/Screens/AddToPlaylist";
import CategoryContent from "./src/Screens/CategoryContent";
import AuthContextProvider, { AuthContext } from "./src/store/auth";
import { getUser } from "./src/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./src/Screens/LoadingScreen";
import RefWallet from "./src/Screens/RefWallet";
import Notification from "./src/Screens/Notification";
import SettingScreen from "./src/Screens/SettingScreen";
import UiContextProvider, { UiContext } from "./src/store/ui";
import FavToast from "./src/UI/FavToast";
import FeedbackScreen from "./src/Screens/FeedbackScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNav = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme[`pBg-${themeCtx.colorIndex}`],
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AllTabs = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: theme[`pBg-${colorIndex}`],
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme[`ac-${colorIndex}`],
          tabBarInactiveTintColor: theme[`sT-${colorIndex}`],
          tabBarLabelStyle: {
            fontFamily: "montserrat-medium",
            fontSize: 11,
            paddingBottom: 5,
          },
          tabBarStyle: {
            backgroundColor: theme[`pBg-${colorIndex}`],
            borderTopColor: theme[`ac-${colorIndex}`],
            height: 60,
            paddingTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="world-o" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            headerTitleStyle: {},
            headerStyle: {
              backgroundColor: theme[`pBg-${colorIndex}`],
              height: 100,
            },
            headerTitle: () => (
              <HeadText text="Library" style={{ marginTop: 20 }} />
            ),
            headerShown: true,
            headerShadowVisible: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="my-library-music"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-sharp" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const SingleScreens = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={35}
              color={theme[`pT-${colorIndex}`]}
            />
          </Pressable>
        ),
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitleStyle: {
          color: theme[`pT-${colorIndex}`],
        },
        headerStyle: {
          backgroundColor: theme[`pBg-${colorIndex}`],
        },
        contentStyle: {
          backgroundColor: theme[`pBg-${colorIndex}`],
        },
      })}
    >
      <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="Help" component={HelpScreen} />

      <Stack.Screen
        name="playlistContent"
        component={PlaylistContent}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

const AllNavigation = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const playingBoard = useContext(SoundContext).playingBoard;
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UiContext);

  useEffect(() => {
    const auth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return uiCtx.setLoadingScreen(false);
      }
      const user = await getUser();
      if (!token || !user) {
        uiCtx.setLoadingScreen(false);
        return;
      }
      authCtx.authenticateUser(token, user);
      uiCtx.setLoadingScreen(false);
    };
    auth();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme[`pBg-${colorIndex}`],
            },
          }}
        >
          {uiCtx.loadingScreen && (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          )}

          {!authCtx.isLoggedIn && (
            <Stack.Screen name="AuthNav" component={AuthNav} />
          )}

          {authCtx.isLoggedIn && (
            <Stack.Screen name="AllTabs" component={AllTabs} />
          )}

          {authCtx.isLoggedIn && (
            <Stack.Screen name="SingleScreen" component={SingleScreens} />
          )}

          {authCtx.isLoggedIn && (
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
          )}

          {authCtx.isLoggedIn && (
            <Stack.Screen
              name="Theme"
              component={ThemeScreen}
              options={{
                headerStyle: {
                  backgroundColor: "black",
                },
                contentStyle: {
                  backgroundColor: "black",
                },
              }}
            />
          )}

          {authCtx.isLoggedIn && (
            <Stack.Screen
              name="categoryContent"
              component={CategoryContent}
              options={({ route }) => ({
                title: route.params.title,
              })}
            />
          )}

          {/* {authCtx.isLoggedIn && (
            <Stack.Screen name="Wallet" component={RefWallet} />
          )} */}

          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {soundCtx.addPlaylistBoard && <AddPlaylist />}
      {soundCtx.addToPlaylistBoard && <AddToPlaylist />}
      {playingBoard && <Playing />}
      {soundCtx.optionBoard && <SoundOptions />}
      {uiCtx.favToast && <FavToast />}
    </>
  );
};

export default function App() {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [fontsLoaded] = useFonts({
    satisfy: require("./assets/Fonts/Satisfy-Regular.ttf"),
    "montserrat-regular": require("./assets/Fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/Fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./assets/Fonts/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <AuthContextProvider>
        <UiContextProvider>
          <SoundContextProvider>
            <ThemeContextProvider>
              <StatusBarIN />
              <SafeAreaView
                onLayout={onLayoutRootView}
                style={{ flex: 1, backgroundColor: theme[`pBg-${colorIndex}`] }}
              >
                <AllNavigation />
              </SafeAreaView>
            </ThemeContextProvider>
          </SoundContextProvider>
        </UiContextProvider>
      </AuthContextProvider>
    </>
  );
}
