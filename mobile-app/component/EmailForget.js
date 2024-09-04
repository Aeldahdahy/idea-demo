import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

export default function EmailForget({ onBack, loading, error, handleSendOtp, email, setEmail }) {

  const onNextPress = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }
    handleSendOtp(email);
  };

  return (
    <View style={styles.forgotPassword}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../assets/back-button White.png")}
          />
        </TouchableOpacity>
        <Text style={styles.forgotPassword1}>Forgot Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.footer}>
          <ImageBackground
            style={styles.ellipseIcon}
            resizeMode="cover"
            source={require("../assets/image-0.25.png")}
          >        
            <Image
              style={styles.bottomImage}
              resizeMode="contain"
              source={require("../assets/image-0.26.png")}
            />
          </ImageBackground>
        </View>

        <Text style={styles.description}>
          Please Enter Either Your Email Address or Phone Number to Proceed
        </Text>

        <View style={styles.mainContent}>
          <TextInput
            style={[styles.input, styles.shadowBox]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          {loading ? (
            <ActivityIndicator size="large" color={Color.colorMidnightblue} />
          ) : (
            <TouchableOpacity
              style={[styles.nextButton, styles.shadowBox]}
              onPress={onNextPress}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.backToLogin} onPress={onBack}>
            Back to Login
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Color.colorMidnightblue,
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: "20%",
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
  },
  backIcon: {
    width: 44,
    height: 41,
  },
  forgotPassword1: {
    fontSize: 30,
    fontFamily: FontFamily.bitterBold,
    color: Color.colorWhite,
    fontWeight: "700",
    marginLeft: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  mainContent: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 55,
    width: '100%',
    borderColor: Color.colorBlack,
    borderWidth: 1,
    borderRadius: Border.br_16xl,
    backgroundColor: Color.colorWhite,
    marginBottom: 20,
  },
  shadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  nextButton: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorMidnightblue,
    borderRadius: Border.br_16xl,
    marginVertical: 10,
  },
  nextText: {
    fontSize: FontSize.size_6xl,
    fontWeight: "600",
    fontFamily: FontFamily.signikaSemiBold,
    color: Color.colorWhite,
  },
  backToLogin: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  ellipseIcon: {
    width: width * 0.7,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.signikaBold,
    color: Color.colorBlack,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bottomImage: {
    width: width * 0.4,
    height: height * 0.2,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
