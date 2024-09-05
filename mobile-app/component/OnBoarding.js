import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import backButtonImage from '../assets/back-button Blue.png';
import GetStarted1 from './GetStarted1';
import GetStarted2 from './GetStarted2';
import GetStarted3 from './GetStarted3';
import GetStarted4 from './GetStarted4';
import GetStarted5 from './GetStarted5';
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";


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
            <View style={styles.topNavigation}>
                <Pressable style={styles.backButton}>
                    <Image style={styles.buttonText} source={backButtonImage} />
                </Pressable>
                <Pressable style={styles.skipButton} >
                    <Text style={styles.buttonText}>Skip</Text>
                </Pressable>
            </View>

            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
                <GetStarted1 />
                <GetStarted2 />
                <GetStarted3 />
                <GetStarted4 />
                <GetStarted5 />
            </Animated.View>

            <Pressable
                style={styles.rectangleParent}
            >
                <View style={styles.groupChild} />
                <Text style={styles.next}>Next</Text>
            </Pressable>

            <View style={styles.enParent}>
                <Image
                    style={styles.screenshot20240701At656}
                    resizeMode="cover"
                    source={require("../assets/image-0.21.png")}
                />
                <Text style={styles.en}>EN</Text>
                <View style={styles.groupItem}>
                  <Image
                    style={styles.groupItemImage}
                    resizeMode="cover"
                    source={require("../assets/image-0.20.png")}
                  />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden', 
    },
    topNavigation: {
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        top: "5%",
    },
    backButton: {
        backgroundColor: 'transparent',
        width:40,
        height:40,
    },
    skipButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: FontSize.size_6xl,
        color: Color.colorNavy,
        fontFamily: FontFamily.signikaBold,
        width:"100%",
        height:"100%",
    },
    animatedContainer: {
        flexDirection: 'row',
        width: width * 5,  
        flex: 1,
    },
    rectangleParent: {
        width: '80%',
        height: 60,
        borderRadius: Border.br_21xl,
        backgroundColor: Color.colorNavy,
        borderColor: Color.colorGray_100,
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
        borderStyle: "solid",
        borderColor: Color.colorGray_100,
        borderWidth: 2,
        height: 60,
        width: '100%',
        position: "absolute",
    },
    next: {
        fontSize: FontSize.size_6xl,
        color: Color.colorGray_200,
        fontFamily: FontFamily.signikaBold,
        fontWeight: "700",
    },
    enParent: {
        flex:1,
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
    getStartedPage1Child: {
        width: 100,
        height: 12,
        marginTop: 20,
    },
    groupItem: {
        position:'relative',
        width: 15,
        height: 15,
    },
    groupItemImage:{
        position: 'absolute',
        width: '100%',
        top:'50%'
    },
});
