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

const ButtonContainer = () => {
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

  const handleJoinRidePress = () => {
    toggleJoinRideModal();
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
              onValueChange={(itemValue, itemIndex) =>
                setNumberOfRiders(itemValue)
              }
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
                style={modalStyles.modalButton}
                onPress={handlePlanRide}
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
                onPress={toggleJoinRideModal}
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
		marginTop: 22,
		backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background color
	  },
	  modalView: {
		backgroundColor: "#242e4c",
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
	color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 19,
	color: "white",
    marginBottom: 5,
  },
  input: {
	fontSize: 16,
    height: 40,
    borderColor: "#f09142",
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
	color:"white",
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
    backgroundColor: "#f09142",
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
    backgroundColor: "rgba(55, 71, 91, 0.9)",
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
    backgroundColor: "#f09142",
  },
  joinRideButton: {
    backgroundColor: "#42bcf0",
  },
});

export default ButtonContainer;
