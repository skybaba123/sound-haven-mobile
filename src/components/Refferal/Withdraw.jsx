import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import BottomSliderFull from "../../UI/BottomSliderFull";
import { theme } from "../../utils/colors";
import { ThemeContext } from "../../store/theme";
import { AntDesign } from "@expo/vector-icons";

const Withdraw = ({ setOpenWithdrawal }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [amountInput, setAmountInput] = useState("");

  const withdrawHandler = () => {
    if (isNaN(amountInput)) {
      return console.log("This Is not a Number" + " " + isNaN(amountInput));
    }
    console.log(amountInput);
  };

  return (
    <BottomSliderFull>
      <View style={styles.container}>
        <View style={styles.enterAmount}>
          <Pressable onPress={setOpenWithdrawal.bind(this, false)}>
            <AntDesign
              name="down"
              size={30}
              color={theme[`ac-${colorIndex}`]}
            />
          </Pressable>

          <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
            Enter Amount
          </Text>
        </View>

        <TextInput
          keyboardType="phone-pad"
          value={amountInput}
          onChangeText={(enteredText) => setAmountInput(enteredText)}
          style={[
            styles.input,
            {
              backgroundColor: theme[`sBg-${colorIndex}`],
              color: theme[`pT-${colorIndex}`],
            },
          ]}
        />

        <Pressable
          onPress={withdrawHandler}
          android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
          style={[
            styles.button,
            { backgroundColor: theme[`ac-${colorIndex}`] },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: theme[`pT-${colorIndex}`] }]}
          >
            Withdraw amount
          </Text>
        </Pressable>
      </View>
    </BottomSliderFull>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    alignItems: "center",
  },

  enterAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: "36%",
    paddingLeft: "5%",
  },

  text: {
    fontFamily: "montserrat-medium",
    marginBottom: 20,
  },

  input: {
    width: "70%",
    height: 50,
    borderRadius: 5,
    fontFamily: "montserrat-bold",
    paddingHorizontal: 20,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    alignItems: "center",
    borderRadius: 5,
  },

  buttonText: {
    fontFamily: "montserrat-medium",
    padding: 10,
  },
});
