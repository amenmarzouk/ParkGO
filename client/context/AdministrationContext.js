import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../utils/config";
import axios from "axios";

export const AdministrationContext = createContext();
const AdministrationProvider = ({children}) => {
  const [AdministrationsList, setAdministrationsList] = useState();

  const getAdministrationsList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/administration/`);

      setAdministrationsList(response.data.data);

    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  };
  console.log(AdministrationsList);
  const AdminstraValues = {
    getAdministrationsList,
    AdministrationsList,
    setAdministrationsList,
  };
  return (
    <AdministrationContext.Provider value={AdminstraValues}>
{children}
    </AdministrationContext.Provider>
  );
};

export default AdministrationProvider;
