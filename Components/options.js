import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const ButtonContainer = ({ fetchDataById }) => {
  const navigation = useNavigation();
  const [isNewRideModalVisible, setIsNewRideModalVisible] = useState(false);
  const [isJoinRideModalVisible, setIsJoinRideModalVisible] = useState(false);
  const [rideName, setRideName] = useState("");
  const [yourName, setYourName] = useState("");
  const [numberOfRiders, setNumberOfRiders] = useState(2);

  const toggleNewRideModal = () => {
    setIsNewRideModalVisible(!isNewRideModalVisible);
  };

  const toggleJoinRideModal = () => {
    setIsJoinRideModalVisible(!isJoinRideModalVisible);
  };

  const handleNewRidePress = () => {
    toggleNewRideModal();
  };

  const updateRideData = async (id, rider) => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: rider }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Update successful", responseData);
        return responseData.message;
      } else {
        const responseData = await response.json();
        console.error("Update failed", response.status, response.statusText);
        return responseData.message;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return error.message;
    }
  };

  const handleJoinRidePress = () => {
    toggleJoinRideModal();
  };

  const handleJoinRideConfirm = async () => {
    const joinRideMessage = await updateRideData(rideName, yourName);
    console.log(joinRideMessage);

    // Fetch the updated ride data by RidePal code (rideName)
    await fetchDataById(rideName);

    toggleJoinRideModal();
    console.log(yourName, rideName);
  };

  const handlePlanRide = () => {
    console.log("User is trying to plan a ride");
    toggleNewRideModal();
    navigation.navigate("PlanYourRide", {
      rideName: rideName,
      yourName: yourName,
      numberOfRiders: numberOfRiders,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.newRideButton]}
        onPress={handleNewRidePress}
      >
        <Text style={styles.buttonText}>New Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.joinRideButton]}
        onPress={handleJoinRidePress}
      >
        <Text style={styles.buttonText}>Join Ride</Text>
      </TouchableOpacity>

      {/* Modal for New Ride */}
      <Modal visible={isNewRideModalVisible} transparent animationType="slide">
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>New Ride!</Text>
            <Text style={modalStyles.modalLabel}>Ride Name:</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Ride Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setRideName(text)}
              value={rideName}
            />
            <Text style={modalStyles.modalLabel}>Your Name:</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Your Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setYourName(text)}
              value={yourName}
            />
            <Text style={modalStyles.modalLabel}>Number of Riders:</Text>
            <Picker
              selectedValue={numberOfRiders}
              style={modalStyles.picker}
              onValueChange={(itemValue) => setNumberOfRiders(itemValue)}
            >
              {[...Array(29)].map((_, index) => (
                <Picker.Item
                  key={index}
                  label={`${index + 2}`}
                  value={index + 2}
                  color="white"
                />
              ))}
            </Picker>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={toggleNewRideModal}
              >
                <Text style={modalStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  modalStyles.modalButton,
                  (rideName === "" || yourName === "") && {
                    backgroundColor: "gray",
                  }, // Disable button if rideName or yourName is empty
                ]}
                onPress={handlePlanRide}
                disabled={rideName === "" || yourName === ""}
              >
                <Text style={modalStyles.modalButtonText}>Plan Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Join Ride */}
      <Modal visible={isJoinRideModalVisible} transparent animationType="slide">
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Join Ride!</Text>
            <Text style={modalStyles.modalLabel}>Your Name</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Your Name"
              onChangeText={(text) => setYourName(text)}
              value={yourName}
            />
            <Text style={modalStyles.modalLabel}>RidePal Code</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter RidePal Code"
              onChangeText={(text) => setRideName(text)}
              value={rideName}
            />
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={toggleJoinRideModal}
              >
                <Text style={modalStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={handleJoinRideConfirm}
              >
                <Text style={modalStyles.modalButtonText}>Join Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background color
  },
  modalView: {
    backgroundColor: "#16213E", // Background color
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    color: "#E7F6F2", // Text color
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 19,
    color: "#E7F6F2", // Text color
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: "#F05454", // Border color
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    color: "#E7F6F2", // Text color
  },
  picker: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  modalButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F05454", // Button color
  },
  modalButtonText: {
    color: "#E7F6F2", // Text color
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: "11%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#16213E", // Background color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: "50%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#E7F6F2", // Text color
    fontSize: 20,
    fontWeight: "bold",
  },
  newRideButton: {
    backgroundColor: "#F05454",
  },
  joinRideButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: '#F05454'
  },
});


export default ButtonContainer;
