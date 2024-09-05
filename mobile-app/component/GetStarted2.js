import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted2() {

    return (
        <View style={styles.getStartedPage2}>
            

            <Text style={styles.whoAreWe}>
                Who are We?
            </Text>

            <Image
                style={styles.screenshot20240722At753}
                resizeMode="cover"
                source={require("../assets/image-0.4.png")}
            />
            <Text style={styles.ourMissionIs}>
                Our mission is to bridge the gap between investors and entrepreneurs by providing comprehensive support, resources, and guidance.
            </Text>
            <Image
                style={styles.getStartedPage2Child}
                resizeMode="cover"
                source={require("../assets/image-0.16.png")}
            />


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
    whoAreWe: {
        fontSize: FontSize.size_16xl,
        fontFamily: FontFamily.signikaBold,
        textAlign: "center",
        marginTop: 42, // Adjust for space at the top
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
    },
});
