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
import { usebookingDetails } from "./Context/bookingDetailsContext";

const BookSlot = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisible] =
    useState(false);

  const pricePerHour = 10;
  const navigation = useNavigation();
  const {
    arrivalDateTime,
    arrivalDateTimeSetter,
    departureTime,
    departureTimeSetter,
    totalPrice,
    totalPriceSetter,
  } = usebookingDetails();

  useEffect(() => {
    calculatePrice();
  }, [arrivalDateTime, departureTime]);

  const currentDate = new Date();
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(currentDate.getDate() + 5);

  const handleDateConfirm = (date) => {
    arrivalDateTimeSetter(date);
    showHideDatePicker();
  };

  const handleDepartureTimeConfirm = (datetime) => {
    departureTimeSetter(datetime);
    showHideDepartureTimePicker();
  };
  function calculatePrice() {
    const differenceInMinutesValue = differenceInMinutes(
      departureTime,
      arrivalDateTime
    );

    const totalPriceValue =
      Math.ceil(differenceInMinutesValue / 60) * pricePerHour;
    totalPriceSetter(totalPriceValue);
  }

  const showHideDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const showHideDepartureTimePicker = () => {
    setDepartureTimePickerVisible(!isDepartureTimePickerVisible);
  };

  function handleBookSlot() {
    navigation.navigate("homepage");
  }

  function validationChecks(date = null) {
    if (date) {
      if (date > maxSelectableDate) {
        Alert.alert(
          "Validation Error",
          "Please select a date within the next 5 days."
        );
        return false;
      } else if (date < currentDate) {
        Alert.alert(
          "Validation Error",
          "Please select a future date and time."
        );
        return false;
      }
    } else {
      if (
        arrivalDateTime > maxSelectableDate ||
        arrivalDateTime < currentDate ||
        departureTime > maxSelectableDate ||
        departureTime < currentDate
      ) {
        Alert.alert(
          "Validation Error",
          "Please fill in all the details (date and time) before booking the slot."
        );
        return false;
      }
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.selectSpaceText}>
        Please choose Reservation Date and Time{" "}
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={showHideDatePicker}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/calender.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Select Date and time</Text>
            <Text style={styles.cardText}>
              {arrivalDateTime >= currentDate
                ? `${arrivalDateTime}`
                : "Select date and arrival time"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showHideDepartureTimePicker}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Clock.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Departure Time </Text>
            <Text style={styles.cardText}>
              {departureTime >= currentDate
                ? `${departureTime}`
                : "Departure time"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={(date) => {
            if (validationChecks(date)) {
              handleDateConfirm(date);
            }
          }}
          onCancel={showHideDatePicker}
        />
      )}

      {isDepartureTimePickerVisible && (
        <DateTimePickerModal
          isVisible={isDepartureTimePickerVisible}
          mode="datetime"
          onConfirm={(date) => {
            if (arrivalDateTime > date) {
              Alert.alert(
                "Validation Error",
                "Please select a date which is after arrival time."
              );
              return;
            }
            if (validationChecks(date)) {
              handleDepartureTimeConfirm(date);
            }
          }}
          onCancel={showHideDepartureTimePicker}
        />
      )}
      <Text style={styles.totalPriceText}>Total Price: € {totalPrice}</Text>

      <TouchableOpacity
        style={styles.bookSlotButton}
        onPress={() => {
          if (validationChecks()) {
            handleBookSlot();
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
    marginBottom: 50,
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
    bottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#4595E0",
  },
  selectSpaceText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#4595E0",
    justifyContent: "center",
    left: 13,
    bottom: 40,
  },
});

export default BookSlot;
