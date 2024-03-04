import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { API } from "./config";

const Map = () => {
  const route = useRoute();
  const { email } = route.params || {};

  const [mapRegion, setMapRegion] = useState({
    latitude: 49.488888,
    longitude: 8.469167,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [additionalMarkers, setAdditionalMarkers] = useState([]);

  const handleParkingLotPress = (marker) => {
    navigation.navigate("homepage", {
      email: email,
      location: marker.name,
    });
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarkerCoordinate({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(location.coords.latitude, location.coords.longitude);

    try {
      const response = await axios.get(`${API.mapLocations}`);
      setAdditionalMarkers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMapRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerCoordinate({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      }
    } catch (error) {
      console.error("Error while geocoding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
        <Image
          source={require("../../assets/mappin.png")}
          style={styles.logo1}
        />
      </View>

      <MapView style={styles.map} region={mapRegion}>
        {markerCoordinate && (
          <Marker coordinate={markerCoordinate}>
            <Image
              source={require("../../assets/Car.png")}
              style={{ width: 25, height: 25 }}
            />
          </Marker>
        )}

        {additionalMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            onPress={() => handleParkingLotPress(marker)}
          >
            <Image
              source={require("../../assets/Parkinglot.png")}
              style={{ width: 25, height: 25 }}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={userLocation}>
          <Image
            source={require("../../assets/CLocation3.png")}
            style={styles.currentlocation}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  ParkingLotButton: {
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#38447E",
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
    width: "70%",
  },
  ParkingLotText: {
    color: "white",
  },

  searchBar: {
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    paddingLeft: 20,
    flexDirection: "row",
    backgroundColor: "white",
    top: 130,
    left: 40,
    width: "80%",
    zIndex: 1,
    marginTop: -60,
    elevation: 98,
    shadowColor: "#000",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
  },
  logo1: {
    width: 30,
    height: 30,
    right: 10,
  },
  currentlocation: {
    width: 80,
    height: 80,
    top: 750,
  },
  footerContainer: {
    alignItems: "center",
  },
});

export default Map;
