import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";
import { AuthContext } from "../context/AuthContext";

const Alert = () => {
  const { IsApproved } = useContext(AuthContext);
  return (
    <AlertNotificationRoot>
      <View>
        {Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: "Your account is Not Approved Yet",
          button: "signin",
        })}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({});

export default Alert;
