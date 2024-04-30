import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomCallout = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.callout}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
	paddingBottom:4,
  },
  callout: {
    width: 220,
    padding: 15,
    backgroundColor: '#242e4c', 
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f69833', // Dark border color
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF', // White text color
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#CCCCCC', // Light gray text color
  },
});

export default CustomCallout;
