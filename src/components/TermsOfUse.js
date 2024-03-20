import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

const TermsOfUse = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Terms of Use</Text>

      <View style={styles.cardContainer}>
        <Text style={styles.termsText}>
          Welcome to Smart Parking!{"\n\n"}
          By using our application, you agree to comply with and be bound by the
          following terms and conditions.{"\n\n"}
          1. The content of this application is for general information and use
          only. It is subject to change without notice.{"\n\n"}
          2. Your use of any information or materials on this application is
          entirely at your own risk, for which we shall not be liable.{"\n\n"}
          3. This application contains material which is owned by or licensed to
          us. Reproduction is prohibited other than in accordance with the
          copyright notice.{"\n\n"}
          4. Unauthorised use of this application may give rise to a claim for
          damages and/or be a criminal offence.{"\n\n"}
          5. From time to time, this application may also include links to other
          applications. These links are provided for your convenience to provide
          further information. They do not signify that we endorse the
          application(s). We have no responsibility for the content of the
          linked application(s).{"\n\n"}
          Your use of this application and any dispute arising out of such use
          of the application is subject to the laws of Germany.
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
    bottom: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#4595E0",
    bottom: 60,
  },
  termsText: {
    fontSize: 14,
    color: "#38447E",
  },
});

export default TermsOfUse;
