import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Animated,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API } from "./config";

export default function SignupScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const carPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(carPosition, {
      toValue: 1100,
      duration: 9000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all the details.");
      return;
    }

    try {
      console.log(email, password);
      const response = await axios.post(API.signup, {
        email,
        password,
      });
      console.log(response.data.message);

      if (response.data.message) {
        console.log("Signup successful:", response.data.message);
        Alert.alert("Success", "Account created successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("LoginScreen"),
          },
        ]);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert(
            "Error",
            "Invalid email or password. Please check your credentials."
          );
        } else if (
          error.response.status === 400 &&
          error.response.data.message === "User already exists with this email"
        ) {
          Alert.alert("Error", "User is already registered with this email.");
        }
      } else if (error.request) {
        console.error("No response received from the server");
        console.error("Request details:", error.request);
      } else {
        console.error("Error during request setup:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.signupheadingText}>Create your</Text>
      <Text style={styles.signupheading1Text}>Account</Text>

      <Animated.Image
        source={require("../../assets/car1.png")}
        style={[styles.logo, { transform: [{ translateX: carPosition }] }]}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email*"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Image style={styles.logo1} />

        <TextInput
          style={styles.textInput}
          placeholder="Password*"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggleBtn}
        >
          <Image
            source={
              showPassword
                ? require("../../assets/Passwordseen.png")
                : require("../../assets/password2.png")
            }
            style={styles.logo1}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggleBtn}
        >
          <Image
            source={
              showPassword
                ? require("../../assets/Passwordseen.png")
                : require("../../assets/password2.png")
            }
            style={styles.logo1}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>----------------OR----------------</Text>
      </View>
      <View style={styles.login}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.loginText}>
            Already have an Account?{" "}
            <Text style={styles.loginText1}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    bottom: 33,
    left: 130,
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    bottom: 30,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: "100%",
    top: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  textInput1: {
    height: 50,
    width: "100%",
    top: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },

  login: {
    alignItems: "center",
    top: 25,
  },
  loginText: {
    color: "#9E9E9E",
    fontSize: 15,
  },
  loginText1: {
    color: "#38447E",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  orContainer: {
    marginVertical: 10,
    top: 20,
  },
  orText: {
    color: "#38447E",
    fontSize: 15,
  },
  signupBtn: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 8,
    backgroundColor: "#4595E0",
  },
  signupText: {
    color: "white",
  },
  signupheadingText: {
    fontSize: 40,
    right: 90,
    bottom: 25,
    fontWeight: "bold",
    color: "#464646",
  },
  signupheading1Text: {
    fontSize: 40,
    right: 120,
    bottom: 30,
    fontWeight: "bold",
    color: "#4595E0",
  },
  passwordToggleBtn: {
    position: "absolute",
    top: 130,
  },
});
