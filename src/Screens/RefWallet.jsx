import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import RefTransaction from "../components/Refferal/RefTransaction";
import Animated, { FadeIn } from "react-native-reanimated";
import Withdraw from "../components/Refferal/Withdraw";

const transactions = [
  {
    type: "withdrawal",
    amount: 50,
    status: "success",
    createdAt: new Date(),
  },

  {
    type: "withdrawal",
    amount: 60,
    status: "rejected",
    createdAt: new Date(),
  },

  {
    type: "earned",
    amount: 29,
    status: "success",
    createdAt: new Date(),
  },

  {
    type: "withdrawal",
    amount: 30,
    status: "pending",
    createdAt: new Date(),
  },

  {
    type: "withdrawal",
    amount: 60,
    status: "rejected",
    createdAt: new Date(),
  },

  {
    type: "earned",
    amount: 20,
    status: "success",
    createdAt: new Date(),
  },
];

const RefWallet = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const { width, height } = Dimensions.get("screen");
  const [openWithdrawal, setOpenWithdrawal] = useState(false);

  const bgImage =
    "https://images.unsplash.com/photo-1676763133944-1738fb369107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

  const colorsGradient = [
    "rgba(9, 32, 63, 0.7)",
    "#2C3E50",
    "rgba(9, 32, 63, 0.7)",
  ];

  const earnHandler = () => {
    Alert.alert(
      "Refferal",
      "This is your username, share to to your family and friends"
    );
  };

  return (
    <>
      <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
        <View style={styles.nameContainer}>
          <Text
            style={{ marginBottom: "2%", color: theme[`sT-${colorIndex}`] }}
          >
            Hello,
          </Text>
          <Text
            style={{
              fontFamily: "satisfy",
              fontSize: 23,
              color: theme[`pT-${colorIndex}`],
            }}
          >
            Ugochukwu Miracle
          </Text>
        </View>

        <ImageBackground
          style={styles.balContainer}
          imageStyle={{ borderRadius: 10 }}
          source={{
            uri: bgImage,
          }}
        >
          <LinearGradient
            style={styles.balSubContainer}
            colors={colorsGradient}
          >
            <Text
              style={{
                marginBottom: "3%",
                fontFamily: "montserrat-bold",
                color: "white",
                fontSize: height > 640 ? 30 : 25,
              }}
            >
              $100,000.00
            </Text>
            <Text style={{ color: theme[`sT-${colorIndex}`] }}>
              Ref Balance
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: "5%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Pressable
              onPress={setOpenWithdrawal.bind(this, true)}
              style={[
                styles.actionsPress,
                {
                  backgroundColor: "rgba(255, 63, 3, 0.1)",
                },
              ]}
              android_ripple={{ color: "#FF3F03" }}
            >
              <FontAwesome5
                name="hand-holding-usd"
                size={height > 640 ? 30 : 25}
                color="#FF3F03"
              />
            </Pressable>
            <Text style={{ color: theme[`pT-${colorIndex}`] }}>Withdraw</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              onPress={earnHandler}
              style={[
                styles.actionsPress,
                {
                  backgroundColor: "rgba(8, 255, 3, 0.1)",
                },
              ]}
              android_ripple={{ color: "#08FF03" }}
            >
              <MaterialIcons name="attach-money" size={30} color="#08FF03" />
            </Pressable>
            <Text style={{ color: theme[`pT-${colorIndex}`] }}>Earn</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              style={[
                styles.actionsPress,
                {
                  backgroundColor: "rgba(220, 3, 255, 0.1)",
                },
              ]}
              android_ripple={{ color: "#DC03FF" }}
            >
              <MaterialIcons name="help-center" size={30} color="#DC03FF" />
            </Pressable>
            <Text style={{ color: theme[`pT-${colorIndex}`] }}>Guide</Text>
          </View>
        </View>

        <View
          style={[
            {
              flex: 1,
              backgroundColor: theme[`sBg-${colorIndex}`],
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingTop: "2%",
              paddingHorizontal: "3%",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: theme[`pT-${colorIndex}`], fontSize: 16 }}>
              Transactions
            </Text>
          </View>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <RefTransaction
                type={item.type}
                amount={item.amount}
                createdAt={item.createdAt}
                status={item.status}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Animated.View>

      {openWithdrawal && <Withdraw setOpenWithdrawal={setOpenWithdrawal} />}
    </>
  );
};

export default RefWallet;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "15%",
    paddingBottom: "1%",
    paddingHorizontal: "5%",
    // backgroundColor: "#000000",
  },

  nameContainer: {
    marginBottom: "5%",
  },

  balContainer: {
    height: height > 640 ? 170 : 130,
    width: "100%",
    borderRadius: 10,
    marginBottom: "5%",
  },

  balSubContainer: {
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: "10%",
  },

  actionsPress: {
    height: height > 640 ? 70 : 40,
    width: height > 640 ? 70 : 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginBottom: 5,
  },
});
