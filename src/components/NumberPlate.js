import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const CarNumberPlateInput = () => {
  const [carNumberPlate, setCarNumberPlate] = useState('');

  const handleValidateCarNumberPlate = () => {
    // Simple example: Check if the car number plate has at least 5 characters
    if (carNumberPlate.length >= 5) {
      Alert.alert('Success', 'Car number plate is valid!');
    } else {
      Alert.alert('Error', 'Please enter a valid car number plate.');
    }
  };

  return (
    <View style={styles.container}>
        <Header />
      <Text style={styles.title}>Enter Car Number Plate</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter car number plate"
        value={carNumberPlate}
        onChangeText={(text) => setCarNumberPlate(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidateCarNumberPlate}>
        <Text style={styles.buttonText}>Validate Car Number Plate</Text>
      </TouchableOpacity>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    bottom: 300, 
    color: '#4595E0',

  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    bottom: 200,
  },
  button: {
    backgroundColor: '#4595E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    bottom: 200,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CarNumberPlateInput;
