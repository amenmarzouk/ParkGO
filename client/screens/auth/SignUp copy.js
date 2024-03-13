import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Formik } from "formik";
import { useForm, Controller } from "react-hook-form";
import { signupSchema } from "../../utils/yupvalidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  Alert,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import Administration from "../../components/Administration.js";
import Role2 from "../../components/Role2.js";
import axios from "axios";
import { BASE_URL } from "../../utils/config.js";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { AuthContext } from "../../context/AuthContext.js";
import { SignupContext, SignupProvider } from "../../context/SignupContext.js";

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [Administ, setadministration] = useState();
  const [Role, setRole] = useState();
  const [_, forceUpdate] = useReducer(x => x + 1, 0);



  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    trigger,
    setError,
    unregister,
    register,
    reset,
    watch,
    formState,

    formState: { isSubmitSuccessful, errors, isValid },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        Name: yup
          .string("must be a string")
          .strict()
          .required(" donner votre nom")
          .matches(/^[a-zA-Z_ ]*$/, "donner un nom valide"),
        LastName: yup
          .string()
          .required(" donner votre prenom")
          .matches(/^[a-zA-Z_ ]*$/, "donner un prenom valide"),
        NumTEL: yup
          .string()
          .test("len", "numero n'est pa valide", (val) => val.length === 8)
          .required(" donner votre Telephone")
          .matches(/^\d+$/, "donner un Telephone valide"),
        Matricule: yup
          .string()
          .test("len", "matricule n'est pa valide", (val) => val.length === 5)
          .required(" donner votre matricule"),
        Password: yup
          .string()
          .test("len", "CIN n'est pa valide", (val) => val.length === 8)
          .required(" donner votre CIN")
          .matches(/^\d+$/, "donner un CIN valide"),
        Administration: yup.string().when("$Administration",(Administ,schema)=>{
          console.log(Administ);
          if(Administ){
            return schema
          }
            return schema.required()
          
       
        }),
        Role: yup.string().when("$Role",(Role,schema)=>{
         
        }),
        LicenceNB: yup.string().when("$Role",(Role,schema)=>{
          console.log(Role);
          if(Role=="Driver"){
            return schema.required()
          }
          return;
        }),
      })
    ),
    context: { Role:Role,Administration:Administ},
    mode: "onChange",
    defaultValues: {
      Name: "a",
      LastName: "b",
      NumTEL: "27659617",
      Administration: "",
      Matricule: "12345",
      Password: "12345678",
      Role: "",
      LicenceNB: "",
    },
  });
  /*  const {setRole}=useContext(SignupContext)
const {setadministration}=useContext(SignupContext)
const {onSubmit}=useContext(SignupContext)
const {done}=useContext(SignupContext)
const {Role}=useContext(SignupContext) 
 */

  const [done, setdone] = useState(false);

const rerender=(value)=>{
setRole(value)


}


  const onSubmit = (data) => {
    data.Administration = Administ;
    data.Role = Role;
    console.log(data);
    axios
      .post(`${BASE_URL}/user/registre`, data)
      .then((res) => {
        if (res.status == "201") {
          setTimeout(() => {
            navigation.navigate("Signin");
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response.status == 409) {
          Alert.alert("user exist deja");
        }
      });
  };
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
useEffect(()=>{
  forceUpdate()
},[Role])
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F8F8F8" }}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <StatusBar />
          <Text style={styles.title}>Sign up</Text>

          <View style={styles.inputs}>
            <Controller
              control={control}
              name="Name"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label="Name"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.Name && (
              <Text style={{ color: "red" }}>{errors.Name.message}</Text>
            )}
            <Controller
              control={control}
              name="LastName"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label="LastName"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.LastName && (
              <Text style={{ color: "red" }}>{errors.LastName.message}</Text>
            )}

            <Controller
              control={control}
              name="NumTEL"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label="Telephone"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  maxLength={8}
                />
              )}
            />
            {errors.NumTEL && (
              <Text style={{ color: "red" }}>{errors.NumTEL.message}</Text>
            )}
            {/*  dropdowns */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Administration ondata={setadministration} />
              <Role2 ondata={rerender} />
            </View>

            {/*   dropdowns */}
            {Role == "Driver" && (
              <Controller
                control={control}
                name="LicenceNB"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    label="numéro de permis*"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    maxLength={5}
                  />
                )}
              />
            )}
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
                  label="Password*"
                  mode="outlined"
                  value={value}
                  secureTextEntry={showPassword}
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
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Sign up
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/*    <AlertNotificationRoot>
        <View>
          {done &&
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Signed Up successfully",
              button: "signin",
            })}
        </View>
      </AlertNotificationRoot> */}
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
    gap: 10,
    top: -30,
    width: "90%",
    textAlign: "center",
  },
  submit: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    top: -50,
  },
});

export default SignUp;
