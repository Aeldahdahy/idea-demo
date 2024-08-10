import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import backButtonImage from '../assets/image-0.22.png';
import GetStarted1 from './GetStarted1';
import GetStarted2 from './GetStarted2';
import GetStarted3 from './GetStarted3';
import GetStarted4 from './GetStarted4';
import GetStarted5 from './GetStarted5';

const { width } = Dimensions.get('window');

export default function OnBoarding({ onComplete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const translateX = useSharedValue(0);

    const handleNext = () => {
        if (currentPage < 5) {
            setCurrentPage((prev) => prev + 1);
            translateX.value = withTiming(-width * currentPage, { duration: 300 });  // Smooth transition
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            translateX.value = withTiming(-width * (currentPage - 2), { duration: 300 });  // Smooth transition
        }
    };

    const handleSkip = () => {
        setCurrentPage(5);
        translateX.value = withTiming(-width * 4, { duration: 300 });
        onComplete();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
                <GetStarted1 onNext={handleNext} onSkip={handleSkip} />
                <GetStarted2 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />
                <GetStarted3 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />
                <GetStarted4 onNext={handleNext} onBack={handleBack} onSkip={handleSkip} onBackImage={backButtonImage} />
                <GetStarted5 onBack={handleBack} onBackImage={backButtonImage} onComplete={onComplete} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',  // Ensures that the views are clipped during animation
    },
    animatedContainer: {
        flexDirection: 'row',
        width: width * 5,  // Total width based on the number of pages
        flex: 1,  // Ensures the container uses 100% of the width
    },
});
