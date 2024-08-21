import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from './EmailForget';
import ResetPasswordForm from './ResetPasswordForm';
import { useFunctions } from '../useFunctions';

export default function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);

    const {
        sendOtp,
        verifyOtpForPasswordReset,
        resetPassword,
        resendForgetPasswordOtp,
    } = useFunctions();

    const handleSendOtp = async (email) => {
        try {
            await sendOtp(email);
            setError(null);
            setStep(2); // Go to next step
        } catch (error) {
            setError(error.message || 'Failed to send OTP');
        }
    };

    const handleVerifyOtp = async (email, otp) => {
        try {
            await verifyOtpForPasswordReset(email, otp);
            setError(null);
            setStep(3); // Go to next step
        } catch (error) {
            setError(error.message || 'Failed to verify OTP');
        }
    };

    const handleResetPassword = async (data) => {
        try {
            await resetPassword(data);
            setError(null);
            // Handle success (e.g., navigate to another screen or show a success message)
        } catch (error) {
            setError(error.message || 'Failed to reset password');
        }
    };

    const handleResendOtp = async (email) => {
        try {
            await resendForgetPasswordOtp(email);
            setError(null);
            // Reset the timer or handle resend logic
        } catch (error) {
            setError(error.message || 'Failed to resend OTP');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <EmailForget
                        onNext={() => setStep(2)}
                        onBack={() => setStep(1)}
                        sendOtp={handleSendOtp}
                        error={error}
                    />
                );
            case 2:
                return (
                    <OtpVerification
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)} // Back to EmailForget
                        verifyOtp={handleVerifyOtp}
                        resendOtp={handleResendOtp}
                        error={error}
                    />
                );
            case 3:
                return (
                    <ResetPasswordForm
                        onBack={() => setStep(2)} // Back to OtpVerification
                        resetPassword={handleResetPassword}
                        error={error}
                    />
                );
            default:
                return (
                    <EmailForget
                        onNext={() => setStep(2)}
                        onBack={() => setStep(1)}
                        sendOtp={handleSendOtp}
                        error={error}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>{renderStep()}</View>
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
