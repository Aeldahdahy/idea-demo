import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator  } from "react-native";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import { useFunctions } from "../useFunctions";
import { Color } from "../GlobalStyles";




export default function Main() {
  const [step, setStep] = useState(1);

  const {
        loading,
  } = useFunctions();


  const renderStep = () => {
    switch (step){
      case 1:
        return(
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
        {loading ? <ActivityIndicator size="large" color={Color.colorMidnightblue} /> : renderStep() }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Color.colorWhite,
    },
    containerText:{
        color: Color.colorBlack,
    },
    name:{
      fontWeight:'bold',
      fontSize: 50,

    }
});