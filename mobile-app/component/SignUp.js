import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RegisterForm from './RegisterForm';
import Identity from './Identity';
import OtpVerification from './OtpVerification';
import Success from './Success';
import { useFunctions } from '../useFunctions';
import { Color } from '../GlobalStyles';

export default function SignUp({ onSignIn }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState("");

    const formData = {
        email,
        role,
        fullName,
        password,
    };

    const {
        signUp,
        verifyOtp,
        resendOtp,
        loading,
        setLoading,
        setError,
        error,
    } = useFunctions();
    
    const handlePress = (role) => {
        setRole(role);
        setStep(2);
    };

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Email before sign up:", email);
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
        const combinedOtp = otp.join('');
        if (combinedOtp.length === 4) {
            setLoading(true);
            setError(null);
    
            try {
                await verifyOtp(formData, combinedOtp);
                setStep(4);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to verify OTP';
                setError(errorMessage);
    
                if (errorMessage.includes('Invalid OTP')) {
                    Alert.alert("Invalid OTP", errorMessage);
                } else {
                    Alert.alert("Error", errorMessage);
                }
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert("Error", "OTP must be 4 digits long");
        }
    };
    

    // Handle OTP resend
    const handleResendOtp = async () => {
        setLoading(true);
        setError(null);
        

        try {
            console.log("Email before resending OTP:", email);
            await resendOtp(email);
        } catch (error) {
            const errorMessage = error.message || 'Failed to resend OTP';
            setError(errorMessage);
            Alert.alert("Error", errorMessage);
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
                        role={role}
                        setRole={setRole}
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
            {loading ? <ActivityIndicator size="large" color={Color.colorMidnightblue} /> : renderStep()}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        justifyContent: 'center',
    },
});
