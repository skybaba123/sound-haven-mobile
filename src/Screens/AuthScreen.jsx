import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Login from "../components/auth/Login";
import Welcome from "../components/auth/Welcome";
import CreateAccount from "../components/auth/CreateAccount";

const AuthScreen = () => {
  const [changeScreen, setChangeScreen] = useState("welcome");

  const loginScreen = () => {
    setChangeScreen("login");
  };

  const createAccountScreen = () => {
    setChangeScreen("createaccount");
  };

  const welcomScreen = () => {
    setChangeScreen("welcome");
  };

  return (
    <>
      {changeScreen === "welcome" && (
        <Welcome
          changeScreen={changeScreen}
          setChangeScreen={setChangeScreen}
          onLogin={loginScreen}
          onCreate={createAccountScreen}
        />
      )}
      {changeScreen === "createaccount" && (
        <CreateAccount
          changeScreen={changeScreen}
          setChangeScreen={setChangeScreen}
          onWelcome={welcomScreen}
        />
      )}
      {changeScreen === "login" && (
        <Login
          changeScreen={changeScreen}
          setChangeScreen={setChangeScreen}
          onWelcome={welcomScreen}
        />
      )}
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
