import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const LocationList = ({ data }) => {
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(55, 71, 91, 0.8)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
	width: '100%',
    maxHeight: '30%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  distance: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
  },
});

export default LocationList;
