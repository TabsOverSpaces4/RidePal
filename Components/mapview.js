import React, { useState, useEffect } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  CalloutSubview,
} from "react-native-maps";
import ButtonContainer from "./options";
import {
  Image,
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import RideList from "./Scheduled";
import CustomCallout from "./CustomCallout";
import config from "../config";
import axios from "axios";

function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = dateTime.getMonth();
  const year = dateTime.getFullYear();
  let hours = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  const formattedDateTime = `${hours}:${minutes} ${ampm} ${day} ${monthNames[monthIndex]} ${year}`;
  return formattedDateTime;
}

const MapViewComponent = ({ route }) => {
  const [focusUserLocation, setFocusUserLocation] = useState(false);
  const desiredCoordinates = { latitude: 12.934443, longitude: 77.682991 };
  const markerTitle = "Your Location";
  const [modalVisible, setModalVisible] = useState(false);
  const [rideIdToDelete, setRideIdToDelete] = useState(null);

  // useEffect(() => {
  //   // Effect to fetch rides data from server
  //   const fetchRides = async () => {
  //     try {
  //       const response = await axios.get(config.mogoLink + "/Rides/Rides"); // Append the collection name to the MongoDB connection string
  //       console.log("Rides:", response);
  //     } catch (error) {
  //       console.error("Error fetching rides:", error);
  //     }
  //   };

  //   fetchRides(); // Call fetchRides function when component mounts
  // }, []);

  const {
    rideId,
    rideName,
    yourName,
    numberOfRiders,
    selectedAddress,
    rideDateTime,
    selectedDestinationAddress,
    selectedStartLatitude,
    selectedStartLongitude,
    selectedDestinationLatitude,
    selectedDestinationLongitude,
  } = route.params || {};
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Effect to update rides data when route params change
    if (route.params) {
      const newRide = {
        rideId: rideId, // Generate unique ID for the new ride
        rideName: rideName,
        rideDateTime: formatDate(rideDateTime),
        selectedAddress: selectedAddress,
        selectedDestinationAddress: selectedDestinationAddress,
        yourName: yourName,
        numberOfRiders: numberOfRiders,
        selectedStartLatitude: selectedStartLatitude,
        selectedStartLongitude: selectedStartLongitude,
        selectedDestinationLatitude: selectedDestinationLatitude,
        selectedDestinationLongitude: selectedDestinationLongitude,
      };
      setRides((prevRides) => [...prevRides, newRide]); // Add new ride to rides state
      console.log("Console IDDDDDD: ", rideId.insertedId);
    }
  }, [
    rideName,
    rideDateTime,
    selectedAddress,
    selectedDestinationAddress,
    yourName,
    numberOfRiders,
  ]); // Update rides data when specific route params change
  const handleDeleteRide = (id) => {
    setRideIdToDelete(id);
    setModalVisible(true);
  };

  const removeRider = async (rideId, riderName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/data/${rideId}/rider/${riderName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Rider removed successfully", responseData);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to remove rider",
          response.status,
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchDataById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        // Update rides state with fetched data
        setRides((prevRides) => [...prevRides, data]); // Assuming the fetched data is an individual ride
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

  useEffect(() => {
    // Call fetchDataById when the component mounts
    fetchDataById(rideId); // Replace 'yourId' with the appropriate ID
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Add a new ride when route params change
    if (route.params) {
      const newRide = {
        rideId: rideId, // Generate unique ID for the new ride
        rideName: rideName,
        rideDateTime: formatDate(rideDateTime),
        selectedAddress: selectedAddress,
        selectedDestinationAddress: selectedDestinationAddress,
        yourName: yourName,
        numberOfRiders: numberOfRiders,
        selectedStartLatitude: selectedStartLatitude,
        selectedStartLongitude: selectedStartLongitude,
        selectedDestinationLatitude: selectedDestinationLatitude,
        selectedDestinationLongitude: selectedDestinationLongitude,
      };
      setRides((prevRides) => [...prevRides, newRide]);
    }
  }, [route.params]); // Update rides data when specific route params change
  const confirmDelete = () => {
    setRides((prevRides) =>
      prevRides.filter((ride) => ride.id !== rideIdToDelete)
    );
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    console.log("Deleted Ride");
  };
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

  const onCalloutPressed = () => {
    console.log("pressed");
  };

  return (
    <View style={styles.container}>
      <MapView
        use
        customMapStyle={mapCustomStyle}
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
        <Marker coordinate={desiredCoordinates}>
          <View style={{ width: 40, height: 40 }}>
            <Image
              source={require("../assets/Markers/start.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <Callout onPress={onCalloutPressed} tooltip>
            <CustomCallout
              title="Your Location"
              subtitle="Subtitle"
              link="YOUR_LINK_HERE"
            />
          </Callout>
        </Marker>
      </MapView>
      <RideList rides={rides} onDeleteRide={handleDeleteRide} />
      <ButtonContainer fetchDataById={fetchDataById} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete this ride?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelDelete}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Ensure RideList and MapView are positioned relative to container
  },
  map: {
    flex: 1, // Adjusted to occupy remaining space after RideList
    ...StyleSheet.absoluteFillObject, // Ensure MapView covers the entire container
  },
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
  calloutContainer: {
    backgroundColor: "transparent",
  },
});

export default MapViewComponent;
