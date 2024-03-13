import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./auth/SignUp";
import Signin from "./auth/Signin";
import { AuthContext } from "../context/AuthContext";
import Test from "./auth/test";
import AuthStack from "./auth/AuthStack";

import AdminStack from "./app/AdminStack.js";

const AppNav = () => {
  const { IsLoading, UserToken } = useContext(AuthContext);
  if (IsLoading) {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"small"} />
    </View>
    )
  }
  

  return (
    <NavigationContainer>
      {UserToken !== null ? <AdminStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
