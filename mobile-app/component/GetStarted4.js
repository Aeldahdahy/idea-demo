import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted4({ onNext, onBack, onSkip, onBackImage }) {

    return (
        <View style={styles.getStartedPage2}>
            <View style={styles.topNavigation}>
                <Pressable style={styles.backButton} onPress={onBack}>
                    <Image style={styles.buttonText} source={onBackImage} />
                </Pressable>
                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={styles.buttonText}>Skip</Text>
                </Pressable>
            </View>

            <Text style={styles.Investor}>
                Investor
            </Text>

            <Image
                style={styles.screenshot20240722At753}
                resizeMode="cover"
                source={require("../assets/image-0.14.png")}
            />
            <Text style={styles.ourMissionIs}>
                Create your account as an investor and search for startups
            </Text>
            <Image
                style={styles.getStartedPage2Child}
                resizeMode="cover"
                source={require("../assets/image-0.18.png")}
            />

            <Pressable
                style={styles.rectangleParent}
                onPress={onNext}
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
    getStartedPage2: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    topNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 40,
    },
    backButton: {
        backgroundColor: 'transparent',
    },
    skipButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: FontSize.size_6xl,
        color: Color.colorNavy,
        fontFamily: FontFamily.signikaBold,
    },
    Investor: {
        fontSize: FontSize.size_16xl,
        fontFamily: FontFamily.signikaBold,
        textAlign: "center",
        marginTop: 100, // Adjust for space at the top
    },
    ourMissionIs: {
        fontSize: FontSize.size_2xl,
        fontWeight: "300",
        fontFamily: FontFamily.signikaLight,
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    screenshot20240722At753: {
        borderRadius: 167,
        width: width * 0.8,
        height: "40%",
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
        width:'auto',
    },
    enParent: {
        flex: 1,
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
    getStartedPage2Child: {
        width: 100,
        height: 12,
        marginTop: 20,
    },
    groupItem: {
        position: 'relative',
        width: 15,
        height: 15,
    },
    groupItemImage: {
        position: 'absolute',
        width: '100%',
        top: '50%',
    },
});
