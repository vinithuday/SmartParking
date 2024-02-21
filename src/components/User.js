import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from './Header';
import Footer from './Footer';
const User = () => {


  const navigation = useNavigation();

  const handlePaymentPress = () => {
    navigation.navigate('settings');   // should change to notfication page later
  };
  const handleHistoryPress = () => {
    navigation.navigate('settings');   // should change to notfication page later
  };
  const handleHowItWorksPress = () => {
    navigation.navigate('settings');   // should change to notfication page later
  };
  const handleSupportPress = () => {
    navigation.navigate('settings');   // should change to notfication page later
  };

  const handleSettingsPress = () => {
    navigation.navigate('settings');   // should change to notfication page later
  };

  const handleLogoutPress = () => {
    navigation.navigate('LoginScreen');   // should change to notfication page later
  };

  return (
    <View style={styles.container}>
       <View style={styles.userIcon}>
        <Image
                source={require('../../assets/settings/userIcon.png')}
                style={{ width: 95, height: 95 }}/>
    <Text style={styles.userName}> User Name</Text>
    </View>
    <View style={styles.row}>

    <TouchableOpacity onPress={handlePaymentPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/payment.png')}
                style={{ width: 40, height: 40 }}              />
              <Text style={styles.userProfileText}> Payment Methods </Text>
            </View>
          </View>
        </TouchableOpacity>

          

      <TouchableOpacity onPress={handleHistoryPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/history.png')}
                style={{ width: 40, height: 40 }}              />
              <Text style={styles.userProfileText}> Parking History </Text>
            </View>
          </View>
        </TouchableOpacity>

        

    </View>
    <View style={styles.row}>

    <TouchableOpacity onPress={handleHowItWorksPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/howItWorks.png')}
                style={{ width: 40, height: 40 }}              />
              <Text style={styles.userProfileText}> How it Works </Text>
            </View>
          </View>
        </TouchableOpacity>

        

      <TouchableOpacity onPress={handleSupportPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/support.png')}
                style={{ width: 40, height: 40 }}              />
              <Text style={styles.userProfileText}> Support </Text>
            </View>
          </View>
        </TouchableOpacity>

        
    </View>
    <View style={styles.row}>

    <TouchableOpacity onPress={handleSettingsPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/settings.png')}
                style={{ width: 40, height: 40 }}              />
              <Text style={styles.userProfileText}> Settings </Text>
            </View>
          </View>
        </TouchableOpacity>

        

      <TouchableOpacity onPress={handleLogoutPress}>
          <View style={styles.squareone}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/settings/logout.png')}
                style={{ width: 40, height: 40  }}
              />
              <Text style={styles.userProfileText}> Logout </Text>
            </View>
          </View>
        </TouchableOpacity>

        
    </View>

    <Header />
    <Footer />
  </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      fontSize : 20,
      fontWeight : 'bold',
      justifyContent: 'center',
      color: '#4595E0',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      
    },
  userIcon : {
    marginBottom : 20,
    alignItems: 'center',

  },
  
    squareone: {
      backgroundColor: '#ffff',
      width: 170,
      height: 170,
      margin: 10,
      borderColor: 'rgba(128, 128, 128, 0.5)', 
      borderWidth: 1, 
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',

    },
  userProfileIcon: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  userProfileText: {
    marginLeft: 5, 
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    
});
export default User;