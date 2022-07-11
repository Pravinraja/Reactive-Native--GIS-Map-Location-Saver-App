import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';

export default ({ location, addLocation, isOpen, setIsOpen }) => {
  const [name, setName] = useState('');

  const handleSubmit = (location) => {
    addLocation(location);
    setIsOpen(false);
    setName('');
  };

  return (
    <Modal style={styles.modalStyle} isVisible={isOpen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />
        <Button
          title="Add"
          onPress={() => handleSubmit({ ...location, name })}
          color="#22a58a"
        />
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
    marginLeft: 30,
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
