import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from '@stripe/stripe-react-native';
import { API } from "./src/components/config";
import { loadStripe } from '@stripe/stripe-js';

import LoginScreen from "./src/components/LoginScreen";
import SignupScreen from "./src/components/SignupScreen";
import ForgotPassword from "./src/components/ForgotPassword";
import Homepage from "./src/components/Homepage";
import Settings from "./src/components/Settings";
import User from "./src/components/User";
import Menu from "./src/components/Menu";
import Notification from "./src/components/Notification";
import QrCode from "./src/components/QrCode";
import ParkingLot from "./src/components/ParkingLot";
import BookSlot from "./src/components/BookSlot";
import Map from "./src/components/Map";
import Payment from "./src/components/Payment";
import PayPalScreen from "./src/components/PayPalScreen";
import HowItWorks from "./src/components/HowItWorks";
import Support from "./src/components/Support";
import LanguageSelection from "./src/components/Language";
import TermsOfUse from "./src/components/TermsOfUse";
import PrivacyPolicy from "./src/components/PrivacyPolicy";
import FAQs from "./src/components/FAQs";
import ContactUs from "./src/components/ContactUs";
import NumberPlate from "./src/components/NumberPlate";
import ReferFriendScreen from "./src/components/ReferFriendScreen";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const Stack = createStackNavigator();
// const stripePromise = loadStripe('sk_test_51Of6H3JdJTq4rwlvmBGPwi50oYx19HaSjU8bmDf6B9PZwIDF489MHOL9FMNMyfLs6bCDsKyoCa30RSCnFwBKeMoX00EFDOdXJs');

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const getJwtToken = async () => {
    try {
      const jwtToken = await SecureStore.getItemAsync('jwtToken');
      if (jwtToken) {
        return jwtToken;
      } else {
        console.log('No JWT token stored');
        // Return a default value or throw an error as needed
        return null;
      }
    } catch (error) {
      console.error('Error retrieving JWT token:', error);
      // Throw an error or return a default value
      throw error;
    }
  };
  const sessionAuthentication = async () => {
    try {
      const jwtToken = await getJwtToken();
      console.log('JWT Token:', jwtToken); // Log the retrieved token for debugging

      if (jwtToken) {
        const response = await axios.post(API.authentication, {
          jwt: jwtToken
        });

        console.log('Authentication response:', response.data);

        if (response.data.message) {
          console.log('Authentication successful');
        } else {
          Alert.alert('Error', 'Invalid login credentials. Please check your email and password.');
        }
      } else {
        console.log('JWT token not available');
        // Handle the case where JWT token is not available (maybe redirect to login screen)
      }
    } catch (error) {
      console.error('Error in sessionAuthentication:', error);
      throw error; // Ensure to throw the error to be caught in the calling function
    }
  };

  useEffect(() => {
    const authenticateSession = async () => {
      try {
        await sessionAuthentication();
      } catch (error) {
        console.error('Error in sessionAuthentication:', error);
      }
    };
  
    authenticateSession();
  }, []);

  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey="pk_test_51Of6H3JdJTq4rwlvgr7ZKl9zgO3Yb9BsHXsulD3Rm8EfttFTYQJ3PGY5OEAd9wrnfealZRR59RDELocfqtPmufcV005iOZ9Ioz"
        merchantIdentifier="merchant.identifier" 
        urlScheme="your-url-scheme" 
      >
        
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="forgotpassword" component={ForgotPassword} />
          <Stack.Screen name="homepage" component={Homepage} />
          <Stack.Screen name="settings" component={Settings} />
          <Stack.Screen name="user" component={User} />
          <Stack.Screen name="menu" component={Menu} />
          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen name="qrcode" component={QrCode} />
          <Stack.Screen name="parkinglot" component={ParkingLot} />
          <Stack.Screen name="bookslot" component={BookSlot} />
          <Stack.Screen name="map" component={Map} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="paypalscreen" component={PayPalScreen} />
          <Stack.Screen name="howitworks" component={HowItWorks} />
          <Stack.Screen name="support" component={Support} />
          <Stack.Screen name="languageselection" component={LanguageSelection} />
          <Stack.Screen name="termsofuse" component={TermsOfUse} />
          <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
          <Stack.Screen name="faqs" component={FAQs} />
          <Stack.Screen name="contactus" component={ContactUs} />
          <Stack.Screen name="numberplate" component={NumberPlate} />
          <Stack.Screen name="referfriendscreen" component={ReferFriendScreen} />





          
        </Stack.Navigator>
      </StripeProvider>
    </NavigationContainer>
  );
};

export default App;
