import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Footer = () => {
  const navigation = useNavigation(); // Get the navigation object

  // Handle the Settings icon press to navigate to the "Settings" screen
  const handleSettingsPress = () => {
    navigation.navigate('settings');
  };

  // Handle the Home icon press to navigate to the "homepage" screen
  const handleHomePress = () => {
    navigation.navigate('homepage');
  };

  // Handle the User Profile icon press to navigate to the "user profile" screen
  const handleUserProfilePress = () => {
    // Replace 'userprofile' with the actual name of your user profile screen
    navigation.navigate('user');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSettingsPress}>
        <Image source={require('../../assets/settings.png')} style={styles.settingsIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleHomePress}>
        <Image source={require('../../assets/home.png')} style={styles.homeIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleUserProfilePress}>
        <Image source={require('../../assets/userprofile.png')} style={styles.userProfileIcon} />
      </TouchableOpacity>
    </View>
  );
};

    const styles = StyleSheet.create({
          footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 50,
            position: 'absolute',
            bottom: 5,
            // borderColor: 'black',
            // borderWidth: 1,
            // borderRadius: 1,
            // backgroundColor :'white',
          },
          iconContainer: {
            flex: 1,
            alignItems: 'center',
            margin: 90,
          },
          settingsIcon: {
            width: 40, 
            height: 40,
          },
          homeIcon: {
            width: 45, 
            height: 45,
          },
          userProfileIcon: {
            width: 40, 
            height: 40,
          },
        });

        export default Footer;



