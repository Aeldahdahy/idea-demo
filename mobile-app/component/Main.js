import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator  } from "react-native";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import { useFunctions } from "../useFunctions";
import PasswordChanged from "./PasswordChanged";



export default function Main() {
  const [step, setStep] = useState(1);

  const {
        setLoading,
        setError,
        loading,
        error,
  } = useFunctions();


  const renderStep = () => {
    switch (step){
      case 1:
        return(
          // <PasswordChanged />
          <SignIn onForgetPassword={() => {setStep(2)}} onSignUp={() => {setStep(3)}} /> 
        );
      case 2:
        return(
          <ForgetPassword onSignIn={() => {setStep(1)}} /> 
        );
      case 3:
        return(
          <SignUp onSignIn={() => {setStep(1)}} />
        );
    }
  }; 

  return (
    <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : renderStep() }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    containerText:{
        color: '#000',
    },
    name:{
      fontWeight:'bold',
      fontSize: 50,

    }
});