import React, { createRef } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

export default function OtpVerification({
  onBack,
  handleVerifyOtp,
  handleResendOtp,
  email,
  otpPurpose,
  loading,
  otp,
  setOtp,
}) {
  // Create refs for each input
  const inputRefs = otp.map(() => createRef());

  const handleInputChange = (index, value) => {
    if (value === '') {
      // Handle backspace
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      // Move focus to the previous input if any
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
      return;
    }

    if (/^[0-9]$/.test(value)) {
      // Update OTP state
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if any
      if (index < otp.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{otpPurpose}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.ellipseImage}
            resizeMode="cover"
            source={require('../assets/image-0.25.png')}
          >
            <Image
              style={styles.mobileImage}
              resizeMode="cover"
              source={require('../assets/mobile.png')}
            />
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.verifyYourEmail}>{otpPurpose}</Text>
          <Text style={styles.pleaseEnterThe}>
            Please Enter The 4 Digit Code Sent To {email}
          </Text>

          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.inputBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleInputChange(index, value)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && !digit) {
                    // Move focus to the previous input if backspace is pressed
                    if (index > 0) {
                      inputRefs[index - 1].current.focus();
                    }
                  }
                }}
              />
            ))}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={Color.colorMidnightblue} style={styles.loading} />
          ) : (
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
              <View style={styles.verifyButtonContent}>
                <Text style={styles.verify}>Verify</Text>
              </View>
            </TouchableOpacity>
          )}

          <Text style={styles.didntReceiveOtpContainer}>
            <Text style={styles.didntReceiveOtp}>Didn’t receive OTP? </Text>
            <Text style={styles.resendCode} onPress={handleResendOtp}>Resend code</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: Color.colorMidnightblue,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: "20%",
  },
  headerText: {
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.bitterBold,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 20,
  },
  verifyYourEmail: {
    fontSize: 30,
    fontFamily: FontFamily.bitterBold,
    fontWeight: '700',
    color: Color.colorWhite,
    textAlign: 'center',
    marginBottom: -50,
  },
  pleaseEnterThe: {
    fontSize: 23,
    fontFamily: FontFamily.signikaBold,
    fontWeight: '700',
    color: Color.colorBlack,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '80%',
  },
  inputBox: {
    width: 50,
    height: 50,
    backgroundColor: Color.colorLightGray,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    borderColor: Color.colorGray_Black_800,
    borderWidth: 1,
  },
  verifyButton: {
    width: 333,
    height: 55,
    borderRadius: 35,
    backgroundColor: Color.colorMidnightblue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 30,
  },
  verifyButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  verify: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: FontFamily.signikaSemiBold,
    color: Color.colorWhite,
  },
  didntReceiveOtp: {
    fontWeight: '300',
    fontFamily: FontFamily.signikaLight,
  },
  resendCode: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  didntReceiveOtpContainer: {
    fontSize: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 245,
    marginTop: 30,
  },
  ellipseImage: {
    width: 253,
    height: 245,
  },
  mobileImage: {
    width: 173,
    height: 207,
    position: 'absolute',
    bottom: 0,
    left: 35,
  },
});
