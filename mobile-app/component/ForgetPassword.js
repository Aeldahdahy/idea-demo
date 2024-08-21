import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from "./EmailForget";
import ResetPasswordForm from "./ResetPasswordForm";


export default function ForgetPassword() {
    const [step, setStep] = useState(1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <EmailForget onNext={()=> setStep(2)} onBack={() => setStep(1)} />;
            case 2:
                return <OtpVerification onNext={() => setStep(3)} onBack={() => setStep(2)} />;
            case 3:
                return <ResetPasswordForm onNext={() => setStep(4)} onBack={() => setStep(3)} />;
            default:
                return <EmailForget onNext={() => setStep(2)} onBack={() => setStep(1)} />;
        }
    };



  return (
    <View style={styles.container}>{renderStep()}</View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
    }
});