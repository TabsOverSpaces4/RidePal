import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { useAuth } from "../../AuthContext";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GoogleIcon from "../../assets/google.png"; // Replace with your Google icon path
import AppleIcon from "../../assets/apple.png";
import { FIREBASE_AUTH } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const { login } = useAuth();
  const navigation = useNavigation();
  const [welcomeText, setWelcomeText] = useState("");
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

  const handleLogin = (provider) => {
    if (username && password) {
      login();
      navigation.replace("Home"); // Use replace instead of navigate
    } else {
      alert("Please enter valid credentials");
    }
  };

  const translateY = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Adjust these values to control the hover distance
  });

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign up failed:", error.message);
    }
  };

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(response);
      login();
      navigation.replace("Home"); // Use replace instead of navigate
    } catch (error) {
      console.log(error);
      alert("Sign in failed:", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.inner}>
        <Animated.Image
          source={require("../../assets/RideRight.png")}
          style={[styles.logo, { transform: [{ translateY }] }]}
        />
        <Text style={styles.welcomeTitle}>{welcomeText}</Text>
        <Text style={styles.title}>Login Or SignUp</Text>
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
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.ssoContainer}>
          <TouchableOpacity
            style={[styles.ssoButton, styles.googleButton]}
            onPress={() => handleLogin("google")}
          >
            <View style={styles.ssoButtonContent}>
              <Image source={GoogleIcon} style={styles.ssoIcon} />
              <Text style={styles.ssoButtonText}>Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ssoButton, styles.appleButton]}
            onPress={() => handleLogin("apple")}
          >
            <View style={styles.ssoButtonContent}>
              <Image source={AppleIcon} style={styles.ssoIcon} />
              <Text style={styles.ssoButtonText}>Apple</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dadbb9",
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
    color: "#272721",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#272721",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#272721",
    color: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: "#e76930",
    paddingVertical: 15,
    borderRadius: 25,
    width: "60%",
    alignItems: "center",
    shadowColor: "#e76930",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#272721",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#272721",
    fontWeight: "500",
  },
  ssoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ssoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  ssoButtonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ssoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButton: {
    backgroundColor: "#eb9449",
    shadowColor: "#eb9449",
  },
  appleButton: {
    backgroundColor: "#000",
    shadowColor: "#000",
  },
  ssoButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
