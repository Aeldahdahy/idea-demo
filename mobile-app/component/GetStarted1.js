import * as React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted1() {

    return (
        <View style={styles.getStartedPage1}>

            <Text style={styles.welcomeToIdeaContainer}>
                <Text style={styles.welcomeTo}>Welcome to</Text>
                <Text style={styles.idea}> IDEA.</Text>
            </Text>

            <Image
                style={styles.screenshot20240722At753}
                resizeMode="cover"
                source={require("../assets/iamge-0.1.png")}
            />

            <Text style={styles.ourPlatformIs}>
                Our platform is dedicated to transforming innovative ideas into successful ventures by providing you with the tools, resources, and support needed
            </Text>

            <Image
                style={styles.getStartedPage1Child}
                resizeMode="cover"
                source={require("../assets/image-0.15.png")}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    getStartedPage1: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    
   
    welcomeToIdeaContainer: {
        fontSize: FontSize.size_16xl,
        textAlign: "center",
        marginTop:42,
    },
    welcomeTo: {
        fontFamily: FontFamily.signikaRegular,
    },
    idea: {
        fontFamily: FontFamily.signikaBold,
        fontWeight: "700",
    },
    ourPlatformIs: {
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
   
    
    
    
});
