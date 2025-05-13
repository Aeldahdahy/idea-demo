import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import RegisterForm from './RegisterForm';
import Identity from './Identity';
import OtpVerification from './OtpVerification';
import Success from './Success';
import { useFunctions } from '../useFunctions';
import { Color, FontSize, FontFamily } from '../GlobalStyles';

export default function SignUp({ onSignIn }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState("");
    const [timer, setTimer] = useState(180); 
    const [isTimerActive, setIsTimerActive] = useState(true);

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

    useEffect(() => {
        let interval;
        if (isTimerActive && step === 2 && timer > 0) {
          interval = setInterval(() => {
            setTimer(prev => prev - 1);
          }, 1000);
        } else if (timer === 0) {
          setIsTimerActive(false);
        }
        return () => clearInterval(interval);
      }, [timer, isTimerActive, step]);
    
    const handlePress = (role) => {
        setRole(role);
        setStep(2);
    };

    const handleCreateAccount = async () => {
        let errorMessage;
    
        if (!email || !fullName || !password || !confirmPassword || !role) {
            errorMessage = 'Please fill in all fields with your data.';
            setError(errorMessage);
            Alert.alert('Input Error', errorMessage);
            return;
        }
    
        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match.';
            setError(errorMessage);
            Alert.alert('Input Error', errorMessage);
            return;
        }
    
        setLoading(true);
        setError(null);
        setTimer(180);

        const formData = { email, fullName, password, role }; 
    
        try {
            console.log("Email before sign up:", email);
    
            const result = await signUp(formData);
    
            if (result.success) {
                setStep(3); 
            } else {
                errorMessage = result.message || 'Failed to create an account. Please try again.';
                setError(errorMessage);
                Alert.alert('Sign-Up Error', errorMessage);
            }
        } catch (error) {
            console.error("Sign-Up Error:", error);
    
            errorMessage = error.message || 'Failed to create account. Please check your connection and try again.';
            setError(errorMessage);
            Alert.alert('Sign-Up Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };
   
    const handleVerifyOtp = async () => {
        const combinedOtp = otp.join('');
    
        if (combinedOtp.length !== 4) {
            Alert.alert("Error", "OTP must be 4 digits long");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const result = await verifyOtp(formData, combinedOtp);
    
            if (result.success) {
                setStep(4);
            } else {
                const errorMessage = result.message || 'Failed to verify OTP. Please try again.';
                setError(errorMessage);
                Alert.alert(result.message.includes('Invalid OTP') ? 'Invalid OTP' : 'Error', errorMessage);
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
    
            const errorMessage = error.message || 'Failed to verify OTP. Please check your connection and try again.';
            setError(errorMessage);
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleResendOtp = async () => {
        setLoading(true);
        setError(null);
        setTimer(180);

        try {
            console.log("Email before resending OTP:", email);
    
            const result = await resendOtp(email);
    
            if (result.success) {
                console.log('OTP resend successful');
            } else {
                const errorMessage = result.message || 'Failed to resend OTP. Please try again.';
                setError(errorMessage);
                Alert.alert('Resend OTP Error', errorMessage);
            }
        } catch (error) {
            console.error("Resend OTP Error:", error);
    
            const errorMessage = error.message || 'Failed to resend OTP. Please check your connection and try again.';
            setError(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                        <Identity
                            onBack={onSignIn}
                            role={role}
                            setRole={setRole}
                            handlePress={handlePress}
                        />
                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={onSignIn}
                        >
                            <Text style={styles.signInButtonText}>
                                Already have an account? Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                        otp={otp}
                        setOtp={setOtp}
                        handleVerifyOtp={handleVerifyOtp}
                        handleResendOtp={handleResendOtp}
                        timer={timer}
                        isTimerActive={isTimerActive}
                        onBack={() => setStep(1)}
                        otpPurpose="Verify your email for Sign Up"
                        loading={loading}
                        email={email}
                        setEmail={setEmail}
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
        width: "100%",
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        justifyContent: 'center',
    },
    signInButton: {
        marginTop: 20,
        padding: 10,
    },
    signInButtonText: {
        color: Color.colorMidnightblue,
        fontFamily: FontFamily.signikaRegular,
        fontSize: FontSize.size_base,
        textAlign: "center",
    },
});