import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const FormPage = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigation = useNavigation();
  const [rideDateTime, setRideDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleCancel = () => {
    // Implement cancel logic here
    navigation.goBack();
    console.log("Form cancelled");
    // You can navigate to a different screen or perform any other action
  };

  const handleNext = () => {
    // Implement next logic here
    console.log("Moving to next step");
    console.log("Selected Address:", selectedAddress);
    console.log("Ride Date/Time:", rideDateTime);
    navigation.navigate("Destination Page");
    // You can navigate to the next step of the form or perform any other action
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || rideDateTime;
    setShowDateTimePicker(false);
    setRideDateTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's Assemble</Text>
      <View
        style={{
          marginBottom: 25,
          backgroundColor: "#f09142",
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
      <GooglePlacesAutocomplete
        placeholder="Starting Point"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setSelectedAddress(data.description);
        }}
        query={{
          key: "AIzaSyDy9DjPinmRsgXawWJypO5ZzUaDsiU51x8",
          language: "en",
        }}
        styles={{
          container: {
            flex: 0,
            width: "100%",
            marginBottom: 20,
          },
          textInput: {
            height: 50,
            borderWidth: 1,
            borderColor: "#333",
            borderRadius: 8,
            paddingHorizontal: 10,
            color: "black",
          },
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <FontAwesome5 name="times" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <FontAwesome5 name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showDateTimePicker && (
        <DateTimePicker
          value={rideDateTime}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          textColor="#FFF"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242e4c",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 60,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  cancelButton: {
    backgroundColor: "#fa837a",
  },
  nextButton: {
    backgroundColor: "#f09142",
  },
});

export default FormPage;
