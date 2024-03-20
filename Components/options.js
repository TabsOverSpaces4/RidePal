import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Button as RNButton,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Corrected import
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ButtonContainer = () => {
  const navigation = useNavigation();
  const [isNewRideModalVisible, setIsNewRideModalVisible] = useState(false);
  const [isJoinRideModalVisible, setIsJoinRideModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
    navigation.navigate("Form"); // Navigate to the form page
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleNewRidePress}
        style={styles.button}
      >
        New Ride
      </Button>
      <Button
        mode="contained"
        onPress={handleJoinRidePress}
        style={styles.button}
      >
        Join Ride
      </Button>

      {/* Modal for New Ride */}
      <Modal visible={isNewRideModalVisible} transparent animationType="slide">
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Enter New Ride Details</Text>
            <Text style={modalStyles.modalLabel}>Ride Name:</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter Ride Name"
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
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
              <RNButton title="Plan Ride" onPress={handlePlanRide} />
              <RNButton title="Cancel" onPress={toggleNewRideModal} />
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
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
            />
            <Text style={modalStyles.modalLabel}>RidePal Code</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter RidePal Code"
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
            />
            <View style={modalStyles.buttonContainer}>
              <RNButton title="Join Ride" onPress={toggleJoinRideModal} />
              <RNButton title="Cancel" onPress={toggleJoinRideModal} />
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
    width: "100%",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
    opacity: 1,
  },
});

export default ButtonContainer;
