
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { format, parseISO, differenceInMinutes } from 'date-fns';  
// import Header from "./Header";
// import Footer from "./Footer";

// const BookSlot = () => {
//   const [searchText, setSearchText] = useState("");
//   const [chosenDate, setChosenDate] = useState(new Date());
//   const [arrivalTime, setArrivalTime] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [isArrivalTimePickerVisible, setArrivalTimePickerVisible] = useState(false);
//   const [isDepartureTimePickerVisible, setDepartureTimePickerVisible] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const pricePerHour = 10;
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { slot } = route.params;

//   useEffect(() => {
//     console.log("Selected Slot:", slot);
//   }, [slot]);

//   const currentDate = new Date();
//   const maxSelectableDate = new Date();
//   maxSelectableDate.setDate(currentDate.getDate() + 5);

//   const handleDateConfirm = (date) => {
//     const selectedDateTime = new Date(date);

//     const formattedDate = format(selectedDateTime, 'yyyy-MM-dd');

//     setChosenDate(selectedDateTime);
//     hideDatePicker();
//     hideArrivalTimePicker();
//     hideDepartureTimePicker();
//     setTimeout(() => {
//       showTimePicker();
//     }, 1);
//   };

//   const handleArrivalTimeConfirm = (time) => {
//     const formattedTime = format(time, 'HH:mm:ss'); 
//     setArrivalTime(formattedTime);
//     hideArrivalTimePicker();
//     setDepartureTimePickerVisible(true);
//   };

//   const handleDepartureTimeConfirm = (time) => {
//     const formattedTime = format(time, 'HH:mm:ss'); 
//     setDepartureTime(formattedTime);

//     const arrivalDateTime = parseISO(`${format(chosenDate, 'yyyy-MM-dd')}T${arrivalTime}`);
//     const departureDateTime = parseISO(`${format(chosenDate, 'yyyy-MM-dd')}T${formattedTime}`);
//     const differenceInMinutesValue = differenceInMinutes(departureDateTime, arrivalDateTime);

//     const totalPriceValue = Math.ceil(differenceInMinutesValue / 60) * pricePerHour;
//     setTotalPrice(totalPriceValue);
//     hideDepartureTimePicker();
//   };

//   const handleQRCodePress = () => {
//     console.log(chosenDate, arrivalTime, departureTime, totalPrice);

//     if (!chosenDate || arrivalTime === "" || departureTime === "") {
//       Alert.alert(
//         "Validation Error",
//         "Please fill in all the details (date and time) before booking the slot."
//       );
//     } else if (chosenDate < currentDate) {
//       Alert.alert("Validation Error", "Please select a future date.");
//     } else if (arrivalTime >= departureTime) {
//       Alert.alert("Validation Error", "Please select a future time.");
//     } else if (chosenDate > maxSelectableDate) {
//       Alert.alert(
//         "Validation Error",
//         "Please select a date within the next 5 days."
//       );
//     } else {
//       const qrCodeValue = generateQrCodeValue(chosenDate, arrivalTime);
//       if (qrCodeValue) {
//         console.log("Generated QR Code Value:", qrCodeValue);
//         navigation.navigate("payment");
//       } else {
//         console.error("Failed to generate QR code value.");
//       }
//     }
//   };

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const showTimePicker = () => {
//     setArrivalTimePickerVisible(true);
//   };

//   const hideArrivalTimePicker = () => {
//     setArrivalTimePickerVisible(false);
//     setDepartureTimePickerVisible(true);
//   };

//   const hideDepartureTimePicker = () => {
//     setDepartureTimePickerVisible(false);
//   };

//   const generateQrCodeValue = (chosenDate, arrivalTime) => {
//     if (!chosenDate || !arrivalTime) {
//       console.error("Chosen date or time is not set.");
//       return null;
//     }

//     return `${chosenDate.toISOString()}_${arrivalTime}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Header />

//       {/* <TextInput
//         style={styles.searchBar}
//         placeholder="Search..."
//         value={searchText}
//         onChangeText={(text) => setSearchText(text)}
//       /> */}
//       <Text style={styles.selectedSlotText}>Selected Slot: {slot}</Text>

//       <TouchableOpacity onPress={showDatePicker}>
//         <Text style={styles.date}>
//           {chosenDate ? format(chosenDate, 'yyyy-MM-dd') : "Select date"}
//         </Text>
//       </TouchableOpacity>

//       {isDatePickerVisible && (
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleDateConfirm}
//           onCancel={hideDatePicker}
//         />
//       )}

//       <TouchableOpacity onPress={showTimePicker}>
//         <Text style={styles.time}>
    
//           {arrivalTime !== ""
//             ? format(new Date(`2000-01-01T${arrivalTime}`), 'HH:mm:ss')
//             : "Arrival time"}
//         </Text>
//       </TouchableOpacity>

//       {isArrivalTimePickerVisible && (
//         <DateTimePickerModal
//           isVisible={isArrivalTimePickerVisible}
//           mode="time"
//           onConfirm={handleArrivalTimeConfirm}
//           onCancel={hideArrivalTimePicker}
//         />
//       )}

//       <TouchableOpacity onPress={showTimePicker}>
//         <Text style={styles.time}>
      
//           {departureTime !== ""
//             ? format(new Date(`2000-01-01T${departureTime}`), 'HH:mm:ss')
//             : "Departure time"}
            
//         </Text>
//       </TouchableOpacity>

//       {isDepartureTimePickerVisible && (
//         <DateTimePickerModal
//           isVisible={isDepartureTimePickerVisible}
//           mode="time"
//           onConfirm={handleDepartureTimeConfirm}
//           onCancel={hideDepartureTimePicker}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.bookSlotButton}
//         onPress={handleQRCodePress}
//       >
//         <Text style={styles.bookSlotText}>Book Slot</Text>
//       </TouchableOpacity>

//       <Text style={styles.totalPriceText}>Total Price: € {totalPrice}</Text>

//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#ffff",

//     justifyContent: "center",
//   },
//   bookSlotButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#38447E",
//     borderRadius: 5,
//   },

//   bookSlotText: {
//     color: "white",
//   },

//   searchBar: {
//     height: 45,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 8,
//     margin: 10,
//     paddingLeft: 10,
//     position: 'absolute',
//     top: 100,
//     left: 50,
//     right: 50,
//     zIndex: 1,
//     backgroundColor: 'white',
//   },

//   selectedSlotText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     bottom: 180,
//   },
//   date: {
//     justifyContent: "center",
//     textAlign: "center",
//     marginBottom: 20,
//     fontSize: 24,
//     color: "#38447E",
//     bottom: 120,
//   },

//   time: {
//     justifyContent: "center",
//     textAlign: "center",
//     fontSize: 24,
//     color: "#38447E",
//     bottom: 80,
//   },
//   totalPriceText: {
//     top: 70,
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#38447E",
//   },
// });

// export default BookSlot;






import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, parseISO, differenceInMinutes } from 'date-fns';  
import Header from "./Header";
import Footer from "./Footer";

const BookSlot = () => {
  const [searchText, setSearchText] = useState("");
  const [chosenDate, setChosenDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isArrivalTimePickerVisible, setArrivalTimePickerVisible] = useState(false);
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const pricePerHour = 10;
  const navigation = useNavigation();
  const route = useRoute();
  const { slot } = route.params;

  useEffect(() => {
    console.log("Selected Slot:", slot);
  }, [slot]);

  
  useEffect(() => {
    navigation.setParams({
      chosenDate: chosenDate.toString(),
      arrivalTime,
      departureTime,
      totalPrice,
    });
  }, [chosenDate, arrivalTime, departureTime, totalPrice]);
  
  const currentDate = new Date();
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(currentDate.getDate() + 5);

  const handleDateConfirm = (date) => {
    const selectedDateTime = new Date(date);

    const formattedDate = format(selectedDateTime, 'yyyy-MM-dd');

    setChosenDate(selectedDateTime);
    hideDatePicker();
    hideArrivalTimePicker();
    hideDepartureTimePicker();
    setTimeout(() => {
      showTimePicker();
    }, 1);
  };

  const handleArrivalTimeConfirm = (time) => {
    const formattedTime = format(time, 'HH:mm:ss'); 
    setArrivalTime(formattedTime);
    hideArrivalTimePicker();
    setDepartureTimePickerVisible(true);
  };

  const handleDepartureTimeConfirm = (time) => {
    const formattedTime = format(time, 'HH:mm:ss'); 
    setDepartureTime(formattedTime);

    const arrivalDateTime = parseISO(`${format(chosenDate, 'yyyy-MM-dd')}T${arrivalTime}`);
    const departureDateTime = parseISO(`${format(chosenDate, 'yyyy-MM-dd')}T${formattedTime}`);
    const differenceInMinutesValue = differenceInMinutes(departureDateTime, arrivalDateTime);

    const totalPriceValue = Math.ceil(differenceInMinutesValue / 60) * pricePerHour;
    setTotalPrice(totalPriceValue);
    hideDepartureTimePicker();
  };

  // const handleQRCodePress = () => {
  //   console.log(chosenDate, arrivalTime, departureTime, totalPrice);

  //   if (!chosenDate || arrivalTime === "" || departureTime === "") {
  //     Alert.alert(
  //       "Validation Error",
  //       "Please fill in all the details (date and time) before booking the slot."
  //     );
  //   } else if (chosenDate < currentDate) {
  //     Alert.alert("Validation Error", "Please select a future date.");
  //   } else if (arrivalTime >= departureTime) {
  //     Alert.alert("Validation Error", "Please select a future time.");
  //   } else if (chosenDate > maxSelectableDate) {
  //     Alert.alert(
  //       "Validation Error",
  //       "Please select a date within the next 5 days."
  //     );
  //   } else {
  //     const qrCodeValue = generateQrCodeValue(chosenDate, arrivalTime);
  //     if (qrCodeValue) {
  //       console.log("Generated QR Code Value:", qrCodeValue);
  //       navigation.navigate("payment");
  //     } else {
  //       console.error("Failed to generate QR code value.");
  //     }
  //   }
  // };

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

      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      /> */}
      <Text style={styles.selectedSlotText}>Selected Slot: {slot}</Text>

      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.date}>
          {chosenDate ? format(chosenDate, 'yyyy-MM-dd') : "Select a date in future "}
        </Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      )}
{/* 
      <TouchableOpacity onPress={showTimePicker}>
        <Text style={styles.time}>
          <Image 
            source={require('../../assets/Clock.png')}
            style={styles.clockIcon} />
          {arrivalTime !== ""
            ? format(new Date(`2000-01-01T${arrivalTime}`), 'HH:mm:ss')
            : ""}
        </Text>
      </TouchableOpacity> */}
<TouchableOpacity onPress={showTimePicker}>
  <View style={styles.timeContainer1}>
    <Image
      source={require('../../assets/Clock.png')}
      style={styles.clockIcon1}
    />
    <Text style={styles.timeText1}>
      {arrivalTime !== ""
        ? format(new Date(`2000-01-01T${arrivalTime}`), 'HH:mm:ss')
        : ""}
    </Text>
  </View>
</TouchableOpacity>

      {isArrivalTimePickerVisible && (
        <DateTimePickerModal
          isVisible={isArrivalTimePickerVisible}
          mode="time"
          onConfirm={handleArrivalTimeConfirm}
          onCancel={hideArrivalTimePicker}
        />
      )}

      {/* <TouchableOpacity onPress={showTimePicker}>
        <Text style={styles.time}>
          <Image
            source={require('../../assets/Clock.png')}
            style={styles.clockIcon} />
          {departureTime !== ""
            ? format(new Date(`2000-01-01T${departureTime}`), 'HH:mm:ss')
            : ""}
        </Text>
      </TouchableOpacity> */}


<TouchableOpacity onPress={showTimePicker}>
  <View style={styles.timeContainer2}>
    <Image
      source={require('../../assets/Clock.png')}
      style={styles.clockIcon2}
    />
    <Text style={styles.timeText2}>
      {departureTime !== ""
        ? format(new Date(`2000-01-01T${departureTime}`), 'HH:mm:ss')
        : ""}
    </Text>
  </View>
</TouchableOpacity>
      {isDepartureTimePickerVisible && (
        <DateTimePickerModal
          isVisible={isDepartureTimePickerVisible}
          mode="time"
          onConfirm={handleDepartureTimeConfirm}
          onCancel={hideDepartureTimePicker}
        />
      )}

      {/* <TouchableOpacity
        style={styles.bookSlotButton}
        // onPress={handleQRCodePress}
      >
        <Text style={styles.bookSlotText}>Book Slot</Text>
      </TouchableOpacity> */}

<TouchableOpacity
  style={styles.bookSlotButton}
  onPress={() => {
    // Validate the selected date, arrival time, and departure time here
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
      // Assuming 'payment' is the route name for your payment page
      navigation.navigate("Payment", {
        chosenDate: chosenDate.toString(),
        
        arrivalTime,
        departureTime,
        totalPrice,
      });
    }
  }}
>
  <Text style={styles.bookSlotText}>Book Slot</Text>
</TouchableOpacity>


      <Text style={styles.totalPriceText}>Total Price: € {totalPrice}</Text>

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
  bookSlotButton: {
    padding: 10,
    top: 130,
    width: '70%',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38447E',
  },

  bookSlotText: {
    color: "white",
  },



  selectedSlotText: {
    fontSize: 25,
    fontWeight: "bold",
    bottom: 180,
  },


  timeContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 30,
  },
  timeContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 30,
  },
  
  clockIcon1: {
    width: 180,  
    height: 180, 
    marginRight: 65, 
  },
  clockIcon2: {
    width: 180, 
    height: 180, 
    marginRight: 25, 
    // alignContent: 'fix'
  },
  
  timeText1: {
    fontSize: 25, // Adjust the font size as needed
    color: "#38447E",
    right: 75,
  },
  timeText2: {
    fontSize: 25, // Adjust the font size as needed
    color: "#38447E",
    right :30,
  },
  date: {
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    color: "#38447E",
    bottom: 120,
  },

  time: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    color: "#38447E",
    bottom: 80,
  },
  totalPriceText: {
    bottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#38447E",
  },
});

export default BookSlot;
