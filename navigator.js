import * as React from "react";
import MapViewComponent from "./Components/mapview";
import FormPage from "./Components/FormPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MapViewComponent}
		options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Plan Your Ride"
        component={FormPage} 
		options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MyNavigator />
    </NavigationContainer>
  );
}