import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";
import Header from "./Header";
import Footer from "./Footer";
import { usebookingDetails } from "./Context/bookingDetailsContext";

const User = (props) => {
  const { email, emailSetter } = usebookingDetails();
  const navigation = useNavigation();

  const handlePaymentPress = () => {
    navigation.navigate("Payment");
  };
  const handleHistoryPress = () => {
    navigation.navigate("parkinghistory");
  };
  const handleHowItWorksPress = () => {
    navigation.navigate("howitworks");
  };
  const handleSupportPress = () => {
    navigation.navigate("support");
  };

  const handleSettingsPress = () => {
    navigation.navigate("settings");
  };

  const handleLogoutPress = async () => {
    await SecureStore.deleteItemAsync("jwtToken");
    props.setIsLoggedIn(false);
    emailSetter("");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userIcon}>
        <Image
          source={require("../../assets/settings/userIcon.png")}
          style={{ width: 95, height: 95 }}
        />
        <Text style={styles.userName}> {email}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handlePaymentPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/payment.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> Payment Methods </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleHistoryPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/history.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> Parking History </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleHowItWorksPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/howItWorks.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> How it Works </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSupportPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/support.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> Support </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/settings.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> Settings </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogoutPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/settings/logout.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.userProfileText}> Logout </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Header />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#4595E0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userIcon: {
    marginBottom: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: 170,
    height: 170,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userProfileIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  userProfileText: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default User;
