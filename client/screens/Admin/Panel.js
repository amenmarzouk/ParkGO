import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
const Panel = () => {
  
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <View style={styles.header}>
        <Text style={{ fontSize: 25, top: 4, left: 10 }}>ParkGO</Text>

        <MaterialIcons
          style={{ top: 10, right: 12 }}
          name="account-circle"
          size={30}
          color="black"
          onPress={()=>logout()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
});

export default Panel;
