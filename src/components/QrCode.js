import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Footer from "./Footer";
import Header from "./Header";

const QrCode = (props) => {
  const [qrValue, setQrValue] = useState("");
  const [showPaymentUI, setShowPaymentUI] = useState(false);


  useEffect(() => {
    generateAndSetQrCodeValue();
  }, []);

  const generateAndSetQrCodeValue = () => {
    const uniqueValue = Date.now().toString();
    setQrValue(uniqueValue);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.selectSpaceText}>
        Scan this QR Code at the Entrance
      </Text>
      {qrValue ? (
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={qrValue}
            size={200}
            color="white"
            backgroundColor="black"
            key={qrValue}
          />
          <Text style={styles.qrnumber}>{qrValue}</Text>
        </View>
      ) : (
        <Text>Loading QR code...</Text>
      )}
      {/* <TouchableOpacity style= {styles.paymentBtn } onPress={() => props.navigation.replace("payment")}>
        <Text style={styles.signupText} >Payment </Text> 
      </TouchableOpacity> */}
      <Footer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  selectSpaceText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    color: "#38447E",
    bottom: 120,
  },
  qrnumber: {
    fontSize: 25,
    top: 20,
    color: "#38447E",
    fontWeight: "bold",
  },
  qrCodeContainer: {
    borderWidth: 2,
    borderColor: "black",
    padding: 50,
    borderRadius: 10, 
  },

  signupText:{
    color: "#ffff",
  }
});

export default QrCode;
