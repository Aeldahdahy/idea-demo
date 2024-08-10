import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

export default function GetStarted5({ onBack, onBackImage }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const data = [
        { id: 1, image: require('../assets/image-0.14.png'), text: 'Create your account as an entrepreneur and start your project' },
        { id: 2, image: require('../assets/image-0.12.png'), text: 'verify your account and get connected with investors' },
        { id: 3, image: require('../assets/image-0.8.png'), text: 'Step into the world of entrepreneurship and start creating your project with our comprehensive support system' },
        { id: 4, image: require('../assets/image-0.11.png'), text: 'Launch your project and unlock the potential to raise money with our dedicated platform' },
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
            <View style={styles.topNavigation}>
                <Pressable style={styles.backButton} onPress={onBack}>
                    <Image style={styles.buttonText} source={onBackImage} />
                </Pressable>
            </View>

            <Text style={styles.Entrepreneur}>
                Entrepreneur
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
                source={require("../assets/image-0.19.png")}
            />

            <Pressable
                style={styles.rectangleParent}
            >
                <View style={styles.groupChild} />
                <Text style={styles.next}>Get Started</Text>
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
    Entrepreneur: {
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
