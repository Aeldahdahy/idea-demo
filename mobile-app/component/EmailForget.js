import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmailForget({ onNext, onBack, sendOtp, setLoading, setError, loading, error }) {
  const [email, setEmail] = useState('');
  

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendOtp(email);
      await AsyncStorage.setItem('email', email);
      onNext(); 
    } catch (error) {
      setError(error.message || 'Failed to send OTP');
      Alert.alert("Error", error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.forgotPassword}>
      <View style={styles.forgotPasswordChild} />
      <Text style={styles.forgotPassword1}>Forgot Password</Text>

      <TouchableOpacity onPress={onBack}>
        <Image
          style={styles.forgotPasswordItem}
          resizeMode="cover"
          source={require("../assets/image-0.23.png")}
        />
      </TouchableOpacity>

      <TextInput
        style={[styles.forgotPasswordInner, styles.rectangleViewShadowBox]}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={[styles.rectangleView, styles.rectangleViewShadowBox]}
          onPress={handleSendOtp}
        >
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.backToLogin, styles.backToLoginFlexBox]} onPress={onBack}>
        Back to Login
      </Text>

      <Image
        style={styles.ellipseIcon}
        resizeMode="cover"
        source={require("../assets/image-0.25.png")}
      />
      <Text style={[styles.pleaseEnterEither, styles.backToLoginFlexBox]}>
        Please Enter Either Your Email Address or Phone Number to Proceed
      </Text>
      <Image
        style={styles.screenshot20240724At1012}
        resizeMode="cover"
        source={require("../assets/image-0.26.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  rectangleViewShadowBox: {
    height: 55,
    width: 333,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 49,
    position: "absolute",
  },
  backToLoginTypo: {
    fontFamily: FontFamily.signikaLight,
    fontWeight: "300",
  },
  backToLoginFlexBox: {
    height: 44,
    color: Color.colorBlack,
    justifyContent: "center",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  forgotPasswordChild: {
    top: 0,
    left: 0,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: "#163696",
    width: 430,
    height: 220,
    position: "absolute",
  },
  forgotPassword1: {
    top: 104,
    left: 52,
    fontSize: 30,
    fontFamily: FontFamily.bitterBold,
    width: 303,
    height: 50,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontWeight: "700",
    position: "absolute",
  },
  forgotPasswordItem: {
    top: 35,
    left: 30,
    width: 44,
    height: 41,
    position: "absolute",
  },
  forgotPasswordInner: {
    top: 654,
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  screenshot20240709At451: {
    top: 667,
    left: 75,
    width: 21,
    height: 28,
    position: "absolute",
  },
  emailOrPhone: {
    top: 670,
    left: 108,
    color: "rgba(0, 0, 0, 0.7)",
    width: 222,
    height: 25,
    fontSize: FontSize.size_xl,
    fontWeight: "300",
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    position: "absolute",
  },
  rectangleView: {
    top: 743,
    backgroundColor: Color.colorNavy,
    borderColor: Color.colorWhite,
  },
  next: {
    fontSize: FontSize.size_6xl,
    fontWeight: "600",
    fontFamily: FontFamily.signikaSemiBold,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
  },
  backToLogin: {
    top: 860,
    left: 78,
    textDecoration: "underline",
    width: 275,
    fontFamily: FontFamily.signikaLight,
    fontWeight: "300",
  },
  ellipseIcon: {
    top: 258,
    left: 89,
    width: 253,
    height: 245,
    position: "absolute",
  },
  pleaseEnterEither: {
    top: 562,
    left: 37,
    fontFamily: FontFamily.signikaBold,
    width: 357,
    fontWeight: "700",
    height: 44,
    color: Color.colorBlack,
  },
  screenshot20240724At1012: {
    top: 293,
    left: 147,
    width: 137,
    height: 175,
    position: "absolute",
  },
  forgotPassword: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
