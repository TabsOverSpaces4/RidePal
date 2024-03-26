import * as React from "react";
import MapViewComponent from "./Components/mapview";
import FormPage from "./Components/FormPage";
import FormPagetwo from "./Components/FormPagetwo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

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
        name="PlanYourRide"
        component={FormPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Destination Page"
        component={FormPagetwo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light    -content" />
      <MyNavigator />
    </NavigationContainer>
  );
}
