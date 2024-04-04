import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonContainer from "./options";
import { StyleSheet, View } from "react-native";
import RideList from "./Scheduled";
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
  const desiredCoordinates = { latitude: 12.934443, longitude: 77.682991 };
  const markerTitle = "Your Location";

  useEffect(() => {
    // Effect to fetch rides data from server
    const fetchRides = async () => {
      try {
        const response = await axios.get(config.mongoLink + "/Rides/Rides"); // Append the collection name to the MongoDB connection string
        console.log("Rides:", response);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides(); // Call fetchRides function when component mounts
  }, []);

  const {
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
        id: rides.length + 1, // Generate unique ID for the new ride
        rideName: rideName,
        startTime: formatDate(rideDateTime),
        startingPoint: selectedAddress,
        destination: selectedDestinationAddress,
        admin: yourName,
        riders: numberOfRiders,
        selectedStartLatitude: selectedStartLatitude,
        selectedStartLongitude: selectedStartLongitude,
        selectedDestinationLatitude: selectedDestinationLatitude,
        selectedDestinationLongitude: selectedDestinationLongitude,
      };
      setRides((prevRides) => [...prevRides, newRide]); // Add new ride to rides state
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
    setRides((prevRides) => prevRides.filter((ride) => ride.id !== id));
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
        <Marker coordinate={desiredCoordinates} title={markerTitle} />
        {/* Marker for selectedAddress */}
        {/* <Marker coordinate={{ latitude: selectedAddress.latitude, longitude: selectedAddress.longitude }} title="Selected Address" /> */}
        {/* Marker for selectedDestinationAddress */}
        {/* <Marker coordinate={{ latitude: selectedDestinationAddress.latitude, longitude: selectedDestinationAddress.longitude }} title="Selected Destination Address" /> */}
      </MapView>
      <RideList rides={rides} onDeleteRide={handleDeleteRide} />
      <ButtonContainer />
    </View>
  );
};
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://guptaharsh2401:DWXOX5g2Ruw9QA0I@ridingdata.ulmej8e.mongodb.net/?retryWrites=true&w=majority&appName=RidingData";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
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

export default MapViewComponent;
