import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Switch as PaperSwitch,
  TouchableRipple,
  Divider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "../ThemeContext"; // Adjust import as necessary
import { darkStyles, lightStyles } from "../themes"; // Adjust import as necessary

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = isDarkTheme ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-left"
            size={25}
            color={isDarkTheme ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                John Doe
              </Title>
              <Caption style={styles.caption}>johndoe@example.com</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon
              name="trophy-outline"
              color={isDarkTheme ? "#ffffff" : "#000000"}
              size={20}
            />
            <Text style={styles.rideScoreText}>Ride Score: 85</Text>
          </View>
        </View>
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>Preferences</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                name="theme-light-dark"
                color={isDarkTheme ? "#ffffff" : "#000000"}
                size={25}
              />
              <View style={styles.themeToggle}>
                <Text style={styles.menuItemText}>Dark Mode</Text>
                <PaperSwitch value={isDarkTheme} onValueChange={toggleTheme} />
              </View>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              /* Handle About Us action */
            }}
          >
            <View style={styles.menuItem}>
              <Icon
                name="information-outline"
                color={isDarkTheme ? "#ffffff" : "#000000"}
                size={25}
              />
              <Text style={styles.menuItemText}>About Us</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              /* Handle Delete Account action */
            }}
          >
            <View style={styles.menuItem}>
              <Icon
                name="account-remove-outline"
                color={isDarkTheme ? "#ffffff" : "#000000"}
                size={25}
              />
              <Text style={styles.menuItemText}>Delete Account</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              /* Handle Log out action */
            }}
          >
            <View style={styles.menuItem}>
              <Icon
                name="logout"
                color={isDarkTheme ? "#ffffff" : "#000000"}
                size={25}
              />
              <Text style={styles.menuItemText}>Log out</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
