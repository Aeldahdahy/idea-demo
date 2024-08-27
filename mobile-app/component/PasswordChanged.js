import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const PasswordChanged = () => {
  const handleLoginPress = () => {
    Alert.alert("Login button pressed");
  };

  return (
    <View style={styles.passwordChanged}>
      <Image
        style={styles.passwordChangedChild}
        resizeMode="contain"
        source={require("../assets/successtick.png")}
      />
      <Text style={styles.passwordChangedText}>Password Changed!</Text>
      <Text style={styles.description}>
        Your password has been changed successfully.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordChanged: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: width * 0.05,
  },
  passwordChangedChild: {
    width: width * 0.5,  // 50% of the screen width
    height: width * 0.5,  // Maintains aspect ratio
    marginBottom: height * 0.05,  // Added more margin for spacing
  },
  passwordChangedText: {
    fontSize: width * 0.08,  // Larger font size for the title
    fontWeight: "800",
    textAlign: "center",
    marginBottom: height * 0.03,  // Increased margin for better spacing
    color: "#000",
  },
  description: {
    fontSize: width * 0.05,  // Slightly larger font size for description
    textAlign: "center",
    color: "#000",
    marginBottom: height * 0.05,  // More space before the button
    paddingHorizontal: width * 0.1,
  },
  button: {
    width: "90%",  // Increased button width
    backgroundColor: "#000080",
    paddingVertical: height * 0.015,  // Reduced button height for minimal top/bottom padding
    paddingHorizontal: width * 0.2,  // Increased padding for larger left and right borders
    borderRadius: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  loginText: {
    color: "#ffffff",
    fontSize: width * 0.05,  // Slightly larger font size for the button text
    fontWeight: "600",
  },
});

export default PasswordChanged;
