import React, { useContext, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
 import ActionSheet from "react-native-actions-sheet";
import { forwardRef } from 'react';


import { useNavigation } from '@react-navigation/native';
import { CarContext } from "../context/CarsContext";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const CarsActionSheet = forwardRef((props,ref)=> {
    const { mat } = props;
    const navigation = useNavigation();
    const {getCarsList}=useContext(CarContext)
   
    const handleEdit = () => {
        ref.current?.hide();
      };
    
    
    
      const handleDelete = async () => {
        try {
          const response = await axios.delete(
            `${BASE_URL}/car/delete/${mat}`
          );
          getCarsList();
        } catch (error) {
            console.log(error.message);
          console.log(error.response.data);
        
        }
        ref.current?.hide();
      };
    
    
    
      const handleDetail = () => {
        navigation.navigate("Car Detail",{
          RegisNB:mat
        })
        ref.current?.hide();
      };
  return (
    <ActionSheet
      containerStyle={{ height: 300, backgroundColor: "#EAE6E5" }}
      ref={ref}
    >
      <View style={{ padding: 20, gap: 15 }}>
        <TouchableOpacity
          onPress={handleDetail}
          style={{
            backgroundColor: "white",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            backgroundColor: "white",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            backgroundColor: "white",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet> 
    
   
  );
});

const styles = StyleSheet.create({});

export default CarsActionSheet;
