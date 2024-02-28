import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({  }) => {

  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.navigate('menu');
  };

  const handleNotificationPress = () => {
    navigation.navigate('notification');
  }

  return (
 
<View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
        <Image source={require('../../assets/menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
        <Image source={require('../../assets/notification.png')} style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    position: 'absolute',
    top: 5,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 180,
  },
  menuIcon: {
    width: 25, 
    height: 25,
    marginTop: 90,
    marginRight: 20, 
  },
  notificationIcon: {
    width: 35, 
    height: 35,
    top: 7,
    marginTop: 80,
    marginLeft: 20, 
  },
});
export default Header;

