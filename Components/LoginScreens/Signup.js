import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Animated, Easing } from "react-native";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();
  const [welcomeText, setWelcomeText] = useState('');
  const fullText = "WELCOME TO RIDERIGHT";
  const index = useRef(0);
  const logoAnimation = useRef(new Animated.Value(0)).current;
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeText((prev) => prev + fullText[index.current]);
      index.current += 1;
    }, 150); // Speed of typing

    if (index.current === fullText.length) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [welcomeText]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [logoAnimation]);

  const handleLogin = () => {
    if (username && password) {
      login();
      navigation.navigate("Home");
    } else {
      alert('Please enter valid credentials');
    }
  };

  const translateY = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Adjust these values to control the hover distance
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.inner}>
        <Animated.Image 
          source={require('../../assets/RideRight.png')} 
          style={[styles.logo, { transform: [{ translateY }] }]} 
        />
        <Text style={styles.welcomeTitle}>{welcomeText}</Text>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5b493",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 19,
    fontWeight: "500",
    color: '#081315',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#081315",
    color: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#f09142',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: "#f09142",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
