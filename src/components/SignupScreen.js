// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';

// const RegistrationScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignUp = async () => {
//     // Perform registration logic here using a network request (e.g., fetch)
//     // ...

//     // After successful registration, navigate to the login screen
//     navigation.replace('LoginScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />

//       <View style={styles.logoContainer}>
//         <Image source={require('../../assets/logo.png')} style={styles.logo} />
//       </View>

//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Email*"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Password*"
//           secureTextEntry={true}
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Confirm Password*"
//           secureTextEntry={true}
//           value={confirmPassword}
//           onChangeText={(text) => setConfirmPassword(text)}
//         />
//       </View>

//       <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
//         <Text style={styles.signupText}>Create Account</Text>
//       </TouchableOpacity>

//       <View style={styles.orContainer}>
//         <Text style={styles.orText}>OR</Text>
//       </View>

//       <View style={styles.login}>
//         <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     marginBottom: 50,
//     alignItems: 'center',
//   },
//   logo: {
//     width: 112,
//     height: 94,
//   },
//   inputView: {
//     borderRadius: 30,
//     width: '70%',
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   textInput: {
//     height: 50,
//     width: '100%',
//     marginBottom: 20,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 10,
//   },
//   login: {
//     alignItems: 'center',
//   },
//   loginText: {
//     color: '#38447E',
//     fontSize: 15,
//   },
//   orContainer: {
//     marginVertical: 20,
//   },
//   orText: {
//     color: '#38447E',
//     fontSize: 15,
//   },
//   signupBtn: {
//     width: '70%',
//     borderRadius: 12,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     backgroundColor: '#38447E',
//   },
//   signupText: {
//     color: 'white',
//   },
// });

// export default RegistrationScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { API } from './config';

export default function SignupScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password and Confirm Password do not match.');
      return;
    }

    try {
      const response = await axios.post(`${API}/register`, {
        email,
        password
      });
      console.log(response.data.message);

      if (response.data.message) {
        console.log('Signup successful:', response.data.message);
        Alert.alert('Success', 'Account created successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('map'),
          },
        ]);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Error', 'Invalid email or password. Please check your credentials.');
        
        } else if (error.response.status === 400 && error.response.data.message === 'User already exists with this email') {
          Alert.alert('Error', 'User is already registered with this email.');
        } 
        
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
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email*"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password*"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password*"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>
      </View>

      <View style={styles.login}>
        <TouchableOpacity onPress={() => props.navigation.replace('LoginScreen')}>
          <Text style={styles.loginText}>Login</Text>
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
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 112,
    height: 94,
  },
  inputView: {
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  login: {
    alignItems: 'center',
  },
  loginText: {
    color: '#38447E',
    fontSize: 15,
  },
  orContainer: {
    marginVertical: 20,
  },
  orText: {
    color: '#38447E',
    fontSize: 15,
  },
  signupBtn: {
    width: '70%',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#38447E',
  },
  signupText: {
    color: 'white',
  },
});
