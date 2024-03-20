import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormPage = () => {
  const [rideName, setRideName] = useState('');
  const [numberOfRiders, setNumberOfRiders] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const navigation = useNavigation();
  const buttonScale = useState(new Animated.Value(1))[0];

  const handleSubmit = () => {
    console.log('Ride Name:', rideName);
    console.log('Number of Riders:', numberOfRiders);
    console.log('Departure Time:', departureTime);
    // Add any other submission logic here
    // For demonstration, let's just animate the button
    animateButton();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={[styles.container, styles.darkMode]}>
      <Text style={styles.title}>Plan Your Ride</Text>
      <TextInput
        style={styles.input}
        placeholder="Ride Name"
        placeholderTextColor="#A9A9A9"
        value={rideName}
        onChangeText={setRideName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Riders"
        placeholderTextColor="#A9A9A9"
        value={numberOfRiders}
        onChangeText={setNumberOfRiders}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Departure Time"
        placeholderTextColor="#A9A9A9"
        value={departureTime}
        onChangeText={setDepartureTime}
      />
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: '#2196F3' }]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={handleCancel} style={[styles.button, { backgroundColor: '#FF5722' }]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFF',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#303030',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#303030',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default FormPage;
