import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ReferFriendScreen = () => {
  const [friendEmail, setFriendEmail] = useState('');

  const handleReferFriend = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(friendEmail)) {
      Alert.alert('Success', `Your friend (${friendEmail}) has been referred!`);
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  return (
    <View style={styles.container}>
        <Header />
      <Text style={styles.title}>Refer a Friend</Text>

      <TextInput
        style={styles.input}
        placeholder="Friend's Email"
        value={friendEmail}
        onChangeText={(text) => setFriendEmail(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleReferFriend}>
        <Text style={styles.buttonText}>Refer Friend</Text>
      </TouchableOpacity>
      <Footer />
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
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4595E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReferFriendScreen;

