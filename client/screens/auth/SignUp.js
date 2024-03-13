import React, { useState } from "react";

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
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";

import axios from "axios";
import { BASE_URL } from "../../utils/config.js";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { Dropdown } from "react-native-element-dropdown";

const data = [{ label: "Driver" }, { label: "Manager" }];
const dataAdminst = [
  { label: "la poste ettadhamen", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [Administ, setadministration] = useState();
  const [Role, setRole] = useState(null);
  console.log(Role);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusad, setIsFocusad] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
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
        Administration: yup.string().required(),
        Role: yup.string().required(),
        LicenceNB: yup.string().when("Role", (Role, schema) => {
          if (Role == "Driver") {
            return schema.required();
          }
          return;
        }),
      })
    ),

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

  const handleadminist = (value) => {
    setValue("Administration", value);
  };

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
              <Controller
                control={control}
                name="Role"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    defaultButtonText={"Select Administration"}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder={" Role*"}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue("Role", item.label);
                      setRole(item.label);
                      setIsFocus(false);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="Administration"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Dropdown
                    style={[
                      styles2.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    defaultButtonText={"Select Administration"}
                    placeholderStyle={styles2.placeholderStyle}
                    selectedTextStyle={styles2.selectedTextStyle}
                    inputSearchStyle={styles2.inputSearchStyle}
                    iconStyle={styles2.iconStyle}
                    data={dataAdminst}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder={"Administration*"}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocusad(true)}
                    onBlur={() => setIsFocusad(false)}
                    onChange={(item) => {
                      setValue("Administration", item.label);
                      setIsFocusad(false);
                    }}
                  />
                )}
              />
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
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 130,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const styles2 = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 180,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 15,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default SignUp;
