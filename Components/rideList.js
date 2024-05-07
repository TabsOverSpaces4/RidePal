import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Other Riders</Text>
      <TouchableOpacity onPress={onToggleFocus} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Toggle Focus</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(55, 71, 91, 0.8)",
    width: "100%",
    height:'30%',
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    padding: 16,
  },
  toggleButton: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFF",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#FFF",
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
    color: "#FFF",
  },
  distance: {
    fontSize: 14,
    color: "#CCC",
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default LocationList;
