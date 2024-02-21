import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from './Footer';
import Header from './Header';
const Settings = () => {

  const navigation = useNavigation();
  const handleNotificationPress = () => {
    navigation.navigate('notification');   // should change to notfication page later
  };

  const handleUserProfilePress = () => {
    navigation.navigate('user');   // should change to notfication page later
  };

  const handleLanguagePress = () => {
    navigation.navigate('user');   // should change to notfication page later
  };

  const handleTermsOfUsePress = () => {
    navigation.navigate('user');   // should change to notfication page later
  };

  const handlePrivacyPolicyPress = () => {
    navigation.navigate('user');   // should change to notfication page later
  };


  return (
    <View style={styles.container}>
      <Header/>
    <Footer/>

      <Text style={styles.headerText}>Settings</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleNotificationPress}>
          <View style={styles.squareone}>
            <View style={styles.settingsIcon}>
              <Image
                source={require('../../assets/settings/notifications.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.settingsText}> Notifications </Text>
            </View>
          </View>
        </TouchableOpacity>

        

         <TouchableOpacity onPress={handleUserProfilePress}>
          <View style={styles.squareone}>
            <View style={styles.settingsIcon}>
              <Image
                source={require('../../assets/settings/userprofile.png')}
                style={{ width: 40, height: 40}}
              />
              <Text style={styles.settingsText}> Account </Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.row}>
        

        <TouchableOpacity onPress={handleLanguagePress}>
          <View style={styles.squareone}>
            <View style={styles.settingsIcon}>
              <Image
                source={require('../../assets/settings/language.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.settingsText}> Language </Text>
            </View>
          </View>
        </TouchableOpacity>

       
       

        <TouchableOpacity onPress={handleTermsOfUsePress}>
          <View style={styles.squareone}>
            <View style={styles.settingsIcon}>
              <Image
                source={require('../../assets/settings/termsOfUse.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.settingsText}> Terms of Use </Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.row1}>

        <TouchableOpacity onPress={handlePrivacyPolicyPress}>
          <View style={styles.squareone}>
            <View style={styles.settingsIcon}>
              <Image
                source={require('../../assets/settings/privacyPolicy.png')}
                style={{ width: 40, height: 40}}
              />
              <Text style={styles.settingsText}> Privacy Policy </Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    top: 10,
     color: '#4595E0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 190,
    marginBottom: 110,
  },
  squareone: {
    width: 170,
    height: 170,
    margin: 10,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
  },

  settingsIcon: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  settingsText: {
    marginLeft: 5, 
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  
});

export default Settings;
