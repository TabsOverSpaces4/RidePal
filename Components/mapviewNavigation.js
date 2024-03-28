import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import config from "../config";
import LocationList from "./rideList";

const mapCustomStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const MapviewNav = ({ route }) => {
  const {
    rideName,
    yourName,
    numberOfRiders,
	startingPoint,
	destination,
    rideDateTime,
    selectedStartLatitude,
    selectedStartLongitude,
    selectedDestinationLatitude,
    selectedDestinationLongitude,
  } = route.params || {};
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    getDirections();
  }, []);

  const getDirections = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${selectedStartLatitude},${selectedStartLongitude}&destination=${selectedDestinationLatitude},${selectedDestinationLongitude}&key=${config.googleMapsApiKey}`
      );
      const route = response.data.routes[0];
      const steps = route.legs[0].steps;

      let coords = [];
      steps.forEach((step) => {
        coords.push({
          latitude: step.start_location.lat,
          longitude: step.start_location.lng,
        });
        coords.push({
          latitude: step.end_location.lat,
          longitude: step.end_location.lng,
        });
      });

      setCoordinates(coords);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const data = [
    { id: 1, color: "red", name: "Vipin Gupta", distance: "1.5 km" },
    { id: 2, color: "blue", name: "Sarita Gupta", distance: "2.3 km" },
    { id: 3, color: "green", name: "Ashmita Gupta", distance: "3.1 km" },
    // Add more data as needed
  ];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <MapView
        customMapStyle={mapCustomStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: selectedStartLatitude,
          longitude: selectedStartLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedStartLatitude,
            longitude: selectedStartLongitude,
          }}
          title={"Starting Point"}
          description={startingPoint}
		  titleStyle={{ color: 'blue', fontWeight: 'bold' }} // Style the title
          descriptionStyle={{ color: 'gray' }} // Style the description
          calloutContainerStyle={styles.calloutContainer}
          
          pinColor={"green"}
        />
        <Marker
          coordinate={{
            latitude: selectedDestinationLatitude,
            longitude: selectedDestinationLongitude,
          }}
          title={"Destination"}
          pinColor={"red"}
		  description={destination}
		  titleStyle={{ color: 'blue', fontWeight: 'bold' }} // Style the title
          descriptionStyle={{ color: 'gray' }} // Style the description
          calloutContainerStyle={styles.calloutContainer}
        />
        <Polyline
          coordinates={coordinates}
          strokeColor="#f09142"
          strokeWidth={4}
          lineCap="round"
        />
      </MapView>
      <LocationList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: "absolute",
    top: "6%",
    left: "2%",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(55, 71, 91, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure the button is above the map
  },
  calloutContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 25,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
});

export default MapviewNav;
