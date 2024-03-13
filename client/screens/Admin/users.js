import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

const Users = () => {
  return (
    <View>
      <View style={styles.header}>
        <Octicons
          style={{ top: 10, left: 12 }}
          name="search"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 25, top: 4, right: 15, left: 130 }}>
          Users
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",

    height: 50,
    backgroundColor: "white",
  },
});

export default Users;
