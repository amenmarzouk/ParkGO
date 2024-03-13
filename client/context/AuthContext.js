import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import react, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
export const AuthContext = createContext();
const { jwtDecode } = require("jwt-decode");
import base64 from "react-native-base64";
import JWT from "expo-jwt";

import { buffer } from "buffer";
import { Alert, View } from "react-native";
export const AuthProvider = ({ children }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [Userinfo, setUserinfo] = useState(null);
  const [IsApproved, setIsApproved] = useState(false);




  const login = async (data) => {
    setIsLoading(false);
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, data);
      let user = response.data;
      setUserinfo(user);
      console.log(user);
      setUserToken(user.data.token);
      setIsApproved(true);
      AsyncStorage.setItem("UserToken", user.data.token);
   
 
    } catch (error) {
      if (error.response && error.response.status == 403) {
        Alert.alert("you are not Approved");
      }
    }

    setIsLoading(false);
  };
  const logout = () => {
    setIsLoading(false);
    setUserToken(null);
    AsyncStorage.removeItem("UserToken");
    setIsLoading(false);
  };

  const islogedin = async () => {
    try {
      setIsLoading(true);
      let usertoken = await AsyncStorage.getItem("UserToken");
      setUserToken(usertoken);
      setIsLoading(false);
    } catch (e) {
      console.log("logged in", e);
    }
  };

  useEffect(() => {
    islogedin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, IsApproved, IsLoading, UserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
