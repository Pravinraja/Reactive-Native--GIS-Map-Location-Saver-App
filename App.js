import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import LocationList from './components/LocationList';
import MapModal from './components/MapModal';
import NameModal from './components/NameModal';
import EditNameModal from './components/EditNameModal';

export default () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addingLocation, setAddingLocation] = useState(false);
  const [locations, setLocations] = useState([]);
  const [nameModalIsOpen, setNameModalIsOpen] = useState(false);
  const [locationToBeAdded, setLocationToBeAdded] = useState(null);
  const [locationToBeEdited, setLocationToBeEdited] = useState(null);

  const openMap = (isAdding) => {
    if (isAdding) {
      setAddingLocation(true);
    } else {
      setAddingLocation(false); 
    }

    setModalIsOpen(true);
  };

  // Add a location object to the array of locations
  const addLocation = (location) => {
    setLocations([...locations, location]);
  };

  // Given the name of a location, remove it from the list of locations
  const removeLocation = (name) => {
    setLocations(locations.filter((location) => location.name !== name));
  };

  // Edit the name of a location given the current name and the new name
  const editLocationName = (oldName, newName) => {
    let idx;

    // Retrive the location using the name argument
    const oldLocation = locations.find((location, i) => {
      if (location.name === oldName) {
        idx = i;
        return true;
      }
    });

    // Copy the location object so it can be safely mutated
    const location = Object.assign({}, oldLocation);
    location.name = newName;

    // Copy locations array, replace the modified location, and update state
    const newLocations = [...locations];
    newLocations[idx] = location;
    setLocations(newLocations);
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 50 }}>
        Click the button to save your location to the list
      </Text>
      <View style={styles.buttonStyle}>
        <Button
          title="Add my location"
          style={styles.buttonStyle}
          onPress={() => openMap(true)}
          color="#22a58a"
        />
        <Button
          title="Open Modal"
          style={styles.buttonStyle}
          onPress={() => openMap(false)}
          color="#22a58a"
        />
      </View>
      <MapModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        addingLocation={addingLocation}
        locations={locations}
        setNewLocation={setLocationToBeAdded}
        setNameModalIsOpen={setNameModalIsOpen}
      />
      <NameModal
        location={locationToBeAdded}
        addLocation={addLocation}
        isOpen={nameModalIsOpen}
        setIsOpen={setNameModalIsOpen}
      />
      <EditNameModal
        locationName={locationToBeEdited}
        editLocationName={editLocationName}
        isOpen={locationToBeEdited !== null}
        setLocationToBeEdited={setLocationToBeEdited}
      />
      <LocationList
        locations={locations}
        removeLocation={removeLocation}
        editLocationName={editLocationName}
        setLocationToBeEdited={setLocationToBeEdited}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5fbfe',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonStyle: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    height: '11%',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: '5%',
  },
});
