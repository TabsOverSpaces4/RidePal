import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, route } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../config";

const FormPage = ({ route }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedStartLatitude, setSelectedStartLatitude] = useState("");
  const [selectedStartLongitude, setSelectedStartLongitude] = useState("");
  const [rideDateTime, setRideDateTime] = useState(new Date());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to track button disabled state
  const navigation = useNavigation();
  const { rideName, yourName, numberOfRiders } = route.params;
  const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=<span class="math-inline">\{details\.place\_id\}&key\=</span>{config.googleMapsApiKey}`;


  useEffect(() => {
    // Check if all input fields are filled
    if (rideDateTime && selectedAddress) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [rideDateTime, selectedAddress]);

  const handleCancel = () => {
    // Implement cancel logic here
    navigation.goBack();
    console.log("Form cancelled");
    // You can navigate to a different screen or perform any other action
  };

  const handleNext = () => {
    // Implement next logic here
    console.log(rideDateTime, selectedAddress, selectedStartLatitude, selectedStartLongitude);
    navigation.navigate("Destination Page", {
      selectedAddress: selectedAddress,
      rideDateTime: rideDateTime,
      rideName: rideName,
      yourName: yourName,
      numberOfRiders: numberOfRiders,
      selectedStartLatitude: selectedStartLatitude,
      selectedStartLongitude: selectedStartLongitude
    });
    // You can navigate to the next step of the form or perform any other action
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || rideDateTime;
    setRideDateTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's Assemble</Text>
      <View style={styles.dateTimeContainer}>
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
        onPress={(data, details) => {
          if (details) {
            // Extract placeID from details
            const placeId = details.place_id;
    
            // Make a separate API call to get details including lat and lng
            fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${config.googleMapsApiKey}`)
                .then(response => response.json())
                .then(data => {
                    const { lat, lng } = data.result.geometry.location;
            setSelectedStartLatitude(lat);
            setSelectedStartLongitude(lng);

                })
                .catch(error => console.error(error));
    
            setSelectedAddress(data.description);
        } else {
            console.log("Details not yet available");
        }
        }}
        query={{
          key: config.googleMapsApiKey,
          language: "en",
          fetchDetails: true,
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
          style={[
            styles.button,
            styles.nextButton,
            isButtonDisabled && styles.disabledButton,
          ]} // Apply disabled style if button is disabled
          onPress={handleNext}
          disabled={isButtonDisabled} // Disable button based on state
        >
          <FontAwesome5 name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
  dateTimeContainer: {
    marginBottom: 25,
    backgroundColor: "#f09142",
    borderRadius: 25,
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
  disabledButton: {
    backgroundColor: "#888", // Change color for disabled state
  },
});

export default FormPage;
