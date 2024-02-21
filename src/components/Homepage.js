

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import DropdownComponent from './Dropdown';
import { useRoute } from '@react-navigation/native';

const Homepage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { email,location } = route.params;
  


  const handleBookSlotPress = (slot, event) => {
    event.persist();
    navigation.navigate('bookslot', { email, location, slot });
  };

  const handleLocationPress = () => {
    navigation.navigate('search',{email});
  };

  const renderSlot = (row, index) => {
    const slotName = `${index + 1}${String.fromCharCode(65 + row)}`;

    return (
      <TouchableOpacity key={slotName} onPress={(event) => handleBookSlotPress(slotName, event)}>
        <View style={styles.squareone}>
          <View style={styles.carIcon}>
            <Image source={require('../../assets/Car.png')} style={{ width: 25, height: 25 }} />
            <Text style={styles.slotText}>{slotName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRow = (row) => (
    <View key={row} style={styles.row}>
      {Array.from({ length: 7 }, (_, index) => renderSlot(row, index))}
    </View>
  );

  // const handleSearch = async () => {
  // };

  return (
    <View style={styles.container}>
      <Header />

      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      /> */}

      <Text style={styles.selectSpaceText}>Select Preferred Space</Text>
<View style={styles.dropdown}>
      <DropdownComponent/>
      </View>

      {renderRow(0)}
      {renderRow(1)}
      {renderRow(2)}
      {renderRow(3)}
      {renderRow(4)}
      {renderRow(5)}

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
  // searchBar: {
  //   height: 45,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   margin: 10,
  //   paddingLeft: 10,
  //   position: 'absolute',
  //   top: 130,
  //   left: 50,
  //   right: 50,
  //   zIndex: 1,
  //   backgroundColor: 'white',
  // },
  selectSpaceText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#38447E',
    bottom: 30,
  },
  squareone: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dropdownContainer: {
    height: 40,
    width: '80%',
    marginTop: 10,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
  },
  dropdownLabelStyle: {
    color: '#38447E',
  },
  slotText: {
    fontSize: 12,
    color: '#38447E',
    marginTop: 5,
  },
});

export default Homepage;
