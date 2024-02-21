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

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.signupheadingText}>Forgot your Password?</Text>
      <Text style={styles.signupheading1Text}>Dont Worry!</Text>

      <View style={styles.logoContainer}>
        <Image source={require("../../assets/car1.png")} style={styles.logo} />
      </View>

      <Text style={styles.Text}>Please Enter your Email Id</Text>

      <View style={styles.inputView}>
        <TextInput style={styles.textInput} placeholder="Email Id" />
      </View>
      <Image source={require('../../assets/Messages.png')} style={styles.logo1} />


      <TouchableOpacity
        style={styles.emailButton}

        //write code for reset password
        // onPress={() => props.navigation.replace("login")}
      >
        <Text style={styles.emailText}>SEND EMAIL</Text>
      </TouchableOpacity>

      <View style={styles.backContainer}>
          <TouchableOpacity  onPress={() => props.navigation.replace("LoginScreen")}>
            <Text style={styles.backText}>Back</Text>
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
    width: 380, 
    height: 175, 
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
    marginBottom: 20,
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
    textDecorationLine: 'underline' ,
    color: '#38447E',
  },
  emailButton: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#38447E",
  bottom:20,
  },
  emailText: {
    color: "white",
  },
  backContainer: {
    width: '100%',
    alignItems: 'center', 
   bottom:  1,
  },
  backText: {
    color: '#38447E',
    fontSize: 15,
    textDecorationLine: 'underline' ,
  },
  signupheadingText:{
    fontSize:30,
    right: 55,
    bottom:50,
    fontWeight: 'bold',
    

  },
  signupheading1Text:{
    fontSize:40,
    right: 105,
    bottom: 40,
    fontWeight: 'bold',
    // color: '#38447E',
    color: '#4595E0',

  },
});
