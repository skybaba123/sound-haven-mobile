import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth";
import { ThemeContext } from "../../store/theme";
import { theme } from "../../utils/colors";
import formattedDate from "../../utils/formattedDate";

const RefTransaction = ({ type, amount, status, createdAt }) => {
  const date = formattedDate(createdAt);
  const colorIndex = useContext(ThemeContext).colorIndex;

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme[`pBg-${colorIndex}`] },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {type === "earned" && (
          <MaterialIcons name="attach-money" size={24} color="#08FF03" />
        )}
        {type === "withdrawal" && (
          <FontAwesome5 name="hand-holding-usd" size={24} color="#FF3F03" />
        )}

        <View style={{ marginLeft: "5%" }}>
          <Text style={{ color: theme[`pT-${colorIndex}`] }}>
            {type.toUpperCase()}
          </Text>
          <Text style={{ color: theme[`sT-${colorIndex}`] }}>{date}</Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: theme[`pT-${colorIndex}`],
            marginBottom: "3%",
            alignItems: "center",
          }}
        >{`$${amount}`}</Text>
        {status === "success" && (
          <Ionicons
            name="checkmark-done"
            size={20}
            color={theme[`ac-${colorIndex}`]}
          />
        )}

        {status === "rejected" && (
          <AntDesign name="close" size={20} color={theme[`ac-${colorIndex}`]} />
        )}

        {status === "pending" && (
          <AntDesign
            name="clockcircleo"
            size={20}
            color={theme[`ac-${colorIndex}`]}
          />
        )}
      </View>
    </Pressable>
  );
};

export default RefTransaction;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height > 640 ? "5%" : "2%",
    paddingHorizontal: "2%",
    borderRadius: 5,
  },
});
