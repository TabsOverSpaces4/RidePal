import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const RideList = ({ rides }) => {
  const renderRideItem = ({ item }) => (
    <View style={styles.rideItem}>
      {/* Left side: ride details */}
      <View style={styles.leftContainer}>
        <Text style={styles.rideName}>{item.rideName}</Text>
        <View style={styles.rideInfoContainer}>
          <Text style={styles.label}>Start Time:</Text>
          <Text numberOfLines={1} style={styles.rideInfo}>{item.startTime}</Text>
        </View>
        <View style={styles.rideInfoContainer}>
          <Text style={styles.label}>From:</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.rideInfo}>{item.startingPoint}</Text>
        </View>
        <View style={styles.rideInfoContainer}>
          <Text style={styles.label}>To:</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.rideInfo}>{item.destination}</Text>
        </View>
      </View>
      {/* Right side: admin, riders, and image */}
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
      {rides.length === 0 ? (
        <Text style={styles.noRidesText}>No scheduled rides.
        Create a New Ride or Join an existing Ride to get started.</Text>

      ) : (
        <FlatList
          data={rides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
});

export default RideList;
