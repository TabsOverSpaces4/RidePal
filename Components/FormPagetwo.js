import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../config";

const FormPagetwo = ({ route }) => {
  const [selectedDestinationLatitude, setSelectedDestinationLatitude] =
    useState("");
  const [selectedDestinationLongitude, setSelectedDestinationLongitude] =
    useState("");
  const [selectedDestinationAddress, setSelectedDestinationAddress] =
    useState("");
  const navigation = useNavigation();
  const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=<span class="math-inline">\{details\.place\_id\}&key\=</span>{config.googleMapsApiKey}`;
  const {
    rideName,
    yourName,
    numberOfRiders,
    selectedAddress,
    rideDateTime,
    selectedStartLatitude,
    selectedStartLongitude,
  } = route.params;

  const handleCancel = () => {
    navigation.goBack();
    console.log("Form cancelled");
  };

  // // Example usage
  // updateRideData("60b8d295f8b4b9c9b7c5d8e9", {
  //   name: "New Rider",
  //   age: 25,
  //   experience: "Intermediate",
  // });

  const handleNext = async () => {
    const formData = {
      selectedAddress: selectedAddress,
      rideDateTime: rideDateTime,
      rideName: rideName,
      yourName: yourName,
      numberOfRiders: numberOfRiders,
      selectedDestinationAddress: selectedDestinationAddress,
      selectedStartLatitude: selectedStartLatitude,
      selectedStartLongitude: selectedStartLongitude,
      selectedDestinationLatitude: selectedDestinationLatitude,
      selectedDestinationLongitude: selectedDestinationLongitude,
    };
    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const rideId = await response.json();
        console.log("resp", rideId);
        navigation.navigate("Home", {
          rideId: rideId,
          selectedAddress: selectedAddress,
          rideDateTime: rideDateTime,
          rideName: rideName,
          yourName: yourName,
          numberOfRiders: numberOfRiders,
          selectedDestinationAddress: selectedDestinationAddress,
          selectedStartLatitude: selectedStartLatitude,
          selectedStartLongitude: selectedStartLongitude,
          selectedDestinationLatitude: selectedDestinationLatitude,
          selectedDestinationLongitude: selectedDestinationLongitude,
        });

        // Do something after successful data submission
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Where to?</Text>
      <GooglePlacesAutocomplete
        placeholder="Enter Destination"
        onPress={(data, details) => {
          if (details) {
            // Extract placeID from details
            const placeId = details.place_id;

            // Make a separate API call to get details including lat and lng
            fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${config.googleMapsApiKey}`
            )
              .then((response) => response.json())
              .then((data) => {
                const { lat, lng } = data.result.geometry.location;
                setSelectedDestinationLatitude(lat);
                setSelectedDestinationLongitude(lng);
              })
              .catch((error) => console.error(error));

            setSelectedDestinationAddress(data.description);
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
          <FontAwesome5 name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            selectedDestinationAddress ? {} : { backgroundColor: "gray" }, // Disable button if selectedDestinationAddress is empty
          ]}
          onPress={handleNext}
          disabled={!selectedDestinationAddress}
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

export default FormPagetwo;
