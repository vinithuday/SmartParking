import React from 'react';
import Header from "./Header";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from "./Footer";

const HowItWorks = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}> How It Works </Text>

      <View style={styles.cardContainer}>

     
        <Text style={styles.cardContent}>
        Welcome to Smart Parking!{"\n\n"}
          Our application is designed to make your parking experience hassle-free. Here's how it works:{"\n\n"}
          1. **Select Your Preferred Space**: Choose your preferred parking level and space from the available options.{"\n\n"}
          2. **Book Your Slot**: Once you've selected your space, book it by tapping on the corresponding slot.{"\n\n"}
          3. **Park Your Vehicle**: Head to your booked space and park your vehicle securely.{"\n\n"}
          4. **Additional Information**: Find important information about the parking area, such as rules and regulations, in the app.{"\n\n"}
          5. **Enjoy Your Parking Experience**: Relax and enjoy a stress-free parking experience with Smart Parking!{"\n\n"}
          Thank you for using our service. We aim to provide a seamless and efficient parking solution for you.
        </Text>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  cardContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginTop: 40,
    width: "80%",
    bottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#4595E0',
    bottom: 110, 
  },
  cardContent: {
    fontSize: 14,
    color: "#38447E",
  },
});

export default HowItWorks;
