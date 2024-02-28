import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from "./Header";
import Footer from "./Footer";


const LanguageSelection = () => {
  const [language, setLanguage] = useState('English');

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <View style={styles.container}>
        
        <Header/>
      <Text style={styles.title}> Language</Text>

      
      <View style={styles.cardContainer}>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleLanguageChange} value={language}>
        <Text style={styles.title1}> Select a Language</Text>
          <View style={styles.radioButton}>
            <RadioButton value="English" />
            <Text>English</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="Deutsch" />
            <Text>German</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="हिंदी" />
            <Text>हिंदी</Text>
          </View>
        </RadioButton.Group>
      </View>
      <Text style={styles.selectedLanguage}>Selected Language: {language}</Text>
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
    backgroundColor: "#ffff",

  },
  cardContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginTop: 40,
    width: "80%",
    bottom: 220,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#4595E0',
    bottom: 250, 
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
   
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  selectedLanguage: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default LanguageSelection;
