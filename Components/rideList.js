import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../ThemeContext";
import { darkStyles, lightStyles } from "../themes";

const LocationList = ({ data, onToggleFocus }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.circle, { backgroundColor: item.color }]} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
    </View>
  );
  const { isDarkTheme, toggleTheme } = useTheme();
  const themeStyles = isDarkTheme ? darkStyles : lightStyles;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkTheme
        ? "rgba(22, 33, 62, 0.8)"
        : "rgba(255, 250, 230, 0.8)",
      width: "100%",
      height: "30%",
      position: "absolute",
      bottom: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      elevation: 4,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkTheme ? "#FFF" : "#272721",
      padding: 16,
    },
    toggleButton: {
      position: "absolute",
      top: 16,
      right: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 2,
      borderRadius: 20,
      borderColor: isDarkTheme ? "#FFF" : "#e76930",
    },
    toggleButtonText: {
      fontSize: 16,
      color: isDarkTheme ? "#FFF" : "#272721",
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#555",
    },
    circle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkTheme ? "#FFF" : "#272721",
    },
    distance: {
      fontSize: 14,
      color: isDarkTheme ? "#CCC" : "#4c4c47",
      marginTop: 4,
    },
    listContent: {
      paddingBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Other Riders</Text>
      <TouchableOpacity onPress={onToggleFocus} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Toggle Focus</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default LocationList;
