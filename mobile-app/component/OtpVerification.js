import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Border, FontFamily, Color } from '../GlobalStyles';

export default function OtpVerification({
  onBack,
  handleVerifyOtp,
  handleResendOtp,
  emailAddress,
  otpPurpose,
  loading,
  otp,
  setOtp,
}) {

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.verifyForgotPasswordEmai}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Image
          style={styles.backArrow}
          resizeMode="cover"
          source={require('../assets/Group39.png')}
        />
      </TouchableOpacity>

      <View style={[styles.verifyForgotPasswordEmaiChild, styles.childPosition]} />

      <Text style={[styles.verifyYourEmail, styles.verifyFlexBox]}>
        {otpPurpose}
      </Text>
      <Text style={[styles.pleaseEnterThe, styles.pleaseEnterTheFlexBox]}>
        Please Enter The 4 Digit Code Sent To {emailAddress}
      </Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleInputChange(index, value)}
          />
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Color.colorMidnightblue} />
      ) : (
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
          <View style={styles.verifyButtonContent}>
            <Text style={styles.verify}>Verify</Text>
          </View>
        </TouchableOpacity>
      )}

      <Text style={[styles.didntReceiveOtpContainer, styles.pleaseEnterTheFlexBox]}>
        <Text style={styles.didntReceiveOtpContainer1}>
          <Text style={styles.didntReceiveOtp}>{`Didn't receive OTP? `}</Text>
          <Text style={[styles.resendCode, styles.resendCodeTypo]} onPress={handleResendOtp}>
            Resend code
          </Text>
        </Text>
      </Text>

      <View style={[styles.vectorParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          resizeMode="cover"
          source={require('../assets/Ellipse6.png')}
        />
        <Image
          style={styles.screenshot20240723At1055}
          resizeMode="cover"
          source={require('../assets/mobile.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backArrow: {
    top: 35,
    left: 10,
    width: 44,
    height: 41,
    position: 'absolute',
  },
  childPosition: {
    left: 0,
    top: 0,
  },
  verifyFlexBox: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    color: Color.colorWhite,
    justifyContent: 'center',
    position: 'absolute',
  },
  pleaseEnterTheFlexBox: {
    height: 44,
    color: Color.colorBlack,
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    position: 'absolute',
  },
  resendCodeTypo: {
    fontFamily: FontFamily.signikaBold,
    fontWeight: '700',
  },
  groupChildLayout: {
    height: 245,
    width: 253,
    position: 'absolute',
  },
  verifyForgotPasswordEmaiChild: {
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: Color.colorMidnightblue,
    width: 430,
    height: 220,
    position: 'absolute',
  },
  verifyYourEmail: {
    top: 102,
    left: 23,
    fontSize: 30,
    fontFamily: FontFamily.bitterBold,
    width: 303,
    height: 50,
    justifyContent: 'center',
    fontWeight: '700',
    display: 'flex',
    textAlign: 'center',
    color: Color.colorWhite,
  },
  pleaseEnterThe: {
    top: 550,
    left: 43,
    fontSize: 23,
    width: 345,
    fontFamily: FontFamily.signikaBold,
    fontWeight: '700',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    position: 'absolute',
    top: 600, // Adjusted top to place it above the verify button
    left: 40, // Center the inputs horizontally
    width: '80%', // Adjust width to fit all input boxes
  },
  inputBox: {
    width: 50,
    height: 50,
    backgroundColor: Color.colorLightGray,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    borderColor: Color.colorGray_100,
    borderWidth: 1,
  },
  verifyButton: {
    top: 730, // Adjusted top to place it below the input buttons
    left: 45,
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
    position: 'absolute',
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
    textDecoration: 'underline',
  },
  didntReceiveOtpContainer1: {
    width: '100%',
  },
  didntReceiveOtpContainer: {
    top: 870,
    left: 82,
    fontSize: 20,
    width: 277,
  },
  groupChild: {
    left: 0,
    top: 0,
  },
  screenshot20240723At1055: {
    top: 19,
    left: 35,
    width: 173,
    height: 207,
    position: 'absolute',
  },
  vectorParent: {
    top: 255,
    left: 89,
  },
 
  verifyForgotPasswordEmai: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: 'hidden',
    width: '100%',
  },
});
