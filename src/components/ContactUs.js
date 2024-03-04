import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {

  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.cardContainer}>
        <Text style={styles.policyText}>
        Welcome to Smart Parking!{'\n'}
      If you're facing any issues or have questions,{'\n'}
      please feel free to reach out to us.{'\n'}
      We'll get back to you as soon as possible.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Your Message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  cardContainer: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 30,
    bottom: 150,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#4595E0',
    bottom: 190, 
  },
  formContainer: {
    width: '80%',
    bottom: 120,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  messageInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top', 
  },
  sendButton: {
    backgroundColor: '#4595E0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  policyText: {
    fontSize: 14,
    color: '#38447E',
  },
});

export default ContactUs;
