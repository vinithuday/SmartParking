import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, parseISO, differenceInMinutes } from "date-fns";
import Header from "./Header";
import Footer from "./Footer";

const BookSlot = () => {
  const [searchText, setSearchText] = useState("");
  const [chosenDate, setChosenDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isArrivalTimePickerVisible, setArrivalTimePickerVisible] =
    useState(false);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisible] =
    useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const pricePerHour = 10;
  const navigation = useNavigation();
  const route = useRoute();
  const { slot, email, location } = route.params;

  useEffect(() => {
    console.log("Selected Slot:", email, location, slot);
  }, [slot]);

  const currentDate = new Date();
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(currentDate.getDate() + 5);

  const handleDateConfirm = (date) => {
    const selectedDateTime = new Date(date);

    const formattedDate = format(selectedDateTime, "yyyy-MM-dd");

    setChosenDate(selectedDateTime);
    hideDatePicker();
    hideArrivalTimePicker();
    hideDepartureTimePicker();
    setTimeout(() => {
      showTimePicker();
    }, 1);
  };

  const handleArrivalTimeConfirm = (time) => {
    const formattedTime = format(time, "HH:mm:ss");
    setArrivalTime(formattedTime);
    hideArrivalTimePicker();
    setDepartureTimePickerVisible(true);
  };

  const handleDepartureTimeConfirm = (time) => {
    const formattedTime = format(time, "HH:mm:ss");
    setDepartureTime(formattedTime);

    const arrivalDateTime = parseISO(
      `${format(chosenDate, "yyyy-MM-dd")}T${arrivalTime}`
    );
    const departureDateTime = parseISO(
      `${format(chosenDate, "yyyy-MM-dd")}T${formattedTime}`
    );
    const differenceInMinutesValue = differenceInMinutes(
      departureDateTime,
      arrivalDateTime
    );

    const totalPriceValue =
      Math.ceil(differenceInMinutesValue / 60) * pricePerHour;
    setTotalPrice(totalPriceValue);
    hideDepartureTimePicker();
  };

  const handleQRCodePress = () => {
    console.log(
      chosenDate,
      arrivalTime,
      departureTime,
      slot,
      email,
      location,
      totalPrice
    );

    if (!chosenDate || arrivalTime === "" || departureTime === "") {
      Alert.alert(
        "Validation Error",
        "Please fill in all the details (date and time) before booking the slot."
      );
    } else if (chosenDate < currentDate) {
      Alert.alert("Validation Error", "Please select a future date.");
    } else if (arrivalTime >= departureTime) {
      Alert.alert("Validation Error", "Please select a future time.");
    } else if (chosenDate > maxSelectableDate) {
      Alert.alert(
        "Validation Error",
        "Please select a date within the next 5 days."
      );
    } else {
      const qrCodeValue = generateQrCodeValue(chosenDate, arrivalTime);
      if (qrCodeValue) {
        console.log("Generated QR Code Value:", qrCodeValue);
        navigation.navigate("payment");
      } else {
        console.error("Failed to generate QR code value.");
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setArrivalTimePickerVisible(true);
  };

  const hideArrivalTimePicker = () => {
    setArrivalTimePickerVisible(false);
    setDepartureTimePickerVisible(true);
  };

  const hideDepartureTimePicker = () => {
    setDepartureTimePickerVisible(false);
  };

  const generateQrCodeValue = (chosenDate, arrivalTime) => {
    if (!chosenDate || !arrivalTime) {
      console.error("Chosen date or time is not set.");
      return null;
    }

    return `${chosenDate.toISOString()}_${arrivalTime}`;
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.selectedSlotText}>Selected Slot: {slot}</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/calender.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Select Date</Text>
            <Text style={styles.cardText}>
              {chosenDate ? format(chosenDate, "yyyy-MM-dd") : "Select date"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimePicker}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Clock.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Arrival Time</Text>
            <Text style={styles.cardText}>
              {arrivalTime !== ""
                ? format(new Date(`2000-01-01T${arrivalTime}`), "HH:mm:ss")
                : "Arrival time"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimePicker}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Clock.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Departure Time</Text>
            <Text style={styles.cardText}>
              {departureTime !== ""
                ? format(new Date(`2000-01-01T${departureTime}`), "HH:mm:ss")
                : "Departure time"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      )}

      {isArrivalTimePickerVisible && (
        <DateTimePickerModal
          isVisible={isArrivalTimePickerVisible}
          mode="time"
          onConfirm={handleArrivalTimeConfirm}
          onCancel={hideArrivalTimePicker}
        />
      )}

      {isDepartureTimePickerVisible && (
        <DateTimePickerModal
          isVisible={isDepartureTimePickerVisible}
          mode="time"
          onConfirm={handleDepartureTimeConfirm}
          onCancel={hideDepartureTimePicker}
        />
      )}
      <Text style={styles.totalPriceText}>Total Price: € {totalPrice}</Text>

      <TouchableOpacity
        style={styles.bookSlotButton}
        onPress={() => {
          if (!chosenDate || arrivalTime === "" || departureTime === "") {
            Alert.alert(
              "Validation Error",
              "Please fill in all the details (date and time) before booking the slot."
            );
          } else if (chosenDate < currentDate) {
            Alert.alert("Validation Error", "Please select a future date.");
          } else if (arrivalTime >= departureTime) {
            Alert.alert("Validation Error", "Please select a future time.");
          } else if (chosenDate > maxSelectableDate) {
            Alert.alert(
              "Validation Error",
              "Please select a date within the next 5 days."
            );
          } else {
            navigation.navigate("Payment", {
              chosenDate: chosenDate.toString(),
              arrivalTime,
              departureTime,
              totalPrice,
              selectedSlot: slot,
              email,
              location,
            });
          }
        }}
      >
        <Text style={styles.bookSlotText}>Book Slot</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
    justifyContent: "center",
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: 150,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38447E",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#38447E",
  },
  bookSlotButton: {
    width: "70%",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 30,
    backgroundColor: "#4595E0",
  },
  bookSlotText: {
    color: "white",
  },
  selectedSlotText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4595E0",
  },
  date: {
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    color: "#38447E",
  },
  time: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    color: "#38447E",
  },
  totalPriceText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#4595E0",
  },
});

export default BookSlot;
