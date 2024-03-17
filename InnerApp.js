import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { API } from "./src/components/config";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigation } from "@react-navigation/native";

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
import ParkingHistory from "./src/components/ParkingHistory";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {usebookingDetails } from "./src/components/Context/bookingDetailsContext";

const InnerApp = () => {

    const Stack = createStackNavigator();
const [publishableKey, setPublishableKey] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userEmail, setUserEmail] = useState("");
const {email,emailSetter}=usebookingDetails()


const loginCheckHandler = async () => {
  let jwt = await SecureStore.getItemAsync("jwtToken");
 
  if (jwt) {
    const headers = {
      // Set the Content-Type header if needed
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    };
    try {
      const response = await axios.post(API.jwtAuth, {}, { headers });
      if (response.status === 201) {
        setUserEmail(response.data.email);
        emailSetter(response.data.email)
        console.log(email)
        setIsLoggedIn(response.data.hasOwnProperty("email"));
    
      } else if (response.status === 309) console.log(response.data.message);
    } catch (error) {
      console.error(`error ${error}`);
    }
  }
};

useEffect(() => {
loginCheckHandler();
}, []);

return (

  <NavigationContainer>
    <StripeProvider
      publishableKey="pk_test_51Of6H3JdJTq4rwlvgr7ZKl9zgO3Yb9BsHXsulD3Rm8EfttFTYQJ3PGY5OEAd9wrnfealZRR59RDELocfqtPmufcV005iOZ9Ioz"
      merchantIdentifier="merchant.identifier"
      urlScheme="your-url-scheme"
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="LoginScreen" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} component={() => (isLoggedIn ? <LoginScreen /> : <MapScreen />)} /> */}
        <Stack.Screen
          name="LoginScreen"
        >
        {() => isLoggedIn?<Map email={email}/>:<LoginScreen setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>

        {/* <Stack.Screen name='Home' options={{ title: 'Home' }}> */}

        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="homepage" component={Homepage} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="user" >  
        {() =><User  setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} email={userEmail}/>}
           </Stack.Screen>
        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="qrcode" component={QrCode} />
        <Stack.Screen name="parkinglot" component={ParkingLot} />
        <Stack.Screen name="bookslot" component={BookSlot} />
        {/* <Stack.Screen name="map" component={isLoggedIn ? Map : LoginScreen} />{() => isLoggedIn?<Map/>:<LoginScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail}/>}          </Stack.Screen> */}

        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="paypalscreen" component={PayPalScreen} />
        <Stack.Screen name="howitworks" component={HowItWorks} />
        <Stack.Screen name="support" component={Support} />
        <Stack.Screen
          name="languageselection"
          component={LanguageSelection}
        />
        <Stack.Screen name="termsofuse" component={TermsOfUse} />
        <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
        <Stack.Screen name="faqs" component={FAQs} />
        <Stack.Screen name="contactus" component={ContactUs} />
        <Stack.Screen name="numberplate" component={NumberPlate} />
        <Stack.Screen
          name="referfriendscreen"
          component={ReferFriendScreen}
        />
        <Stack.Screen name="parkinghistory" component={ParkingHistory} />
      </Stack.Navigator>
    </StripeProvider>
  </NavigationContainer>
);

};

export default InnerApp;

