// AppNavigator.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, Button } from "react-native";
import MapViewComponent from "./Components/mapview";
import FormPage from "./Components/FormPage";
import FormPagetwo from "./Components/FormPagetwo";
import MapviewNav from "./Components/mapviewNavigation";
import LoginScreen from "./Components/LoginScreens/Login";
import SettingsScreen from "./Components/Settings";
import { AuthProvider, useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  const { isLoggedIn, logout } = useAuth();
  const signout = getAuth();
  signOut(signout)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MapViewComponent}
        options={{
          gestureEnabled: false,
          headerLeft: null,
          headerRight: () => (
            <Button onPress={() => signout()} title="Logout" color="#000" />
          ),
          headerShown: false,
          title: "Home",
        }}
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
      <Stack.Screen
        name="MapviewNavigation"
        component={MapviewNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <MyNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
