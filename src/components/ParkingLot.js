import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";

const ParkingLot = ({}) => {
  const navigation = useNavigation();
  const handleQRCodePress = () => {
    navigation.navigate("qrcode");
  };

  return (
    <View style={[styles.container]}>
      <Header />

      <Text> this is parkinglot page</Text>
      <TouchableOpacity style={styles.QRCodeBtn} onPress={handleQRCodePress}>
        <Text style={styles.QRCodeText}>View QR Code</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  QRCodeBtn: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#38447E",
  },
  QRCodeText: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ParkingLot;
