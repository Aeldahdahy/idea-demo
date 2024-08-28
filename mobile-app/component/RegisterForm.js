import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

export default function RegisterForm({ onNext, onBack, onSignIn, signUp }) {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identity, setIdentity] = useState('');
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'login'

  useEffect(() => {
    const getIdentity = async () => {
      try {
        const storedIdentity = await AsyncStorage.getItem('identity');
        if (storedIdentity) {
          setIdentity(storedIdentity);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load identity from storage');
      }
    };

    getIdentity();
  }, []);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const formData = {
      fullName,
      email,
      password,
      identity,
    };

    try {
      const userData = await signUp(formData);
      if(userData){
        onNext();
      }
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const handleRegister = () => {
    setActiveTab('register');
  };

  const handleLogin = () => {
    setActiveTab('login');
    onSignIn();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Let's get you registered!</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'register' ? styles.activeTab : styles.inactiveTab]} 
          onPress={handleRegister}
        >
          <Text style={styles.tabButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'login' ? styles.activeTab : styles.inactiveTab]} 
          onPress={handleLogin}
        >
          <Text style={styles.tabButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {activeTab === 'register' && (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/person.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
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
            <View style={styles.inputContainer}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/lock.png")}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or register with</Text>
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
    width: "80%", // Set tab container width to 80% of screen width
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
    backgroundColor: "#D9EFFF",
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
    width: "100%", // Ensure the scroll view takes full width
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  form: {
    width: '90%', // Set form width to 80% of the screen width
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  inputContainer: {
    width: '100%', // Set input container to 100% width of the form
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
    width: 24, // Adjusted icon size
    height: 24, // Adjusted icon size
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 55, // Increased height for better visibility
    paddingHorizontal: 16,
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_36xl,
    width: "100%", // Ensure button takes full width of its parent container
  },
  createAccountButton: {
    height: 55,
    marginTop: 20,
    borderRadius: 28,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorMidnightblue,
  },
  createAccountText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    textAlign: "center",
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
