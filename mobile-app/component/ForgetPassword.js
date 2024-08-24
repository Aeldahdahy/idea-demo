import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from './EmailForget';
import ResetPasswordForm from './ResetPasswordForm';
import { useFunctions } from '../useFunctions';

export default function ForgetPassword() {
    const [step, setStep] = useState(1);

    const {
        sendOtp,
        verifyOtpForPasswordReset,
        resetPassword,
        resendForgetPasswordOtp,
        setLoading,
        setError,
        loading,
        error,
    } = useFunctions();



    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <EmailForget
                        onNext={() => setStep(2)} 
                        onBack={() => {}}
                        sendOtp={sendOtp}
                        setLoading={setLoading}
                        setError={setError}
                        loading={loading}
                        error={error}
                    />
                );
            case 2:
                return (
                    <OtpVerification
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)} // Back to EmailForget
                        verifyOtpForPasswordReset={verifyOtpForPasswordReset}
                        resendForgetPasswordOtp={resendForgetPasswordOtp}
                        setLoading={setLoading}
                        setError={setError}
                        loading={loading}
                        error={error}
                    />
                );
            case 3:
                return (
                    <ResetPasswordForm
                    onNext={() => setStep(1)} 
                    onBack={() => {}}
                    resetPassword={resetPassword}
                    setLoading={setLoading}
                    setError={setError}
                    loading={loading}
                    error={error}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : renderStep()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
