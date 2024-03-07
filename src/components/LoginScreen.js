
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert, Animated } from 'react-native';
import axios from 'axios';
import { API } from './config';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const LoginScreen=(props) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const carPosition = useRef(new Animated.Value(0)).current;
  // console.log("hererereerere======>"+params.route.params.setIsLoggedIn(true))
  useEffect(() => {

    Animated.timing(carPosition, {
      toValue: 1500,
      duration: 9000,
      useNativeDriver: false,
    }).start();
  }, []);

  const saveJwtToken = async (token) => {
    try {
      await SecureStore.setItemAsync('jwtToken', token);
    
      console.log('JWT token saved successfully');
    } catch (error) {
      console.error('Error saving JWT token:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }

    try {
      setLoading(true); 
      const response = await axios.post(API.login, {
        email,
        password,
      });

      // console.log("herere======>"+params.route.params.isLoggedIn)

      if (response.data.message) {
        saveJwtToken(response.data.data);
        // console.log(response.data.data)
        let email= response.data.email

      //  console.log("======>"+params.route.params.isLoggedIn)
      props.setIsLoggedIn(response.data.hasOwnProperty("email"))
      props.setUserEmail(email)
      // params.route.params.setIsLoggedIn(response.data.hasOwnProperty("email"));
      // params.route.params.setUserEmail(email)
      console.log("login done "+email)
      } else {
        Alert.alert('Errorr', 'Invalid login credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Image source={require('../../assets/road2.png')} style={styles.road} /> */}
      <Animated.Image
        source={require('../../assets/LoginCar.png')}
        style={[styles.logo, { transform: [{ translateY: carPosition }] }]}
      />
    
  
      <View style={styles.overlayContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.signupheadingText}>Login To Your </Text>
          <Text style={styles.signupheading2Text}>Account</Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Johnathon@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Image style={styles.logo1} />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggleBtn}>
            <Image
              source={showPassword ? require('../../assets/Passwordseen.png') : require('../../assets/password2.png')}
              style={styles.passwordlogo}
            />
          </TouchableOpacity>

          <View style={styles.forgotButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
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

        <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupText}>SIGN UP </Text>
        </TouchableOpacity>
      </View>
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
  overlayContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 280,
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  road:{
    height: 680,
    width: 350,
    top: 610,
  },
  logo: {
    width: 220,
    height: 450,
    bottom: 490,
  },
  inputView: {
    borderRadius: 30,
    width: '70%',
    bottom: 20,
    alignItems: 'center',
  },
  passwordlogo: {
    width: 25,
    height: 25,
    bottom: 38,
    left: 130,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  forgotButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    top: 10,
  },
  forgotText: {
    color: '#38447E',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  orContainer: {
    marginVertical: 10,
    top: 30,
  },
  orText: {
    color: '#38447E',
    fontSize: 15,
  },
  loginBtn: {
    width: '70%',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    backgroundColor: '#4595E0',
  },
  loginText: {
    color: 'white',
  },
  signupBtn: {
    width: '70%',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#4595E0',
  },
  signupText: {
    color: 'white',
  },
  signupheadingText: {
    fontSize: 40,
    right: 70,
    fontWeight: 'bold',
    bottom: 20,
    color: '#4595E0',
  },
  signupheading2Text: {
    fontSize: 40,
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
export default LoginScreen;