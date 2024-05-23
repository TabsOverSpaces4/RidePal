import React, { Component, useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Linking,
} from "react-native";
import MapView, {
  Callout,
  Polyline,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import config from "../config";
import LocationList from "./rideList";
import MapViewDirections from "react-native-maps-directions";
import CustomCallout from "./CustomCallout";

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
    rideId,
    rideName,
    yourName,
    numberOfRiders,
    startTime,
    startingPoint,
    destination,
    rideDateTime,
    selectedStartLatitude,
    selectedStartLongitude,
    selectedDestinationLatitude,
    selectedDestinationLongitude,
  } = route.params || {};
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);
  const [focusUserLocation, setFocusUserLocation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otherRiders, setOtherRiders] = useState([]);

  const origin = {
    latitude: selectedStartLatitude,
    longitude: selectedStartLongitude,
  };
  const findestination = {
    latitude: selectedDestinationLatitude,
    longitude: selectedDestinationLongitude,
  };

  const fetchDataById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
      } else {
        console.error(
          "Failed to fetch data",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  // console.log("rideid:", rideId);
  useEffect(async () => {
    const resp = await fetchDataById(rideId);
    console.log(resp.otherRiders);

    const riders = resp.otherRiders.map((rider, index) => {
      return {
        id: index,
        color: "78586f",
        name: rider.name,
        distance: "2.5km",
      };
    });
    setOtherRiders(riders);
    console.log(riders);
  }, []);
  const data = [
    { id: 1, color: "#e6c79c", name: "Vipin Gupta", distance: "1.5 km" },
    { id: 2, color: "#78586f", name: "Sarita Gupta", distance: "2.3 km" },
    { id: 3, color: "#7b9ea8", name: "Ashmita Gupta", distance: "3.1 km" },
    { id: 4, color: "#ff8686", name: "Mansi Maini", distance: "4.1 km" },
    { id: 5, color: "#86daff", name: "Eshanika Ray", distance: "5.6 km" },
    { id: 6, color: "#f5bdff", name: "Manit Nahar", distance: "3.7 km" },
    { id: 7, color: "#b688ff", name: "Prateek Ganigi", distance: "3.4 km" },
    // Add more data as needed
  ];
  const navigation = useNavigation();

  const handleToggleFocus = () => {
    if (mapRef.current) {
      const latitude1 = selectedStartLatitude;
      const longitude1 = selectedStartLongitude;
      const latitude2 = selectedDestinationLatitude;
      const longitude2 = selectedDestinationLongitude;

      // Calculate the minimum and maximum latitude and longitude
      const minLatitude = Math.min(latitude1, latitude2);
      const maxLatitude = Math.max(latitude1, latitude2);
      const minLongitude = Math.min(longitude1, longitude2);
      const maxLongitude = Math.max(longitude1, longitude2);

      // Calculate the center latitude and longitude
      const centerLatitude = (minLatitude + maxLatitude) / 2 - 0.17;
      const centerLongitude = (minLongitude + maxLongitude) / 2;

      // Calculate the delta values for zooming
      const latitudeDelta = maxLatitude - minLatitude + 0.55;
      const longitudeDelta = maxLongitude - minLongitude + 0.1;

      // Construct the camera object
      const camera = {
        center: {
          latitude: centerLatitude,
          longitude: centerLongitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 10,
      };

      // Animate the camera to the calculated region
      mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  };
  const onCalloutPressed = () => {
    console.log("pressed");
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onNavigatePress = () => {
    const latitude = selectedStartLatitude;
    const longitude = selectedStartLongitude;
    const url = `https://www.google.com/maps/place/${latitude},${longitude}`;

    setModalVisible(false); // Close the modal

    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        showsUserLocation
        // showsMyLocationButton
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
        >
          <View style={{ width: 40, height: 40 }}>
            <Image
              source={require("../assets/Markers/start.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <Callout onPress={onCalloutPressed} tooltip>
            <View style={styles.calloutContainer}>
              <CustomCallout
                title="Starting Point"
                subtitle={startingPoint}
                link="YOUR_LINK_HERE"
              />
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: selectedDestinationLatitude,
            longitude: selectedDestinationLongitude,
          }}
          title={"Destination"}
          description={destination}
          titleStyle={{ color: "blue", fontWeight: "bold" }}
          descriptionStyle={{ color: "gray" }}
          calloutContainerStyle={styles.calloutContainer}
        >
          <View style={{ width: 40, height: 40 }}>
            <Image
              source={require("../assets/Markers/end.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <CustomCallout
                title="Destination"
                subtitle={destination}
                link="YOUR_LINK_HERE"
              />
            </View>
          </Callout>
        </Marker>
        <MapViewDirections
          origin={origin}
          destination={findestination}
          strokeWidth={4}
          strokeColor="#ffb300"
          apikey={config.googleMapsApiKey}
        />
      </MapView>
      <LocationList data={otherRiders} onToggleFocus={handleToggleFocus} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.modalContainer}>
            <Text style={stylesModal.modalTitle}>Starting Point</Text>
            <View style={stylesModal.modalContent}>
              <Text style={stylesModal.modalLabel}>Start Time</Text>
              <Text style={stylesModal.modalText}>{startTime}</Text>
              <Text style={stylesModal.modalLabel}>Address</Text>
              <Text style={stylesModal.modalText}>{startingPoint}</Text>
            </View>
            <View style={stylesModal.buttonContainer}>
              <TouchableOpacity
                style={stylesModal.button}
                onPress={onNavigatePress}
              >
                <Text style={stylesModal.buttonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={stylesModal.cancelButton}
              onPress={closeModal}
            >
              <Text style={stylesModal.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    position: "absolute",
    top: "6%",
    left: "2%",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(55, 71, 91, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  calloutContainer: {
    backgroundColor: "transparent",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
const stylesModal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#242e4c", // Dark background
    borderRadius: 20,
    padding: 20,
    width: "80%", // 80% of the screen width
    elevation: 5, // Add elevation for a shadow effect
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 30,
    color: "#f0f0f0", // Light text color
    textAlign: "center",
  },
  modalContent: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 18,
    color: "#f0f0f0", // Light text color
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#CCCCCC", // Lighter text color
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#f09142",
    borderRadius: 25,
    paddingVertical: 12,
    width: "100%", // Adjust as needed based on your preference
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
  cancelButton: {
    // backgroundColor: 'rgba(255, 0, 0, 0.6)', // Adjust the color as needed
    borderRadius: 10,
    paddingVertical: 5,
    // height:,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#f09142",
    textAlign: "center",
  },
});

export default MapviewNav;
