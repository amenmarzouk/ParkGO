import React from "react";
import { View, StyleSheet } from "react-native";
import Welcome from "../auth/welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStackNavigator } from "@react-navigation/stack";

import AdminTabs from "../Admin/AdminTabs";
import CarDetail from "../Admin/Cars/Cardetail";
import CarsProvider from "../../context/CarsContext";
import AdministrationProvider from "../../context/AdministrationContext";

const AdminStack = () => {
  const Stack = createStackNavigator();
  return (

    <AdministrationProvider>
      <CarsProvider>
    <Stack.Navigator>
      <Stack.Screen
        name="AdminTabs"
        component={AdminTabs}
        options={{ headerShown: false }}
      />
{/*       <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
    
        <Stack.Screen name="CarDetail" component={CarDetail} />
        <Stack.Screen name="editcar" component={CarDetail} />
      </Stack.Group> */}
    </Stack.Navigator>
    </CarsProvider>
    </AdministrationProvider>

  );
};

const styles = StyleSheet.create({});

export default AdminStack;
