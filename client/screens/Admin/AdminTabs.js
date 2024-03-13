import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Administrations from "./Administration/Administrations";
import Panel from "./Panel";
import Users from "./users";
import Cars from "./Cars/cars";

const Tabm = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import CarDetail from "./Cars/Cardetail";
import AddCar from "./Cars/AddCar";
import AddAdministration from "./Administration/AddAdminstration";
const AdminTabs = () => {
  const Stack = createStackNavigator();
  return (
    <Tab.Navigator initialRouteName="Panel">
      <Tab.Screen
        name="Administrations"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="office-building"
              color={color}
              size={26}
            />
          ),
          headerShown: false,
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="AdministrationList"
              component={Administrations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdministrationDetail"
              component={CarDetail}
              options={{ title: "Administration Detail" }}
            />
            <Stack.Screen
              name="AddAdministration"
              component={AddAdministration}
              options={{ title: "Add Administration" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Panel"
        component={Panel}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cars"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
          headerShown: false,
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="CarsList"
              component={Cars}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Car Detail" component={CarDetail} />
            <Stack.Screen name="Add Car" component={AddCar} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      {/* <Tab.Screen
        name="Cars"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
          headerShown: false,
        }}
      >
       
      </Tab.Screen> */}
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabs;
