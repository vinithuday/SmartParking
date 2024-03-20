import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  StatusBar,
} from "react-native";
import { API } from "./config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigation = useNavigation();

  const carPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(carPosition, {
      toValue: 1100,
      duration: 9000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleForgotPassword = async () => {
    try {
      const trimmedEmail = email.trim();
      const response = await axios.post(API.forgotpassword, {
        email: trimmedEmail,
      });
      if (!response.status === 200) {
        console.log(response.message);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      Alert.alert("Invalid email! Please check the Email");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.signupheadingText}>Forgot your Password?</Text>
      <Text style={styles.signupheading1Text}>Don't Worry!</Text>

      <Animated.Image
        source={require("../../assets/car1.png")}
        style={[styles.logo, { transform: [{ translateX: carPosition }] }]}
      />
      <Text style={styles.Text}>Please Enter your Email Id</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email Id"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.emailButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.emailText}>SEND EMAIL</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
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
  logoContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  logo: {
    width: 420,
    height: 195,
    bottom: 30,
    right: 400,
  },
  logo1: {
    width: 25,
    height: 25,
    bottom: 59,
    left: 130,
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    marginBottom: 50,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  Text: {
    marginBottom: 40,
    fontSize: 15,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#38447E",
  },
  emailButton: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4595E0",
    bottom: 20,
  },
  emailText: {
    color: "white",
  },
  backContainer: {
    width: "100%",
    alignItems: "center",
    bottom: 1,
  },
  backText: {
    color: "#38447E",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  signupheadingText: {
    fontSize: 30,
    right: 55,
    bottom: 50,
    fontWeight: "bold",
  },
  signupheading1Text: {
    fontSize: 40,
    right: 105,
    bottom: 40,
    fontWeight: "bold",
    color: "#4595E0",
  },
  successText: {
    bottom: 180,
    fontSize: 15,
  },
});

export default ForgotPassword;
