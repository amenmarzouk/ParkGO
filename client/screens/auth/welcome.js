import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import welcomestyles from "../../components/auth_styles/welcomeStyles";
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { AuthContext } from "../../context/AuthContext";

const Welcome = () => {
  const {logout}=useContext(AuthContext)
  const [state, setstate] = useState(10);
  let a = "fff";
  function test(val) {
    a = "ddd";
    setstate(29);
    console.warn(a);
  }
  return (
    <View style={welcomestyles.container}>
     
  
      <Text style={welcomestyles.title}>| Welcome</Text>
      <View style={welcomestyles.auth}>

        
      </View>
      <View style={welcomestyles.buttom}>
      <TouchableOpacity
          onPress={() => logout()}
          activeOpacity={1}
          style={welcomestyles.registre}
        >
          <Text style={{ color: "white" }}>LogOut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("hi")}
          activeOpacity={1}
          style={welcomestyles.login}
        >
          <Text style={{ color: "white" }}>alert</Text>
        </TouchableOpacity>





      </View>
     
    </View>
  );
};

export default Welcome;
