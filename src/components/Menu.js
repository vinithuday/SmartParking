import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleRemindersPress = () => {
    navigation.navigate('settings');
  };

  const handleMessagesPress = () => {
    navigation.navigate('settings');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Header />
      <Text style={styles.menuName}> Menu</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleRemindersPress}>
          <Animated.View style={[styles.squareone, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/numberPlate.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}>Enter Number plate </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMessagesPress}>
          <Animated.View style={[styles.squareone, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/contactUs.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}> Contact Us </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleRemindersPress}>
          <Animated.View style={[styles.squareone, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/notification.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}>FAQ's </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMessagesPress}>
          <Animated.View style={[styles.squareone, { opacity: fadeAnim }]}>
            <View style={styles.userProfileIcon}>
              <Image
                source={require('../../assets/Messages.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.userProfileText}> Refer a Friend </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.Image
        source={require('../../assets/menuCar.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      <Footer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareone: {
    backgroundColor: '#ffff',
    width: 170,
    height: 170,
    margin: 10,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    top: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    top: 60,
    width: 250,
    height: 310,
  },

  userProfileText: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userProfileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4595E0',
  },
});

export default Menu;
