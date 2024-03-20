import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import {
  useStripe,
  CardField,
  PaymentSheetError,
} from "@stripe/stripe-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Footer from "./Footer";
import { API } from "./config";
import { usebookingDetails } from "./Context/bookingDetailsContext";
const Payment = ({ route }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState("");
  const navigation = useNavigation();
  // const { arrivalDateTime, departureTime, totalPrice, email, location   ,selectedSlot, } = usebookingDetails();

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback
  ) => {
    const myServerResponse = await fetch(API.paymentSheet);
    const { clientSecret, error } = await myServerResponse.json();
    if (clientSecret) {
      intentCreationCallback({ clientSecret });
    } else {
      intentCreationCallback({ error });
    }
  };

  const handleQRCodePress = () => {
    // console.log(chosenDate, arrivalTime, departureTime, totalPrice);
    // if (!chosenDate || arrivalTime === "" || departureTime === "") {
    //   Alert.alert(
    //     "Validation Error",
    //     "Please fill in all the details (date and time) before booking the slot."
    //   );
    // } else if (chosenDate < currentDate) {
    //   Alert.alert("Validation Error", "Please select a future date.");
    // } else if (arrivalTime >= departureTime) {
    //   Alert.alert("Validation Error", "Please select a future time.");
    // } else if (chosenDate > maxSelectableDate) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Please select a date within the next 5 days."
    //   );
    // } else {
    //   const qrCodeValue = generateQrCodeValue(chosenDate, arrivalTime);
    //   if (qrCodeValue) {
    //     console.log("Generated QR Code Value:", qrCodeValue);
    //     navigation.navigate("payment");
    //   } else {
    //     console.error("Failed to generate QR code value.");
    //   }
    // }
  };

  const initializePaymentSheet = async () => {
    const { error, paymentOption } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customFlow: true,
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });

    if (error) {
      console.error("Error initializing payment sheet:", error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
      } else {
        console.error("PaymentSheet error:", error);
      }
    } else {
      console.log("Payment completed successfully");
    }
  };
  const initializeAndPresentPaymentSheet = async () => {
    try {
      await initializePaymentSheet();
      await openPaymentSheet();
    } catch (error) {
      console.error("Error initializing or presenting payment sheet:", error);
    }
  };

  useFocusEffect(() => {
    initializeAndPresentPaymentSheet();
  });

  const handlePaymentSuccess = () => {
    navigation.replace("qrcode");
  };
  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <Header />
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
            borderWidth: 1,
            borderColor: "#38447E",
          }}
          style={{
            width: "90%",
            height: 100,
            marginVertical: 60,
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handlePaymentSuccess}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("paypalscreen")}
        >
          <Text style={styles.buttonText}>Pay with PayPal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#ffff",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
  paymentContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#4595E0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "70%",
    height: 50,
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#38447E",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Payment;
