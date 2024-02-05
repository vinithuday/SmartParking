import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from '@stripe/stripe-react-native';
import { Elements } from '@stripe/react-stripe-js';
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

const Stack = createStackNavigator();
const stripePromise = loadStripe('sk_test_51Of6H3JdJTq4rwlvmBGPwi50oYx19HaSjU8bmDf6B9PZwIDF489MHOL9FMNMyfLs6bCDsKyoCa30RSCnFwBKeMoX00EFDOdXJs');

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey();
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);

  const fetchKey = async () => {
    try {
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      return data.publishableKey;
    } catch (error) {
      console.error('Error fetching publishable key:', error);
      return '';
    }
  };
  


  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier" 
        urlScheme="your-url-scheme" 
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen} />
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
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="paypalscreen" component={PayPalScreen} />
        </Stack.Navigator>
      </StripeProvider>
    </NavigationContainer>
  );
};

export default App;
