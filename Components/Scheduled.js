import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const RideList = ({ rides, onDeleteRide }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rideData, setRideData] = useState(rides);
  const navigation = useNavigation();

  const renderRideItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRidePress(item)}>
      <View style={styles.rideItem}>
        {/* Left side: ride details */}
        <View style={styles.leftContainer}>
          <Text style={styles.rideName}>{item.rideName}</Text>
          <View style={styles.rideInfoContainer}>
            <Text style={styles.label}>Start Time:</Text>
            <Text numberOfLines={1} style={styles.rideInfo}>
              {item.rideDateTime}
            </Text>
          </View>
          <View style={styles.rideInfoContainer}>
            <Text style={styles.label}>From:</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.rideInfo}
            >
              {item.selectedAddress}
            </Text>
          </View>
          <View style={styles.rideInfoContainer}>
            <Text style={styles.label}>To:</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.rideInfo}
            >
              {item.selectedDestinationAddress}
            </Text>
          </View>
        </View>
        {/* Right side: yourName, numberOfRiders, and image */}
        <View style={styles.rightContainer}>
          <Image
            source={require("../assets/helmet.png")}
            style={styles.image}
          />
          <Text
            style={styles.additionalText}
          >{`yourName: ${item.yourName}`}</Text>
          <Text
            style={styles.additionalText}
          >{`numberOfRiders: ${item.numberOfRiders}`}</Text>
          <TouchableOpacity onPress={() => onDeleteRide(item.id)}>
            <Image
              source={require("../assets/trash.png")}
              style={{
                tintColor: "#fa837a",
                width: 25,
                height: 25,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const rideNow = () => {
    setModalVisible(false);
    navigation.navigate("MapviewNavigation", {
      rideId: selectedRide.rideId,
      rideName: selectedRide.rideName,
      rideDateTime: formatDate(selectedRide.rideDateTime),
      selectedAddress: selectedRide.selectedAddress,
      selectedDestinationAddress: selectedRide.selectedDestinationAddress,
      yourName: selectedRide.yourName,
      numberOfRiders: selectedRide.numberOfRiders,
      selectedStartLatitude: selectedRide.selectedStartLatitude,
      selectedStartLongitude: selectedRide.selectedStartLongitude,
      selectedDestinationLatitude: selectedRide.selectedDestinationLatitude,
      selectedDestinationLongitude: selectedRide.selectedDestinationLongitude,
    });
    console.log("rideName:", selectedRide.rideName);
    console.log("rideDateTime:", selectedRide.rideDateTime);
    console.log("selectedAddress:", selectedRide.selectedAddress);
    console.log(
      "selectedDestinationAddress:",
      selectedRide.selectedDestinationAddress
    );
    console.log("yourName:", selectedRide.yourName);
    console.log("numberOfRiders:", selectedRide.numberOfRiders);
    console.log("selectedStartLatitude:", selectedRide.selectedStartLatitude);
    console.log("selectedStartLongitude:", selectedRide.selectedStartLongitude);
    console.log(
      "selectedDestinationLatitude:",
      selectedRide.selectedDestinationLatitude
    );
    console.log(
      "selectedDestinationLongitude:",
      selectedRide.selectedDestinationLongitude
    );
  };

  const handleRidePress = (ride) => {
    setSelectedRide(ride);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduled Rides</Text>
      {rides.length === 0 ? (
        <Text style={styles.noRidesText}>
          No scheduled rides. Create a New Ride or Join an existing Ride to get
          started.
        </Text>
      ) : (
        <FlatList
          data={rides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
              {selectedRide ? selectedRide.rideName : ""}
            </Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Start Time:</Text>
              <Text style={styles.modalText}>
                {selectedRide ? selectedRide.rideDateTime : ""}
              </Text>
              <Text style={styles.modalLabel}>From:</Text>
              <Text style={styles.modalText}>
                {selectedRide ? selectedRide.selectedAddress : ""}
              </Text>
              <Text style={styles.modalLabel}>To:</Text>
              <Text style={styles.modalText}>
                {selectedRide ? selectedRide.selectedDestinationAddress : ""}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={rideNow}>
                <Text style={styles.buttonText}>Start Now</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
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
    maxHeight: "27%",
    backgroundColor: "rgba(55, 71, 91, 0.8)",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    marginTop: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ffffff",
    textAlign: "center",
  },
  rideItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  leftContainer: {
    flex: 1,
    paddingRight: 10,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  rideName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  rideInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#9ca5b3",
    marginRight: 5,
  },
  rideInfo: {
    fontSize: 14,
    color: "#ffffff",
    flexShrink: 1,
  },
  additionalText: {
    fontSize: 14,
    color: "#9ca5b3",
    marginBottom: 5,
  },
  image: {
    tintColor: "#CCCCCC",
    width: 40,
    height: 30,
    marginBottom: 10,
  },
  noRidesText: {
    color: "#bdbdbd",
    fontSize: 16,
    textAlign: "center",
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
    fontWeight: "bold",
    marginBottom: 20,
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

export default RideList;
