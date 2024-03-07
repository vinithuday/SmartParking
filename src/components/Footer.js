import React, { useState } from 'react';
import { View, Image, StyleSheet,Text,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tab) => {
    navigation.navigate(tab);
    setActiveTab(tab);
  };

  const getIconStyle = (tab) => ({
    ...styles.icon,
    ...(activeTab === tab ? styles.activeIcon : {}),
  });

  return (
    <View style={styles.footer}>
    <TouchableOpacity style={styles.iconContainer} onPress={() => handleTabPress('settings')}>
      <Image source={require('../../assets/settings.png')} style={getIconStyle()} />
      <Text style={styles.iconText}>Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconContainer} onPress={() => handleTabPress('LoginScreen')}>
      <Image source={require('../../assets/home.png')} style={getIconStyle()} />
      <Text style={styles.iconText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconContainer} onPress={() => handleTabPress('user')}>
      <Image source={require('../../assets/userprofile.png')} style={getIconStyle()} />
      <Text style={styles.iconText}>User</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ddd',
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    width: '80%',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#38447E',
    
    
  },
 
  activeIcon: {
    opacity: 1,
  },
});

export default Footer;

