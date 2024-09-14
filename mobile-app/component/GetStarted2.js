import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted2({HeaderText}) {

    return (
        <View style={styles.container}>
            

            <Text style={styles.Header}>
                {HeaderText}
            </Text>

            <Image
                style={styles.containerImage}
                resizeMode="cover"
                source={require("../assets/image-0.4.png")}
            />
            <Text style={styles.containerText}>
                Our mission is to bridge the gap between investors and entrepreneurs by providing comprehensive support, resources, and guidance.
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
        fontFamily: FontFamily.signikaBold,
        textAlign: "center",
        marginTop: 42,
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
        width: width * 0.8,
        height: "80%",
    },
});
