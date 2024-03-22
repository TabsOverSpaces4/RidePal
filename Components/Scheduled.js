import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const RideList = ({ rides }) => {
  const renderRideItem = ({ item }) => (
    <View style={styles.rideItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.rideName}>{item.rideName}</Text>
        <Text style={styles.rideInfo}>{`Start Time: ${item.startTime}`}</Text>
        <Text style={styles.rideInfo}>{`From: ${item.startingPoint}`}</Text>
        <Text style={styles.rideInfo}>{`To: ${item.destination}`}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={require("../assets/helmet.png")} style={styles.image} />
        <Text style={styles.additionalText}>{`Admin: ${item.admin}`}</Text>
        <Text style={styles.additionalText}>{`Riders: ${item.riders}`}</Text>
      </View>
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
});

export default RideList;
