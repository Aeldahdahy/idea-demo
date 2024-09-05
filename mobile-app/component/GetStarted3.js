import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted4() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const data = [
        { id: 1, image: require('../assets/image-0.5.png'), text: 'Create your account to start the journey' },
        { id: 2, image: require('../assets/image-0.12.png'), text: 'Verify your account to be trusted by others' },
        { id: 3, image: require('../assets/image-0.6.png'), text: 'Embark on your journey towards financial success' },
    ];

    const goToNextSlide = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPreviousSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <View style={styles.getStartedPage2}>
            

            <Text style={styles.Investor}>
                How It works?
            </Text>

            <Image
                style={styles.screenshot20240722At753}
                resizeMode="cover"
                source={data[currentIndex].image}
            />
            <Text style={styles.ourMissionIs}>
                {data[currentIndex].text}
            </Text>
            <View style={styles.navigationButtons}>
                <Pressable style={styles.navButton} onPress={goToPreviousSlide}>
                    <Text style={styles.navButtonText}>{"<"}</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={goToNextSlide}>
                    <Text style={styles.navButtonText}>{">"}</Text>
                </Pressable>
            </View>

            <Image
                style={styles.getStartedPage2Child}
                resizeMode="cover"
                source={require("../assets/image-0.17.png")}
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
 
    navigationButtons:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        width:"100%",
        alignItems:'center',
        position:'absolute',
        top:"45%"
    },
    navButtonText:{
        fontSize: 30,
        fontWeight:"bold",
    }
});
