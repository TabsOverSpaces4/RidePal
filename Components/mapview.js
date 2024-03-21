import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonContainer from "./options";
import { StyleSheet, View } from "react-native";
import RideList from "./Scheduled";

export default function MapViewComponent() {
  const desiredCoordinates = { latitude: 12.934443, longitude: 77.682991 };
  const markerTitle = "Your Location";

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

  const rides = [
    {
      id: 1,
      name: "Ride 1",
      startTime: "10:00 AM",
      startingPoint: "Point A",
      destination: "Point B",
    },
    {
      id: 2,
      name: "Ride 2",
      startTime: "11:00 AM",
      startingPoint: "Point C",
      destination: "Point D",
    },
	{
		id: 3,
		name: "Ride 3",
		startTime: "11:00 AM",
		startingPoint: "Point C",
		destination: "Point D",
	  },
    // Add more ride objects as needed
  ];

  return (
    <View style={styles.container}>
      <MapView
	  use customMapStyle= {mapCustomStyle}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
        userInterfaceStyle="dark"
        style={styles.map}
        initialRegion={{
          latitude: desiredCoordinates.latitude,
          longitude: desiredCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={desiredCoordinates} title={markerTitle} />
      </MapView>
		<RideList rides={rides} />
      <ButtonContainer />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  position: "relative", // Ensure RideList and MapView are positioned relative to container
	},
	map: {
	  flex: 1, // Adjusted to occupy remaining space after RideList
	  ...StyleSheet.absoluteFillObject, // Ensure MapView covers the entire container
	},
  });
