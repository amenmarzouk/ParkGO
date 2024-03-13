import React, { createContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BASE_URL } from "../utils/config";
import axios from "axios";

export const CarContext = createContext();
const CarsProvider = ({ children }) => {
  const [CarsList, setcarslist] = useState();
  const [filtredcars, setFiltredCars] = useState();

  const getCarsList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/car/`);

      setcarslist(response.data.data);
      setFiltredCars(response.data.data);
    } catch (error) {
 
    }
  };
  carsvalues = {  getCarsList,
    CarsList,
    setcarslist,
    filtredcars,
    setFiltredCars,};
  return (
    <CarContext.Provider
      value={carsvalues}
    >
      {children}
    </CarContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default CarsProvider;
