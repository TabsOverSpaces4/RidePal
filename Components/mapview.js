import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

import { StyleSheet, View } from "react-native";

export default function MapViewComponent() {
  const desiredCoordinates = { latitude: 12.934443, longitude: 77.682991 };
  const markerTitle = "Your Location";

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        followsUserLocation={true}
        userInterfaceStyle="dark"
        style={styles.map}
        initialRegion={{
          latitude: desiredCoordinates.latitude,
          longitude: desiredCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={desiredCoordinates} title={markerTitle} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
