import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const RideList = ({ rides }) => {
  const renderRideItem = ({ item }) => (
    <View style={styles.rideItem}>
      <Text style={styles.rideName}>{item.name}</Text>
      <Text style={styles.rideInfo}>{`Start Time: ${item.startTime}`}</Text>
      <Text style={styles.rideInfo}>{`From: ${item.startingPoint}`}</Text>
      <Text style={styles.rideInfo}>{`To: ${item.destination}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduled Rides</Text>
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
	maxHeight:"25%",
    backgroundColor: "rgba(55, 71, 91, 0.8)",
    padding: 10,
    borderRadius: 10,
    margin: 10,
	marginTop:65,
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
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#FFFFFF",
  },
  rideItem: {
    marginBottom: 10,
    backgroundColor: "rgba(48, 67, 90, 1)",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333333",
  },
  rideName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  rideInfo: {
    fontSize: 14,
    color: "#CCCCCC",
  },
});

export default RideList;
