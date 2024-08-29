import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RegisterForm from './RegisterForm';
import Identity from './Identity';
import OtpVerification from './OtpVerification';
import Success from './Success';
import { useFunctions } from '../useFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ onSignIn }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectIdentity, setSelectIdentity] = useState(null);

    const {
        signUp,
        verifyOtp,
        resendOtp,
        loading,
        setLoading,
        setError,
        error,
    } = useFunctions();

    // Move to registration step with selected identity
    const handlePress = (identity) => {
        setSelectIdentity(identity);
        setStep(2);
    };

    // Handle account creation
    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = {
            fullName,
            email,
            password,
            selectIdentity,
        };

        try {
            await signUp(formData);
            setStep(3); // Move to OTP verification step
        } catch (error) {
            const errorMessage = error.message || 'Failed to create account';
            setError(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const otpCode = otp.join('');
            const response = await verifyOtp(email, otpCode);

            if (response.status === 200) {
                await AsyncStorage.removeItem('email');
                setStep(4); // Move to success screen
            } else {
                const errorMessage = response.data?.message || 'Failed to verify the OTP';
                setError(errorMessage);
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to verify the OTP';
            setError(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP resend
    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await resendOtp(email);
        } catch (error) {
            const errorMessage = 'Failed to resend OTP. Please try again.';
            setError(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Render component based on current step
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Identity
                        onBack={onSignIn}
                        selectIdentity={selectIdentity}
                        handlePress={handlePress}
                    />
                );
            case 2:
                return (
                    <RegisterForm
                        onSignIn={onSignIn}
                        setLoading={setLoading}
                        setError={setError}
                        loading={loading}
                        error={error}
                        setEmail={setEmail}
                        setFullName={setFullName}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        email={email}
                        fullName={fullName}
                        password={password}
                        confirmPassword={confirmPassword}
                        handleCreateAccount={handleCreateAccount}
                    />
                );
            case 3:
                return (
                    <OtpVerification
                        onBack={() => setStep(2)}
                        handleVerifyOtp={handleVerifyOtp}
                        handleResendOtp={handleResendOtp}
                        emailAddress={email}
                        otpPurpose="Verify your email for Sign Up"
                        loading={loading}
                        otp={otp}
                        setOtp={setOtp}
                    />
                );
            case 4:
                return (
                    <Success
                        onNext={onSignIn}
                        HeaderText="Registered successfully!"
                        SubText="Your account has been created successfully."
                        ButtonText="Sign-in"
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
