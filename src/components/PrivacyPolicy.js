import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Privacy Policy</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.policyText}>
          Welcome to Smart Parking!{"\n\n"}
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our mobile application. Please take a moment to familiarize yourself
          with our privacy practices.{"\n\n"}
          1. **Information We Collect**: We may collect personal and
          non-personal information to provide and improve our services. This
          includes information you provide, device information, and usage data.
          {"\n\n"}
          2. **How We Use Your Information**: We use your information to
          operate, maintain, and provide you with the features and functionality
          of the application. We may also use your information to communicate
          with you, send you updates, and provide customer support.{"\n\n"}
          3. **Sharing Your Information**: We do not sell, trade, or rent your
          personal information to third parties. We may share non-personal
          information for analytical purposes.{"\n\n"}
          4. **Security**: We take reasonable measures to protect your
          information. However, no method of transmission over the internet or
          electronic storage is 100% secure.{"\n\n"}
          5. **Changes to This Privacy Policy**: We reserve the right to update
          or change our Privacy Policy at any time. Your continued use of the
          application after we make changes is deemed to be acceptance of those
          changes.{"\n\n"}
          By using our application, you agree to the terms of this Privacy
          Policy. If you do not agree with our policies and practices, please do
          not use the application.{"\n\n"}
          If you have any questions or concerns about this Privacy Policy,
          please contact us at smartparking@gmail.com.{"\n\n"}
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
    padding: 10,
    marginTop: 40,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4595E0",
    marginBottom: 10,
  },
  policyText: {
    fontSize: 14,
    color: "#38447E",
  },
});

export default PrivacyPolicy;
