import React from "react";
import Header from "./Header";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Footer from "./Footer";

const Support = () => {
  const handleContactSupport = () => {};

  const handleFAQs = () => {};

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}> Support </Text>

      <View style={styles.cardContainer}>
        <Text style={styles.cardContent}>
          Welcome to Smart Parking! If you encounter any issues or need
          assistance, here are some ways we can help you:
          {"\n\n"}
          1. **Contact Support**: Reach out to our customer support team for
          personalized assistance.{"\n\n"}
          <TouchableOpacity onPress={handleContactSupport}>
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
          {"\n\n"}
          2. **FAQs (Frequently Asked Questions)**: Explore our FAQs for quick
          answers to common queries.{"\n\n"}
          <TouchableOpacity onPress={handleFAQs}>
            <Text style={styles.linkText}>FAQs</Text>
          </TouchableOpacity>
          {"\n\n"}
          3. **In-App Help Center**: Access our in-app help center for
          step-by-step guides and tutorials.{"\n\n"}
          4. **Community Forum**: Join our community forum to connect with other
          users and share experiences.{"\n\n"}
          We are here to ensure you have the best experience with Smart Parking.
          Thank you for choosing our service!
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

  cardContent: {
    fontSize: 14,
    color: "#38447E",
  },
  linkText: {
    color: "#0066CC",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#4595E0",
    bottom: 110,
  },
});

export default Support;
