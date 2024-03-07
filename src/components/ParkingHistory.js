import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { API } from './config';
const ParkingHistoryScreen = () => {
  const [parkingHistory, setParkingHistory] = useState([]);

  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        const response = await axios.post(API.userReservation,{email});


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setParkingHistory(data);
      } catch (error) {
        console.error('Error fetching parking history:', error.message);
      }
    };

    fetchParkingHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Parking History</Text>
      {parkingHistory.map((historyItem, index) => (
        <View key={index} style={styles.historyItem}>
          <Text>{/* Display parking history item details */}</Text>
          {/* You can render specific details based on your data structure */}
          <Footer/>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default ParkingHistoryScreen;
