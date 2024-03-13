import React from "react";
import { View, StyleSheet } from "react-native";
import SignUp from "./SignUp";
import Signin from "./Signin";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
  <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}  />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} 
      />
          
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AuthStack;
