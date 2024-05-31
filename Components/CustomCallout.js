import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useTheme } from "../ThemeContext";
import { darkStyles, lightStyles } from "../themes";

const CustomCallout = ({ title, subtitle, link }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const Styles = isDarkTheme ? darkStyles : lightStyles;
  const handleNavigate = () => {
    // Open the link using the Linking module
    console.log("Pressed");
    Linking.openURL(link);
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
      backgroundColor: isDarkTheme ? "#242e4c" : "#dadbb9",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: isDarkTheme ? "#f69833" : "#e76930", // Dark border color
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
      color: isDarkTheme ? "#FFFFFF" : "#272721", // White text color
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      color: isDarkTheme ? "#CCCCCC" : "#4c4c47", // Light gray text color
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
      color: isDarkTheme ? "#FFFFFF" : "black",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.callout}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
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

export default CustomCallout;
