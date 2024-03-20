import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const FormPage = () => {
  const [rideDateTime, setRideDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  const buttonScale = useState(new Animated.Value(1))[0];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || rideDateTime;
    setShowDatePicker(false);
    setRideDateTime(currentDate);
  };

  const handleSubmit = () => {
    console.log("Date and Time:", rideDateTime);
    console.log("Starting Point:", startingPoint);
    console.log("Destination:", destination);
    console.log("Code:", code);
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
    <View style={styles.container}>
      <Text style={styles.title}>Plan Your Ride</Text>
      <View
        style={{
          marginBottom: 15,
          backgroundColor: "#7299cf",
          borderRadius: 25,
        }}
      >
        <DateTimePicker
          testID="dateTimePicker"
          value={rideDateTime}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          textColor="#FFF" // Set text color to white
          dateTimePickerContainerStyle={{
            backgroundColor: "white",
          }}
        />
      </View>

     
	  <View style={styles.search}>
<GooglePlacesAutocomplete
position='relative'
  placeholder='Starting Point'
  onPress={(data, details = null) => {
    setStartingPoint(data.description);
  }}
  query={{
    key: 'AIzaSyDy9DjPinmRsgXawWJypO5ZzUaDsiU51x8',
    language: 'en',
  }}
  styles={{
    textInputContainer: {
      width: '100%',
      marginBottom: 10,
    },
    textInput: {
      ...styles.input,
      marginBottom: 0,
    },
    container: {
      position: 'relative', // Adjust position to relative
      width: '100%',
    },
    listView: {
      backgroundColor: '#FFF',
      zIndex: 1,
      width: '100%',
    },
  }}
/>
</View>
{/* 
<GooglePlacesAutocomplete
  placeholder='Destination'
  onPress={(data, details = null) => {
    setDestination(data.description);
  }}
  query={{
    key: 'AIzaSyDy9DjPinmRsgXawWJypO5ZzUaDsiU51x8',
    language: 'en',
  }}
  styles={{
    textInputContainer: {
      width: '100%',
      marginBottom: 10, // Adjust marginBottom for spacing
    },
    textInput: {
      ...styles.input,
      marginBottom: 0, // Remove marginBottom to override the default spacing
    },
    container: {
      // Ensure container style is applied properly
      width: '100%',
    },
  }}
/> */}
      <TextInput
        style={[styles.input, {marginTop:200}]}
        placeholder="Code"
        placeholderTextColor="#A9A9A9"
        value={code}
        onChangeText={setCode}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: "#2196F3" }]}
        >
          <Text style={styles.buttonText}>Ride on</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, { backgroundColor: "#FF5722" }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

	search: {
		position:'absolute',
		width:'100%'
	},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFF",
  },
  datePickerButton: {
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: "white",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#303030",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    color: "#FFF",
    backgroundColor: "#303030",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  button: {
    height: 50,
    width: "48%", // Adjusted width for side-by-side layout
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3", // Example background color
    marginHorizontal: 5, // Added margin for spacing between buttons
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default FormPage;
