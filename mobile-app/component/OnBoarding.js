import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import backButtonImage from '../assets/back-button Blue.png';
import GetStarted1 from './GetStarted1';
import GetStarted2 from './GetStarted2';
import GetStarted3 from './GetStarted3';
import GetStarted4 from './GetStarted4';
import GetStarted5 from './GetStarted5';

const { width, height } = Dimensions.get('window');

export default function OnBoarding({ onComplete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const fadeOpacity = useSharedValue(1); // Start with full opacity

    const handleNext = () => {
        if (currentPage < 5) {
            fadeOpacity.value = withTiming(0, { duration: 300 }, () => {
                runOnJS(setCurrentPage)(currentPage + 1); // Set page after fade out
                fadeOpacity.value = withTiming(1, { duration: 300 }); // Fade in
            });
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            fadeOpacity.value = withTiming(0, { duration: 300 }, () => {
                runOnJS(setCurrentPage)(currentPage - 1); // Set page after fade out
                fadeOpacity.value = withTiming(1, { duration: 300 }); // Fade in
            });
        }
    };

    const handleSkip = () => {
        fadeOpacity.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(setCurrentPage)(5); // Directly set the last page
            fadeOpacity.value = withTiming(1, { duration: 300 }); // Fade in
        });
        onComplete();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeOpacity.value, // Apply animated opacity to the page container
        };
    });

    const renderView = () => {
        switch (currentPage) {
            case 1:
                return <GetStarted1 HeaderText={'Welcome to'} HeaderName={'IDEA.'} />;
            case 2:
                return <GetStarted2 HeaderText={'Who are We?'} />;
            case 3:
                return <GetStarted3 HeaderText={'How it works?'} />;
            case 4:
                return <GetStarted4 HeaderText={'Investor'} />;
            case 5:
                return <GetStarted5 HeaderText={'Entrepreneur'} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topNavigation}>
                <Pressable style={styles.backButton} onPress={handleBack}>
                    {currentPage > 1 && (
                        <Image style={styles.buttonImage} source={backButtonImage} />
                    )}
                </Pressable>
                <Pressable style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.buttonText}>Skip</Text>
                </Pressable>
            </View>

            <Animated.View style={[styles.pageContainer, animatedStyle]}>
                {renderView()}
            </Animated.View>

            <Pressable style={styles.rectangleParent} onPress={handleNext}>
                <View style={styles.groupChild} />
                <Text style={styles.next}>
                    {currentPage === 5 ? 'Go to Sign In' : 'Next'}  {/* Change text on the last page */}
                </Text>
            </Pressable>

            <View style={styles.enParent}>
                <Image
                    style={styles.screenshot20240701At656}
                    resizeMode="cover"
                    source={require('../assets/image-0.21.png')}
                />
                <Text style={styles.en}>EN</Text>
                <View style={styles.groupItem}>
                    <Image
                        style={styles.groupItemImage}
                        resizeMode="cover"
                        source={require('../assets/image-0.20.png')}
                    />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,                  // Ensures the container takes up the full space
        width: '100%',            // 100% width of the screen
        height: '100%',           // 100% height of the screen
        justifyContent: 'space-evenly', // Centers content vertically
        alignItems: 'center',     // Centers content horizontally
        backgroundColor: Color.background, // Assuming a global background color
    },
    topNavigation: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 50,
        height: 50,
    },
    buttonImage: {
        width: "100%",
        height: "100%",
    },
    skipButton: {
        backgroundColor: Color.colorLightBlue_200,
        borderRadius: Border.br_8xs,
        width: 70,
        height: 40,
        justifyContent: 'center', 
        alignItems: 'center',     
        position: 'relative',
    },
    buttonText: {
        fontSize: FontSize.size_6xl,
        color: Color.colorNavy,
        fontFamily: FontFamily.signikaBold,
        textAlign: 'center',
        textAlignVertical: 'center', 
    },
    pageContainer: {
        width: width,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleParent: {
        width: '80%',
        height: 60,
        borderRadius: Border.br_21xl,
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorWhite,
        borderWidth: 2,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    groupChild: {
        borderRadius: Border.br_21xl,
        backgroundColor: Color.colorNavy,
        borderColor: Color.colorWhite,
        borderWidth: 2,
        height: 60,
        width: '100%',
        position: "absolute",
    },
    next: {
        fontSize: FontSize.size_6xl,
        color: Color.colorWhite,
        fontFamily: FontFamily.signikaBold,
        fontWeight: "700",
    },
    enParent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    en: {
        fontSize: FontSize.size_8xl,
        fontFamily: FontFamily.signikaRegular,
        marginRight: 10,
    },
    screenshot20240701At656: {
        borderRadius: Border.br_195xl,
        width: 31,
        height: 31,
        marginRight: 10,
    },
    groupItem: {
        width: 15,
        height: 15,
    },
    groupItemImage: {
        width: '100%',
        height: '100%',
    },
});
