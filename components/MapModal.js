import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

export default ({
  isOpen,
  setIsOpen,
  addingLocation,
  locations,
  setNewLocation,
  setNameModalIsOpen,
}) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [isPressing, setIsPressing] = useState(false);
  const [openName, setOpenName] = useState(false);

  // Get the current location of the user and set the result to region is state
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        };

        setRegion(region);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

  const handleAddLocation = () => {
    // Set location to be added in state for use in the Name modal
    setNewLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    // Reset and close map modal
    setIsPressing(false);
    setIsOpen(false);

    // Signal that the name modal should be opened
    // (iOS requires the closing animation of the Map modal to be finished before the Name modal can be rendered)
    setOpenName(true);
  };

  const handleClose = () => {
    setIsPressing(false);
    setIsOpen(false);
  };

  // Set region to location of press rather than user location
  const handleMapPress = (e) => {
    setIsPressing(true);
    setRegion(e.nativeEvent.coordinate);
  };

  // Triggers after Map modal closing animation is concluded
  const handleHide = () => {
    // If the Name modal should be opened after Map modal is closed, open it
    if (openName) {
      setNameModalIsOpen(true);
    }

    setOpenName(false);
  };

  useEffect(() => {
    // If the user has not manually selected a region by tapping, set the region to the user's location
    if (!isPressing) {
      getCurrentLocation();
    }
  }, [isPressing]);

  return (
    <Modal
      isVisible={isOpen}
      style={styles.modalStyle}
      onModalHide={handleHide}
    >
      <MapView
        style={styles.mapStyle}
        region={region}
        onPress={(e) => handleMapPress(e)}
      >
        {addingLocation ? (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        ) : (
          locations.map((location) => (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
            />
          ))
        )}
      </MapView>
      <View style={styles.buttonsStyle}>
        <Button title="Close" onPress={handleClose} color="#22a58a" />
        {addingLocation ? (
          <Button
            title="Add location"
            onPress={handleAddLocation}
            color="#22a58a"
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    margin: 0,
  },
  buttonsStyle: {
    position: 'absolute',
    bottom: 10,
    left: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
});
