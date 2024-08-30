import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Color } from "../GlobalStyles";


const { width, height } = Dimensions.get("window");


export default function Success({
  onNext,
  HeaderText,
  SubText,
  ButtonText,
}) {
  const handleLoginPress = () => {
    onNext();
  };

  return (
    <View style={styles.passwordChanged}>
      <Image
        style={styles.passwordChangedChild}
        resizeMode="contain"
        source={require("../assets/successtick.png")}
      />
      <Text style={styles.passwordChangedText}>{HeaderText}</Text>
      <Text style={styles.description}>
       {SubText}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.loginText}>{ButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordChanged: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
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
    color: Color.colorBlack,
  },
  description: {
    fontSize: width * 0.05,  // Slightly larger font size for description
    textAlign: "center",
    color: Color.colorBlack,
    marginBottom: height * 0.05,  // More space before the button
    paddingHorizontal: width * 0.1,
  },
  button: {
    width: "90%",  // Increased button width
    backgroundColor: Color.colorMidnightblue,
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
    color: Color.colorWhite,
    fontSize: width * 0.05,  // Slightly larger font size for the button text
    fontWeight: "600",
  },
});
