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
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ButtonContainer = () => {
  const navigation = useNavigation();
  const [isNewRideModalVisible, setIsNewRideModalVisible] = useState(false);
  const [isJoinRideModalVisible, setIsJoinRideModalVisible] = useState(false);
  const [inputRideNameValue, setInputRideNameValue] = useState("");
  const [inputYourNameValue, setInputYourNameValue] = useState("");
  const [selectedRiders, setSelectedRiders] = useState(2);

  const toggleNewRideModal = () => {
    setIsNewRideModalVisible(!isNewRideModalVisible);
  };

  const toggleJoinRideModal = () => {
    setIsJoinRideModalVisible(!isJoinRideModalVisible);
  };

  const handleNewRidePress = () => {
    toggleNewRideModal();
    console.log("New Ride Pressed");
  };

  const handleJoinRidePress = () => {
    toggleJoinRideModal();
    console.log("Join Ride Pressed");
  };

  const handlePlanRide = () => {
    console.log("User is trying to plan a ride");
    toggleNewRideModal();
    navigation.navigate("Plan Your Ride");
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
              onChangeText={(text) => setInputRideNameValue(text)}
              value={inputRideNameValue}
            />
			<Text style={modalStyles.modalLabel}>Your Name:</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Your Name"
              onChangeText={(text) => setInputYourNameValue(text)}
              value={inputYourNameValue}
            />
            <Text style={modalStyles.modalLabel}>Number of Riders:</Text>
            <Picker
              selectedValue={selectedRiders}
              style={modalStyles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRiders(itemValue)
              }
            >
              {[...Array(29)].map((_, index) => (
                <Picker.Item
                  key={index}
                  label={`${index + 2}`}
                  value={index + 2}
                />
              ))}
            </Picker>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={handlePlanRide}
              >
                <Text style={modalStyles.modalButtonText}>Plan Ride</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={toggleNewRideModal}
              >
                <Text style={modalStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Join Ride */}
      <Modal visible={isJoinRideModalVisible} transparent animationType="slide">
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>
              Enter Ride Details to Join
            </Text>
            <Text style={modalStyles.modalLabel}>Your Name</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Your Name"
              onChangeText={(text) => setInputYourNameValue(text)}
              value={inputYourNameValue}
            />
            <Text style={modalStyles.modalLabel}>RidePal Code</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter RidePal Code"
              onChangeText={(text) => setInputRideNameValue(text)}
              value={inputRideNameValue}
            />
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={toggleJoinRideModal}
              >
                <Text style={modalStyles.modalButtonText}>Join Ride</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.modalButton}
                onPress={toggleJoinRideModal}
              >
                <Text style={modalStyles.modalButtonText}>Cancel</Text>
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
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
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
    backgroundColor: "#7397c9",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#37475c",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  newRideButton: {
    backgroundColor: "#1abc9c",
  },
  joinRideButton: {
    backgroundColor: "#3498db",
  },
});

export default ButtonContainer;
