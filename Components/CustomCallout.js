import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";

const CustomCallout = ({ title, subtitle, link }) => {
  const handleNavigate = () => {
    // Open the link using the Linking module
    console.log('Pressed')
    Linking.openURL(link);
  };
  return (
    <View style={styles.container}>
      <View style={styles.callout}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigate}
        >
          <Image
            source={require("../assets/Markers/end.png")} // Replace with your logo
            style={styles.logo}
          />
          <Text style={styles.buttonText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    paddingBottom: 4,
  },
  callout: {
    width: 220,
    padding: 15,
    backgroundColor: "#242e4c",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f69833", // Dark border color 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF", // White text color
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#CCCCCC", // Light gray text color
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default CustomCallout;
