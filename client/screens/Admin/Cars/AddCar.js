import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import PickerModal from "react-native-picker-modal-view";
import * as yup from "yup";
import { AdministrationContext } from "../../../context/AdministrationContext";

const list = [
  { Id: 1, Name: "Test1 Name", Value: "Test1 Value" },
  { Id: 2, Name: "Test2 Name", Value: "Test2 Value" },
  { Id: 3, Name: "Test3 Name", Value: "Test3 Value" },
  { Id: 4, Name: "Test4 Name", Value: "Test4 Value" },
];


const AddCar = () => {
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
        Matricule: yup
          .string("must be a string")

          .required(" donner Matricule"),

        Administration: yup.string().required(),
      })
    ),

    mode: "onChange",
    defaultValues: {
      Matricule: "",
      Administration: "",
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
        name="Matricule"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Matricule"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.Matricule && (
        <Text style={{ color: "red" }}>{errors.Matricule.message}</Text>
      )}
      <PickerModal
        onSelected={onSelected}
        onClosed={onClosed}
        onBackButtonPressed={onBackButtonPressed}
        items={AdministrationsList}
        sortingLanguage={"tr"}
        showToTopButton={true}
        selected={selectedItem}
        showAlphabeticalIndex={true}
        autoGenerateAlphabeticalIndex={true}
        selectPlaceholderText={"Choose Administration"}
        onEndReached={() => console.log("list ended...")}
        searchPlaceholderText={"Search..."}
        requireSelection={false}
        autoSort={false}
      />
    </ScrollView>
  );
};

export default AddCar;
