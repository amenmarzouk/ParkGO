import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";
import { Button } from "react-native-paper";
import { AuthContext } from "../../../context/AuthContext";

import { Octicons } from '@expo/vector-icons';
import {AdministrationContext} from "../../../context/AdministrationContext";

const Administrations = ({navigation}) => {

  const {getAdministrationsList}=useContext(AdministrationContext)
  const {setAdministrationsList}=useContext(AdministrationContext)
  const {AdministrationsList}=useContext(AdministrationContext)


 useEffect(() => {
    getAdministrationsList();
  }, []);

  const cars = ({ item }) => {
    console.log(item.dispo);
    return (
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 12,
          borderRadius: 10,
          marginHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          height: 50,
        }}
      >
        <Text style={{ fontSize: 20, color: "black" }}>{item.name}</Text>

          <Text style={{ fontSize: 30, color: "black" }}>{item.adress}</Text>
       
      
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
      <Octicons style={{top:10,left:12}} name="search" size={24} color="black" />
        <Text style={{fontSize: 25, top:4,right:15}}>Administration</Text>
        <Octicons style={{top:10,right:12}} name="diff-added" size={24} color="black" onPress={()=>{
        navigation.navigate("AddAdministration")
        }}/>
        {/*  //search*/}
        {/*  //add*/}
      </View>
    
      <FlatList
        keyExtractor={(item) => item._id}
        data={AdministrationsList}
        renderItem={cars}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor:"white",
    marginBottom:10
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
});

export default Administrations;
