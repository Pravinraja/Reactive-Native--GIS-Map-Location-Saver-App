import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Dimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

export default ({
  locationName,
  editLocationName,
  isOpen,
  setLocationToBeEdited,
}) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = () => {
    editLocationName(locationName, newName);
    setLocationToBeEdited(null);
  };

  return (
    <Modal style={styles.modalStyle} isVisible={isOpen}>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          style={styles.inputStyle}
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <Button title="Rename" onPress={handleSubmit} color="#22a58a" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    width: 300,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginRight: 5,
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
});
