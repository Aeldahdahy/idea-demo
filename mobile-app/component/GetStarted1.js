import * as React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted1({
    HeaderText,
    HeaderName
}) {

    return (
        <View style={styles.container}>

            <Text style={styles.Header}>
                <Text style={styles.welcomeTo}>{HeaderText}</Text>
                <Text style={styles.idea}> {HeaderName}</Text>
            </Text>

            <Image
                style={styles.containerImage}
                resizeMode="cover"
                source={require("../assets/image-0.1.png")}
            />

            <Text style={styles.containerText}>
                Our platform is dedicated to transforming innovative ideas into successful ventures by providing you with the tools, resources, and support needed
            </Text>

            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Header: {
        fontSize: FontSize.size_16xl,
        textAlign: "center",
    },
    welcomeTo: {
        fontFamily: FontFamily.signikaRegular,
    },
    idea: {
        fontFamily: FontFamily.signikaBold,
        fontWeight: "700",
    },
    containerText: {
        fontSize: FontSize.size_2xl,
        fontWeight: "300",
        fontFamily: FontFamily.signikaLight,
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    containerImage: {
        borderRadius: 167,
        width: width * 0.8,
        height: "80%",
    },
});
