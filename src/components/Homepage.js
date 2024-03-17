import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Footer from "./Footer";
import { useRoute } from "@react-navigation/native";
import {usebookingDetails } from "./Context/bookingDetailsContext";
import { API } from "./config";
const Homepage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location,arrivalDateTime,departureTime,selectedSlotSetter } =usebookingDetails();

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [blockedSlots,setBlockedSlots]=useState(new Map())
  const handleBookSlotPress = (slot, event) => {
    // event.persist();
    selectedSlotSetter(slot)
    navigation.navigate("Payment");
  };
useEffect(()=>{
  (async()=>{
    try {
      const response = await fetch(API.checkAvailableSlot, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({location,arrivalDateTime,departureTime}),
      });

      const result = await response.json();

      let blockedSlotsIn=result.data
      console.log(blockedSlotsIn)
      const newBlockedSlotMap=new Map();

      for(let i=0;i<blockedSlotsIn.length;i++){
        newBlockedSlotMap.set(blockedSlotsIn[i],true)
      }
      setBlockedSlots(newBlockedSlotMap)
      console.log(newBlockedSlotMap)
    } catch (error) {
      console.error("Error sending reservation details to backend:", error);
    }
  })()

},[])
useEffect(()=>{
console.log("change")
},[blockedSlots])

  const renderSlot = (row, col) => {
    const levelStart =
      selectedLevel === "Level1" ? 0 : selectedLevel === "Level2" ? 4 : 8;
    const slotName = `${row + levelStart + 1}${String.fromCharCode(65 + col)}`;

    return (
      <TouchableOpacity
        key={slotName}
        disabled={blockedSlots.has(slotName)}
        onPress={(event) => handleBookSlotPress(slotName, event)}
      >
        <View style={
          blockedSlots.has(slotName)?styles.blockedSquare:
          styles.squareone}>
          <View style={styles.carIcon}>
            <Image
              source={require("../../assets/car1.png")}
              style={{ width: 75, height: 30, top: 15 }}
            />
            <Text style={styles.slotText}>{slotName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLevelGrid = () => {
    const rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push(
        <View key={i} style={styles.row}>
          {Array.from({ length:4  }, (_, index) => renderSlot(i, index))}
        </View>
      );
    }
    return rows;
  };

  const handleLevelButtonClick = (level, buttonIndex) => {
    setSelectedLevel(level);
    setSelectedButton(buttonIndex);
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.selectSpaceText}>
        Select Level and Preferred Space
      </Text>

      {renderLevelGrid()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 1 && { backgroundColor: "#4595E0" },
          ]}
          onPress={() => handleLevelButtonClick("Level1", 1)}
        >
          <Text style={styles.buttonText}>Level 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 2 && { backgroundColor: "#4595E0" },
          ]}
          onPress={() => handleLevelButtonClick("Level2", 2)}
        >
          <Text style={styles.buttonText}>Level 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 3 && { backgroundColor: "#4595E0" },
          ]}
          onPress={() => handleLevelButtonClick("Level3", 3)}
        >
          <Text style={styles.buttonText}>Level 3</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Parking Information</Text>
        <Text style={styles.cardContent}>
          Welcome to Smart Parking!{"\n"}
          Here are some important tips for parking your car:{"\n"}
          1. Please park only in designated parking spots to ensure a smooth
          flow of traffic.{"\n"}
          2. Ensure your vehicle is properly aligned within the parking space.
          {"\n"}
          Thank you for choosing our parking service. We hope you have a
          pleasant experience!{" "}
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

  selectSpaceText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4595E0",
    top: 461,
  },
  squareone: {
    width: 90,
    height: 90,
    marginTop: 10,
    marginRight: 10,
    borderColor: "#4595E0",
    borderWidth: 2,
    borderRadius: 4,
    top: 20,
  },
  blockedSquare:{
    width: 90,
    height: 90,
    marginTop: 10,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 4,
    top: 20,
    backgroundColor:"grey",
    borderBlockColor:"black"
  },

  carIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    // bottom: 200,
  },
  slotText: {
    fontSize: 14,
    color: "#38447E",
    marginTop: 20,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    bottom: 10,
  },
  button: {
    backgroundColor: "#4595E0",
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    bottom: 430,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Homepage;
