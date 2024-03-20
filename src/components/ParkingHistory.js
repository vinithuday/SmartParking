import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { API } from "./config";
import { usebookingDetails } from "./Context/bookingDetailsContext";

const ParkingHistoryScreen = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const { email } = usebookingDetails();

  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        const response = await axios.post(API.getParkingHistory, {
          email: email,
        });
        setParkingHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching parking history:", error.message);
      }
    };
  
    fetchParkingHistory();
  }, []);

  return (
    <View style={styles.container}>
    <Header />
    <Footer/>
    <Text style={styles.title}>Parking History</Text>
    <ScrollView style={styles.scrollView}>
    <View style={styles.cardContainer}> 
      {parkingHistory.map((historyItem, index) => (
        <View key={index} style={styles.card}>
          <Text>Email: {historyItem.email}</Text>
          <Text>Location: {historyItem.location}</Text>
          <Text>Arrival Time: {historyItem.arrivalDateTime}</Text>
          <Text>Departure Time: {historyItem.departureTime}</Text>
          <Text>Selected Slot: {historyItem.selectedSlot}</Text>
          <Text>Total Price: {historyItem.totalPrice}</Text>
        </View>
      ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4595E0",
    top: 95,
  },
  scrollView: {
    width: "100%",
    marginTop: 10,
    marginBottom: 80, 
    marginTop: 120,

  },
  cardContainer: {
    alignItems: "center", 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 45,
    marginBottom: 10,
    width: "90%", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ParkingHistoryScreen;
