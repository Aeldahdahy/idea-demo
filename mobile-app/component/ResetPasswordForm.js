import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width, height } = Dimensions.get("window");

export default function ResetPasswordForm({ 
    onBack,
    loading,
    handleResetPassword,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
}) {

  const handleBackPress = () => {
    onBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.createNewPassword}>Create new password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mainIconWrapper}>
          <Image
            style={styles.groupIcon}
            resizeMode="cover"
            source={require("../assets/image-0.25.png")}
          />
          <Image
            style={styles.mainlock}
            resizeMode="cover"
            source={require("../assets/mainlock.png")}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image
              style={styles.lockIcon}
              resizeMode="cover"
              source={require("../assets/lock.png")}
            />
            <TextInput
              style={styles.textInput}
              placeholder="New Password"
              placeholderTextColor={Color.colorGray}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Image
              style={styles.eyeIcon}
              resizeMode="cover"
              source={require("../assets/eye.png")}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image
              style={styles.lockIcon}
              resizeMode="cover"
              source={require("../assets/lock.png")}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm New Password"
              placeholderTextColor={Color.colorGray}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Image
              style={styles.eyeIcon}
              resizeMode="cover"
              source={require("../assets/eye.png")}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleResetPassword} disabled={loading}>
          <Text style={styles.doneText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    paddingTop: height * 0.20,
    paddingHorizontal: width * 0.05,
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.20,
    backgroundColor: Color.colorMidnightblue,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    paddingHorizontal: width * 0.05,
    zIndex: 1,
  },
  scrollViewContent: {
    paddingBottom: height * 0.05,
  },
  backIcon: {
    width: width * 0.1,
    height: height * 0.05,
    marginRight: width * 0.05,
  },
  createNewPassword: {
    fontSize: width * 0.07,
    fontWeight: "700",
    fontFamily: FontFamily.bitter,
    color: Color.colorWhite,
  },
  mainIconWrapper: {
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  groupIcon: {
    width: width * 0.8,
    height: height * 0.35,
  },
  mainlock: {
    width: width * 0.35,
    height: height * 0.22,
    position: "absolute",
    top: height * 0.05,
  },
  inputContainer: {
    marginBottom: height * 0.05,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: Border.br_16xl,
    backgroundColor: Color.colorWhite,
  },
  lockIcon: {
    width: width * 0.06,
    height: height * 0.03,
    marginLeft: width * 0.02,
  },
  textInput: {
    flex: 1,
    height: height * 0.07,
    paddingHorizontal: width * 0.02,
  },
  eyeIcon: {
    width: width * 0.08,
    height: height * 0.03,
    marginRight: width * 0.02,
  },
  doneButton: {
    backgroundColor: Color.colorMidnightblue,
    borderRadius: Border.br_16xl,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  doneText: {
    fontSize: width * 0.06,
    fontWeight: "600",
    color: Color.colorWhite,
    fontFamily: FontFamily.signika,
  },
});
