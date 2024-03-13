import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import PickerModal from "react-native-picker-modal-view";
import * as yup from "yup";
import { AdministrationContext } from "../../../context/AdministrationContext";


const AddAdministration = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const {AdministrationsList}=useContext(AdministrationContext)
  const onClosed = () => {
    console.log("close key pressed");
  };

  const onSelected = (selected) => {
    setSelectedItem(selected);
    return selected;
  };

  const onBackButtonPressed = () => {
    console.log("back key pressed");
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

          .required(" donner Matricule"),

        Manager: yup.string().required(),
        Adress: yup.string().required(),
      })
    ),

    mode: "onChange",
    defaultValues: {
      Name: "",
      Adress: "",
      Manager: "",
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{
        top: 12,
        justifyContent: "center",
        marginHorizontal: 20,
      }}
    >
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
        name="Adress"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Adress"
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
      <PickerModal
        onSelected={onSelected}
        onClosed={onClosed}
        onBackButtonPressed={onBackButtonPressed}
        items={AdministrationsList}
        sortingLanguage={"fr"}
   
     
        showToTopButton={true}
        selected={selectedItem}
        showAlphabeticalIndex={true}
      
        selectPlaceholderText={"Choose Administration"}
        onEndReached={() => console.log("list ended...")}
        searchPlaceholderText={"Search..."}
        requireSelection={false}
        autoSort={false}
      />
    </ScrollView>
  );
};

export default AddAdministration;
