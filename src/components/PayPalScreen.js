import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { View, StyleSheet, Image } from "react-native";

const PayPalScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Footer />
      <Image source={require("../../assets/paypal.webp")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 400,
  },
});

export default PayPalScreen;
