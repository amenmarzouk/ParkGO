import React, {
  useEffect,
  useState,
  component,
  useContext,
  useTransition,
  useMemo,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { loginSchema } from "../../utils/yupvalidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
const { jwtDecode } = require("jwt-decode");

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import { Link } from "@react-navigation/native";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
import Alert from "../../components/alert.js";

const Signin = ({navigation}) => {
  const [showPassword1, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword1);
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitted, errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      Matricule: "",
      Password: "",
    },
  });

  const { login } = useContext(AuthContext);
  const { IsApproved } = useContext(AuthContext);
  const [isPending, startTransition] = useTransition();
  
  const handlelogin =(data)=>{
    login(data)
   
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F8F8F8" }}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <StatusBar />
          <Text style={styles.title}>Sign in</Text>

          <View style={styles.inputs}>
            <Controller
              control={control}
              name="Matricule"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label="Matricule*"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={5}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.Matricule && (
              <Text style={{ color: "red" }}>{errors.Matricule.message}</Text>
            )}
            <Controller
              control={control}
              name="Password"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={{ width: 300 }}
                  label="Password*"
                  mode="outlined"
                  value={value}
                  secureTextEntry={!showPassword1}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={8}
                  right={
                    <TextInput.Icon onPress={toggleShowPassword} icon="eye" />
                  }
                />
              )}
            />
            {errors.CIN && (
              <Text style={{ color: "red" }}>{errors.CIN.message}</Text>
            )}
            <Button
              buttonColor="#3260a8"
              mode="contained"
              onPress={handleSubmit(handlelogin)}
              disabled={!isValid}
            >
              Sign in
            </Button>
          </View>
          <Text style={styles.Signup}>
            don't have an account ?
            <Link style={{ color: "purple" }} to={{ screen: "SignUp" }}>
              Sign Up
            </Link>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    {/*   {isSubmitted && !IsApproved &&  <AlertNotificationRoot>
      <View>
        {Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: "Your account is Not Approved Yet",
          button: "signin",
        })}
      </View>
    </AlertNotificationRoot>} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight * 3 : 0,
  },
  inputs: {
    top: 30,
    gap: 10,
  },
  submit: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    top: -50,
  },
  Signup: {
    top: 50,
    color: "blue",
    fontSize: 15,
  },
});

export default Signin;
