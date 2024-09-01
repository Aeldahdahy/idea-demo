import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import { useFunctions } from "../useFunctions";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

export default function SignInForm({ onSignIn, onSignUp, onForgetPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const { signIn, loading, setLoading, setError } = useFunctions();

  const handleSignIn = async () => {
    if (!email || !password) {
      const errorMessage = 'Please enter both email and password.';
      setError(errorMessage);
      Alert.alert('Input Error', errorMessage);
      return;
    }
  
    const formData = { email, password };
    
    setLoading(true);
    setError(null);
  
    try {
      const result = await signIn(formData);
      
      if (result.success) {
          const userFullName = await AsyncStorage.getItem('userFullName');
          if (userFullName) {
              Alert.alert('Welcome', `Welcome ${userFullName}`);
          } else {
              const errorMessage = 'Failed to retrieve user name. Please try again.';
              setError(errorMessage);
              Alert.alert('Error', errorMessage);
          }
      } else {
          const errorMessage = result.message || 'Failed to sign in. Please check your credentials and try again.';
          setError(errorMessage);
          Alert.alert('Sign-In Error', errorMessage);
      }
  } catch (error) {
      console.error("Sign-In Error:", error);

      const errorMessage = error.message || 'An unexpected error occurred. Please check your connection and try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
  } finally {
      setLoading(false);
  }
  };
  
  

  const handleRegister = () => {
    setActiveTab('register');
    onSignUp();
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login to your account!</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'login' ? styles.activeTab : styles.inactiveTab]} 
          onPress={() => handleTabSwitch('login')}
        >
          <Text style={styles.tabButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'register' ? styles.activeTab : styles.inactiveTab]} 
          onPress={handleRegister}
        >
          <Text style={styles.tabButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {activeTab === 'login' && (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/mail.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/lock.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleSignIn} 
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Signing in...' : 'Login'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgetPassword}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.socialIcons}>
              <Image style={styles.socialIcon} resizeMode="cover" source={require("../assets/google.png")} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  header: {
    backgroundColor: Color.colorMidnightblue,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    height: "20%",
  },
  headerText: {
    top: "50%",
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.bitterBold,
  },
  tabContainer: {
    height: 60,
    width: "80%", 
    marginTop: -45,
    marginBottom: "5%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.colorWhite,
    borderRadius: Border.br_120xl_5,
    backgroundColor: Color.colorGainsboro,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Border.br_120xl_5,
  },
  activeTab: {
    backgroundColor: Color.colorLightBlue,
    borderColor: Color.colorWhite,
    borderWidth: 1,
  },
  tabButtonText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
    width: "100%", 
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  form: {
    width: '90%', 
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center', 
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: Border.br_36xl,
    borderColor: Color.colorGray_100,
    backgroundColor: Color.colorWhite,
  },
  icon: {
    width: 24, 
    height: 24,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 55, 
    paddingHorizontal: 16,
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_36xl,
    width: "100%", 
  },
  loginButton: {
    height: 55,
    marginTop: 20,
    borderRadius: 28,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorMidnightblue,
  },
  loginButtonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  forgotPassword: {
    textAlign: "center",
    color: Color.colorGray_100,
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: "underline",
    fontFamily: FontFamily.signikaRegular,
  },
  orText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  socialIcons: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
  },
  socialIcon: {
    width: 33,
    height: 33,
    marginHorizontal: 8,
  },
});
