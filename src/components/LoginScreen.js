
import React, { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { API } from './config';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation= useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }

    try {
      const response = await axios.post(API.login, {
        email,
        password,
      });

      if (response.data.message) {
        console.log('Login successful:', response.data);
        console.log(email);
        navigation.navigate('map', {email});
        // Alert.alert('Success', 'Login Successful',[
        //   {
        //     text: 'OK',
        //     onPress:() => navigation.navigate('map',{ email: emailRef.current }),
        //   },
        // ]);
      } else {
        Alert.alert('Error', 'Invalid login credentials. Please check your email and password.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
        console.error('Request details:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.logoContainer}>
      <Text style={styles.signupheadingText}>Login To Your </Text>
      <Text style={styles.signupheading2Text}>Account</Text>
        <Image source={require('../../assets/car1.png')} style={styles.logo} />
     
        </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Johnathon@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}

        />
                <Image  style={styles.logo1} />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
                 {/* <Image source={require('../../assets/password2.png')} style={styles.logo1} /> */}
                 
                 <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggleBtn}>
  <Image source={showPassword ? require('../../assets/Passwordseen.png') : require('../../assets/password2.png')} style={styles.logo1} />
</TouchableOpacity>

        <View style={styles.forgotButtonContainer}>
          <TouchableOpacity onPress={() => props.navigation.replace("forgotpassword")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>---------------OR---------------</Text>
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={() => props.navigation.replace("signup")}>
        <Text style={styles.signupText}>SIGN UP </Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  logo: {
    width: 350, 
    height: 160, 
  },
  inputView: {
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
    alignItems: 'center',
  },
  logo1: {
    width: 25,
    height: 25,
    bottom: 40,
    left: 130,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  forgotButtonContainer: {
    width: '100%',
    alignItems: 'flex-end', 
    top: 13,
  },
  forgotText: {
    color: '#38447E',
    fontSize: 15,
    textDecorationLine: 'underline' ,
  },
  orContainer: {
    marginVertical: 10,
    top: 10, 
  },
  orText: {
    color: '#38447E',
    fontSize: 15,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    backgroundColor: "#38447E",
  },
  inputView: {
    borderRadius: 30,
    width: '70%',
    bottom: 20,
    alignItems: 'center',
  },
  loginText: {
    color: "white"
  },
  signupBtn: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#38447E",
  },
  signupText: {
    color: "white"
  },
  signupheadingText:{
    fontSize:40,
    right: 70,
    fontWeight: 'bold',
    bottom: 20,
    color: '#4595E0',
  },

  signupheading2Text:{
    fontSize:40,
    right: 120,
    bottom: 25,
    fontWeight: 'bold',
    color: '#464646',

  },
  passwordToggleBtn: {
    position: 'absolute',
    top: 130,
  },
  
});
