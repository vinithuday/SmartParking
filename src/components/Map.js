
import React, { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "./Header";
import axios from 'axios';
import Footer from "./Footer";

const Map = (props) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 49.488888,
    longitude: 8.469167,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [searchText, setSearchText] = useState("");
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [additionalMarkers, setAdditionalMarkers] = useState([]);
  
  const handleParkingLotPress = (marker) => {
    // Redirect to homepage and pass the location details
    props.navigation.navigate("homepage", {
      location: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
    });
  };
  
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarkerCoordinate({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    console.log(location.coords.latitude, location.coords.longitude);

    const additionalMarkersArray = [
      //Mannheim
      { latitude: 49.49169564910497, longitude: 8.47172320945259 },
      { latitude: 49.48724459203785,  longitude: 8.472049463789164 },
      { latitude: 49.48724104132143,  longitude: 8.472394096071014 },
      { latitude: 49.48360719273989,  longitude: 8.473247397660037   },
      { latitude: 49.49174664424732,  longitude: 8.4782952237641 },
      { latitude: 49.483874385937,   longitude: 8.473148977651602 },
      { latitude: 49.50042422785601, longitude: 8.470980085045838 },
      { latitude: 49.48564649995268,   longitude:8.480537709572214 },
      { latitude: 49.48333325694442,   longitude:8.47311211815927 },
      { latitude: 49.487024791405204,  longitude:  8.464199953932992 },
      { latitude: 49.484640198144994,  longitude:8.466572465489106 }, 
      { latitude: 49.48630233582744,   longitude: 8.46578903578471},
      { latitude: 49.49048221731351,  longitude:  8.467604030733249 },

      //Heidelberg
      { latitude: 49.40659385692796,   longitude: 8.686186888618364 },
      { latitude: 49.413718662699814,  longitude:  8.692563389795234 },
      { latitude:49.40173169829452,   longitude:8.69930543450089 },
      { latitude:   49.405949347544805,  longitude:  8.666320098460337 },
      { latitude: 49.40730379131969, longitude: 8.675218908954182  },
      { latitude:49.41115871827728,  longitude:  8.693955371941513 },
      { latitude: 49.4126712713395,   longitude:8.69977605208107 },
      { latitude:49.41198610309325,  longitude: 8.712001538700143 },
      { latitude: 49.41035669268545,  longitude: 8.692160890203017 },
      { latitude: 49.40876234291019,   longitude: 8.69801805168469 },
      { latitude:49.41089005040093,   longitude: 8.705468117198063 },
      { latitude: 49.40340190077526,   longitude: 8.688842950666347},
      { latitude: 49.411658259843705,   longitude:8.72006257716479 },
    ];
    setAdditionalMarkers(additionalMarkersArray);
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
        setMarkerCoordinate({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Error while geocoding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />

      <MapView style={styles.map} region={mapRegion}>
        {markerCoordinate && (
          <Marker coordinate={markerCoordinate}>
            <Image source={require('../../assets/Car.png')} style={{ width: 25, height: 25 }} />
          </Marker>
        )}

        {additionalMarkers.map((marker, index) => (
          <Marker key={index} coordinate={marker}  onPress={() => handleParkingLotPress(marker)}>
            <Image source={require('../../assets/Parkinglot.png')} style={{ width: 25, height: 25 }} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title='Current Location' onPress={userLocation} />
      </View>

      {/* <TouchableOpacity
        style={styles.ParkingLotButton}
        onPress={() => props.navigation.navigate("homepage")}
      >
        <Text style={styles.ParkingLotText}>Continue</Text>
      </TouchableOpacity> */}
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
    position: 'absolute',
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
    width: '70%',
  },
  ParkingLotText: {
    color: "white",
  },
  searchBar: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingLeft: 10,
    position: 'absolute',
    top: 130,
    left: 50,
    right: 50,
    zIndex: 1,
    backgroundColor: 'white',
  },
  footerContainer: {
    alignItems: 'center',
  },
});

export default Map;
