import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { BASE_URL } from "../../../utils/config";
import { AntDesign } from "@expo/vector-icons";
const CarDetail = ({ route, navigation }) => {
  const [car, setcar] = useState();
  const [adminst, setadminist] = useState();
  const [dispo, setdispo] = useState();
  const [carreg, setcarreg] = useState(route.params.RegisNB);
console.log(carreg);
  const getCar = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/car/${carreg}`);

      setcar(response.data.data.car);
      setadminist(response.data.data.car.administration.name);
      setdispo(response.data.data.car.dispo);
    } catch (error) {
    }
  };
  useEffect(() => {
    getCar();
  }, []);
  console.log(car);
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View>
        {dispo ? (
          <View style={styles.status}>
            <AntDesign name="checkcircle" size={20} color="green" />
            <Text style={{ fontSize: 20, color: "green" }}>Disponible</Text>
          </View>
        ) : (
          <View style={styles.status}>
            <AntDesign name="closecircle" size={20} color="red" />
            <Text style={{ fontSize: 20, color: "red" }}>indisponible</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text>Matricule</Text>
        <Text>{carreg}</Text>
      </View>
      <View style={styles.details}>
        <Text>Administration</Text>
        <Text>{adminst}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  details: {
    top: 10,
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    width: 350,
    height: 70,
    borderRadius: 12,
  },
  status: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    left: -110,
    top: 5,
  },
});

export default CarDetail;
