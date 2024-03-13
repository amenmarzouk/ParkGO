import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";

import { SearchBar } from "@rneui/themed";

import ActionSheet from "react-native-actions-sheet";

import { AuthContext } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CarsActionSheet from "../../../components/CarsActionSheet";
import CarsProvider, { CarContext } from "../../../context/CarsContext";

//van
//ludospace
//compacte
//drirection centrale
//direction regional

export default Cars = ({ navigation }) => {

  const { logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [matricule, setmatricule] = useState("");
const {getCarsList}=useContext(CarContext)
const {setFiltredCars}=useContext(CarContext)
const {filtredcars}=useContext(CarContext)
const {CarsList}=useContext(CarContext)

  const actionSheetadd = useRef();
  const actionSheet = useRef();








 

  useEffect(() => {
    getCarsList();
  }, []);

  const handlepress = (regisNB) => {
    setmatricule(regisNB);
    actionSheet.current?.show();
   
  };

  console.log(matricule);

  const carslist = ({ item }) => {
 
    return (
      <Pressable
        style={{
          backgroundColor: "white",
          marginBottom: 12,
          borderRadius: 10,
          marginHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          height: 50,
        }}
        onPress={() => handlepress(item.regisNB)}
      >
        <View style={{ alignItems: "center", left: -20 }}>
          <Text style={{ fontSize: 11, color: "black" }}>Matricule</Text>
          <Text style={{ fontSize: 15, color: "black" }}>{item.regisNB}</Text>
        </View>
        <View style={{ alignItems: "center", right: 25 }}>
          <Text style={{ fontSize: 11, color: "black" }}>Status</Text>
          {item.dispo ? (
            <Text style={{ fontSize: 20, color: "green" }}>Disponible</Text>
          ) : (
            <Text style={{ fontSize: 20, color: "red" }}>indisponible</Text>
          )}
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text>Model</Text>
        </View>
      </Pressable>
    );
  };

  const handleFilter = (state, matricule) => {
    if (state === "All") {
      setFiltredCars(CarsList);
    } else {
      const filtered = CarsList.filter((item) => item.dispo === state);
      setFiltredCars(filtered);
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (

    <View style={styles.main}>
      <View style={styles.header}>
    {/*     <Ionicons
          style={{ top: 10, left: 12 }}
          name="arrow-back-outline"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        /> */}
        <Text style={{ fontSize: 25, top: 4,left:12 }}>Cars</Text>
        <Octicons
          style={{ top: 10, right: 12 }}
          name="diff-added"
          size={24}
          color="black"
          onPress={() => {
            navigation.navigate("Add Car");
          }}
        />
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        platform="android"
        ContainerStyle={{ height: 30 }}
      />
      <View style={styles.top}>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            borderRadius: 5,
            height: 30,
            backgroundColor: "black",
          }}
          onPress={() => handleFilter("All")}
        >
          <Text style={{ color: "white" }}>ALL</Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            borderRadius: 5,
            height: 30,
            backgroundColor: "#66BB6A",
          }}
          onPress={() => handleFilter(true)}
        >
          <Text style={{ color: "white" }}>Avaible</Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            borderRadius: 5,
            height: 30,
            backgroundColor: "#EF5350",
          }}
          onPress={() => handleFilter(false)}
        >
          <Text style={{ color: "white" }}>Not Avaible</Text>
        </Pressable>
      </View>

      <FlatList
        keyExtractor={(item) => item._id}
        data={filtredcars}
        renderItem={carslist}
      />
   <CarsActionSheet  mat={matricule} ref={actionSheet}/>  
    </View>
  
  );
};

const styles = StyleSheet.create({
  main: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "white",
  },
  top: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
  },
});
