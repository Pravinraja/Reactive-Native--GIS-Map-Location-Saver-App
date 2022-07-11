import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable';

export default ({ name, removeLocation, setLocationToBeEdited }) => {
  return (
    <Swipeable
      style={styles.itemContainer}
      leftButtons={[
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => setLocationToBeEdited(name)}
        >
          <Text style={styles.buttonText}>Rename</Text>
        </TouchableOpacity>,
      ]}
      rightButtons={[
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => removeLocation(name)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>,
      ]}
    >
      <Text style={styles.name}>{name}</Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: -1,
    borderColor: '#d9dde3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftButton: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    color: 'white',
  },
  rightButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20,
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
  name: {
    marginLeft: 10,
    marginTop: 10,
  },
});
