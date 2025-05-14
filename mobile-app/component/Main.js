import React, { useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import { useFunctions } from "../useFunctions";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

export default function Main() {
  const [step, setStep] = useState(3); // Start with SignUp
  const { loading } = useFunctions();
  const webViewRef = useRef(null); // Reference to WebView

  const handleWebViewMessage = async (event) => {
    try {
      const message = event.nativeEvent.data;

      // Check if message is a string (e.g., "navigateToSignUp")
      if (message === "navigateToSignUp") {
        setStep(1);
        return;
      }

      // Otherwise, assume JSON (e.g., { action: "logout" })
      const parsedMessage = JSON.parse(message); // Parse the JSON message

      if (parsedMessage.action === "logout") {
        // Clear AsyncStorage (e.g., auth token, user data)
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userFullName");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("hasAccessedPortal");

        // Clear WebView data
        if (webViewRef.current) {
          // Clear cache (including local storage and session storage)
          webViewRef.current.clearCache?.(true);
          // Clear cookies
          webViewRef.current.clearCookies?.(() => {
            console.log("Cookies cleared");
          });
          // Optionally reload WebView to ensure clean state
          webViewRef.current.reload();
        }

        // Navigate to SignIn screen
        setStep(3);
      }
    } catch (error) {
      console.warn("WebView message error: ", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignUp onSignIn={() => setStep(3)} />;
      case 2:
        return <ForgetPassword onSignIn={() => setStep(3)} />;
      case 3:
        return (
          <View style={{ flex: 1, width: "100%", paddingTop: 40 }}>
            <WebView
              ref={webViewRef}
              // source={{ uri: "http://192.168.1.26:7020/#/client-portal/clientSignForm" }}
              source={{ uri: "https://idea-venture.agency/idea-demo/#/client-portal/clientSignForm" }}
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
              onMessage={handleWebViewMessage}
            />
          </View>
        );
      default:
        return <SignUp onSignIn={() => setStep(1)} />;
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