import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

const FormPage = () => {
  const [rideName, setRideName] = useState('');
  const [numberOfRiders, setNumberOfRiders] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const handleSubmit = () => {
    // Handle form submission here, you can send data to server or perform any action
    console.log('Ride Name:', rideName);
    console.log('Number of Riders:', numberOfRiders);
    console.log('Departure Time:', departureTime);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ride Name"
        value={rideName}
        onChangeText={setRideName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Riders"
        value={numberOfRiders}
        onChangeText={setNumberOfRiders}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Departure Time"
        value={departureTime}
        onChangeText={setDepartureTime}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default FormPage;
