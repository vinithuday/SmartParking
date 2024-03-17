import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Footer from "./Footer";
import Header from "./Header";
import { API } from "./config";
import { usebookingDetails } from "./Context/bookingDetailsContext";
const QrCode = () => {
  const [qrValue, setQrValue] = useState("");
  // const { qrData } = route.params;
  const {  arrivalDateTime, departureTime, email, location, totalPrice, selectedSlot } = usebookingDetails();
  
  useEffect(() => {
    generateAndSetQrCodeValue();

  }, []);

  const generateAndSetQrCodeValue = () => {
    const uniqueValue = Date.now().toString();
    setQrValue(uniqueValue);
    sendReservationDetails({
      arrivalDateTime,
      departureTime,
      totalPrice,
      selectedSlot,
      qrCodeValue: uniqueValue,
      email,
      location,
    });
    console.log("Reservation details:", {
      arrivalDateTime,
      departureTime,
      totalPrice,
      selectedSlot,
      email,
      location,
    });
  };

  const sendReservationDetails = async (reservationDetails) => {
    try {
      const response = await fetch(API.userReservation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationDetails),
      });

      const result = await response.json();


    } catch (error) {
      console.error("Error sending reservation details to backend:", error);
    }
  };


    
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.selectSpaceText}>
        Scan this QR Code at the Entrance
      </Text>
      {qrValue ? (
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={qrValue}
            size={200}
            color="white"
            backgroundColor="black"
            key={qrValue}
          />
          <Text style={styles.qrnumber}>{qrValue}</Text>
        </View>
      ) : (
        <Text>Loading QR code...</Text>
      )}
           <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Thank you for choosing Smart Parking</Text>
        <Text style={styles.cardContent}>
  Thank you for choosing Smart Parking!{"\n"}
  We appreciate your trust in our parking service.{"\n"}
  If you have any questions or need assistance, feel free to ask our staff.{"\n"}
  We hope you have a wonderful day!
</Text>
      </View>
      <Footer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  selectSpaceText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    color: "#4595E0",
    bottom: 80,
  },
  qrnumber: {
    fontSize: 25,
    top: 20,
    color: "#4595E0",
    fontWeight: "bold",
  },
  qrCodeContainer: {
    borderWidth: 2,
    borderColor: "black",
    padding: 50,
    borderRadius: 10, 
  },
  cardContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    top: 40,
    width: "80%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4595E0",
    marginBottom: 20,
  },
  cardContent: {
    fontSize: 14,
    color: "#38447E",
  },
  signupText:{
    color: "#ffff",
  }
});

export default QrCode;
