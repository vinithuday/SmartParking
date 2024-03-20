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

const Menu = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleNumberPlatePress = () => {
    navigation.navigate("numberplate");
  };

  const handleContactUSPress = () => {
    navigation.navigate("contactus");
  };

  const handleFAQsPress = () => {
    navigation.navigate("faqs");
  };

  const handleReferAFriendPress = () => {
    navigation.navigate("referfriendscreen");
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim, rotateAnim]);

  const wheelRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Header />
      <Text style={styles.menuName}> Menu</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleNumberPlatePress}>
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/numberPlate.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}>Enter Number plate </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleContactUSPress}>
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/contactUs.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}> Contact Us </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleFAQsPress}>
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/notification.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}>FAQ's </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReferAFriendPress}>
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require("../../assets/Messages.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}> Refer a Friend </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.Image
        source={require("../../assets/wheel.png")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ rotate: wheelRotation }] },
        ]}
      />

      <Footer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: 170,
    height: 170,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    top: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    top: 60,
    width: 250,
    height: 250,
  },

  userProfileText: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  userProfileIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4595E0",
  },
});

export default Menu;
