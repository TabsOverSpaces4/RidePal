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

const FormPagetwo = () => {
  const [selectedDestinationAddress, setSelectedDestinationAddress] =
    useState("");
  const navigation = useNavigation();
  const [rideDateTime, setRideDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleCancel = () => {
    navigation.goBack();
    console.log("Form cancelled");
  };

  const handleNext = () => {
    console.log("Moving to next step");
    console.log("Selected Destination:", selectedDestinationAddress);
    console.log("Ride Date/Time:", rideDateTime);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || rideDateTime;
    setShowDateTimePicker(false);
    setRideDateTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Where to?</Text>
      <View
        style={{
          marginBottom: 25,
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
          textColor="#FFF"
          dateTimePickerContainerStyle={{
            backgroundColor: "white",
          }}
        />
      </View>
      <GooglePlacesAutocomplete
        placeholder="Starting Point"
        onPress={(data, details = null) => {
          setSelectedDestinationAddress(data.description);
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
            color: "#ddd",
          },
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#fff" />
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
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#dc3545",
  },
  nextButton: {
    backgroundColor: "#28a745",
  },
});

export default FormPagetwo;
