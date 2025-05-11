import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import { useFunctions } from "../useFunctions";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

export default function Main() {
  const [step, setStep] = useState(1);

  const { loading } = useFunctions();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignIn
            onForgetPassword={() => setStep(2)}
            onSignUp={() => setStep(3)}
            onViewWebsite={() => setStep(4)}
          />
        );
      case 2:
        return <ForgetPassword onSignIn={() => setStep(1)} />;
      case 3:
        return <SignUp onSignIn={() => setStep(1)} />;
      case 4:
        return (
          <View style={{ flex: 1, width: "100%" }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(1)}
            >
              <Text style={styles.backButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
            <WebView
              source={{ uri: "https://idea-venture.agency" }}
              style={{ flex: 1 }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                Alert.alert(
                  "Error",
                  "Failed to load the website. Please check your internet connection."
                );
                console.warn("WebView error: ", nativeEvent);
              }}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator
                  size="large"
                  color={Color.colorMidnightblue}
                  style={{ flex: 1 }}
                />
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Color.colorMidnightblue} />
      ) : (
        renderStep()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  backButton: {
    height: 55,
    margin: 16,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorGainsboro,
  },
  backButtonText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  containerText: {
    color: Color.colorBlack,
  },
  name: {
    fontWeight: "bold",
    fontSize: 50,
  },
});