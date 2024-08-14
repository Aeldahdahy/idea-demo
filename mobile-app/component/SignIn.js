import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";
import { useFunctions } from "../useFunctions";

const { width } = Dimensions.get('window');

const LogIn = () => {
  const { signIn } = useFunctions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await signIn({ email, password });
      Alert.alert("Success", "You have successfully signed in!");
      // Navigate to the next screen if needed
    } catch (error) {
      // Show the error message from the sign-in function
      Alert.alert("Error", error.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Handle the navigation to the registration screen here
    Alert.alert("Register", "Navigate to create account screen!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Let's get you logged in!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/mail.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          placeholderTextColor="#7A7A7A"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/password.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#7A7A7A"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <Text style={styles.orLoginWith}>Or login with</Text>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity>
          <Image
            style={styles.socialIcon}
            source={require("../assets/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialIcon}
            source={require("../assets/facebook.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Don't have an account?
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}> Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#163696",
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "Bitter-Bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D1D1",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    width: width * 0.85,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: "Signika-Regular",
    fontSize: 16,
    color: "#7A7A7A",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#7A7A7A",
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: "underline",
    fontFamily: "Signika-Regular",
  },
  loginButton: {
    backgroundColor: "#0029a4",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: width * 0.85,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Signika-Bold",
  },
  orLoginWith: {
    textAlign: "center",
    color: "#7A7A7A",
    fontSize: 14,
    marginVertical: 10,
    fontFamily: "Signika-Regular",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.5,
    marginVertical: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#7A7A7A",
    fontSize: 14,
    fontFamily: "Signika-Regular",
  },
  registerLink: {
    textDecorationLine: "underline",
    fontFamily: "Signika-Bold",
    color: "#0029a4",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default LogIn;
