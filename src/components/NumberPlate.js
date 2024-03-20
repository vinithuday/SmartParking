import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Header from "./Header";
import Footer from "./Footer";

const CarNumberPlateInput = () => {
  const [carNumberPlate, setCarNumberPlate] = useState("");

  const handleValidateCarNumberPlate = () => {
    const regex = /^[A-Za-z]{1,2}[A-Za-z]{1,2}[0-9]{1,3}$/;

    if (regex.test(carNumberPlate)) {
      Alert.alert("Success", "Car number plate is valid!");
    } else {
      Alert.alert("Error", "Please enter a valid car number plate.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        <Text style={styles.title}>Enter Car Number Plate</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter car number plate"
            value={carNumberPlate}
            onChangeText={(text) => setCarNumberPlate(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleValidateCarNumberPlate}
          >
            <Text style={styles.buttonText}>Validate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>
            Here are some important tips for you to enter the car number plate
          </Text>
          <Text style={styles.cardContent}>
            1. Please Enter the correct number.{"\n"}
            2. If you have enterd the fake number, then you will have to pay the
            fine.{"\n"}
            Thank you for choosing our parking service.{" "}
          </Text>
        </View>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4595E0",
    marginTop: 40,
  },
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    top: 15,
  },
  button: {
    height: 60,
    marginLeft: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4595E0",
    top: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: "10%",
    top: 30,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4595E0",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: "#38447E",
  },
});

export default CarNumberPlateInput;
