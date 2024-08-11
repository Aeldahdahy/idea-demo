import * as React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";


const { width } = Dimensions.get('window');

const LogIn = () => {

  const handleSignIn = () => {
    // Handle the sign-in logic here
    Alert.alert("Sign In", "Sign in logic here!");
  };

  const handleRegister = () => {
    // Handle the navigation to the registration screen here
    Alert.alert("Register", "Navigate to create account screen!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Let’s get you logged in!</Text>
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
        />
      </View>

    

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginButtonText}>Login</Text>
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

      <Text style={styles.registerText}>
        Don’t have an account?
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </Text>
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
