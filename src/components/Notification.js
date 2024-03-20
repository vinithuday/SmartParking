import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const navigation = useNavigation();
  const bounceValue = useRef(new Animated.Value(0)).current;

  const handleRemindersPress = () => {
    navigation.navigate("settings");
  };

  const handleMessagesPress = () => {
    navigation.navigate("settings");
  };

  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [bounceValue]);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.notificationName}> Notifications</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleRemindersPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/notification.png")}
                style={{ width: 35, height: 35 }}
              />
              <Text style={styles.userProfileText}>Reminders </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMessagesPress}>
          <View style={styles.card}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/Messages.png")}
                style={{ width: 35, height: 35 }}
              />
              <Text style={styles.userProfileText}> Messages </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.Image
        source={require("../../assets/NotificationCar.png")}
        style={[styles.logo, { transform: [{ scale: bounceValue }] }]}
      />

      <Footer />
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
  squareone: {
    backgroundColor: "#ffff",
    width: 170,
    height: 170,
    margin: 10,
    borderColor: "rgba(128, 128, 128, 0.5)",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    top: 350,
  },
  userProfileText: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  notificationName: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    bottom: 70,
    color: "#4595E0",
  },
  card: {
    backgroundColor: "#fff",
    width: 170,
    height: 170,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    top: 100,
    width: 250,
    height: 350,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userProfileIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notification;
