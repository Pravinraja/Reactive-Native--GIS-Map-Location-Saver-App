import React from 'react';
import { View } from 'react-native';
import ListItem from './ListItem';

export default ({ locations, removeLocation, setLocationToBeEdited }) => {
  return (
    <View>
      {locations.map((location) => (
        <ListItem
          name={location.name}
          removeLocation={removeLocation}
          setLocationToBeEdited={setLocationToBeEdited}
          key={location.name}
        />
      ))}
    </View>
  );
};
