import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

export default function OnBoarding() {
    // const navigation = useNavigation();

  return (
    <View style={styles.getStartedPage1}>
      <Pressable
        style={[styles.rectangleParent, styles.groupChildLayout]}
        // onPress={() => navigation.navigate("GetStartedPage1")}
      >
        <View style={[styles.groupChild, styles.groupChildPosition]} />
        <Text style={styles.next}>{`Next `}</Text>
      </Pressable>
      <Text style={[styles.welcomeToIdeaContainer, styles.enFlexBox]}>
        <Text style={styles.welcomeToIdeaContainer1}>
          <Text style={styles.welcomeTo}>Welcome to</Text>
          <Text style={styles.idea}> IDEA.</Text>
        </Text>
      </Text>
      <Text
        style={[styles.ourPlatformIs, styles.enFlexBox]}
      >{`Our platform is dedicated to transforming innovative ideas into successful ventures by providing you with the tools, resources, and support needed `}</Text>
      <Image
        style={styles.screenshot20240722At753}
        resizeMode="cover"
        source={require("../assets/iamge-0.1.png")}
      />
      <View style={[styles.enParent, styles.enParentLayout]}>
        <Text style={[styles.en, styles.enFlexBox]}>EN</Text>
        <Image
          style={[styles.screenshot20240701At656, styles.enParentLayout]}
          resizeMode="cover"
          source={require("../assets/image-0.5.png")}
        />
        <Image
          style={styles.groupItem}
          resizeMode="cover"
          source={require("../assets/image-0.6.png")}
        />
      </View>
      <Image
        style={styles.getStartedPage1Child}
        resizeMode="cover"
        source={require("../assets/image-0.7.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    groupChildLayout: {
      height: 60,
      width: 270,
      position: "absolute",
    },
    groupChildPosition: {
      left: 0,
      top: 0,
    },
    enFlexBox: {
      color: Color.colorBlack,
      alignItems: "center",
      display: "flex",
      textAlign: "center",
      position: "absolute",
    },
    enParentLayout: {
      height: 28,
      position: "absolute",
    },
    groupChild: {
      borderRadius: Border.br_21xl,
      backgroundColor: Color.colorNavy,
      borderStyle: "solid",
      borderColor: Color.colorGray_100,
      borderWidth: 2,
      height: 60,
      width: 270,
      position: "absolute",
    },
    next: {
      top: 18,
      left: 17,
      fontSize: FontSize.size_6xl,
      color: Color.colorGray_200,
      width: 234,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      textAlign: "center",
      fontFamily: FontFamily.signikaBold,
      fontWeight: "700",
      position: "absolute",
    },
    rectangleParent: {
      top: 765,
      left: 80,
      shadowColor: "rgba(0, 0, 0, 0.15)",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowRadius: 10,
      elevation: 10,
      shadowOpacity: 1,
    },
    welcomeTo: {
      fontFamily: FontFamily.signikaRegular,
    },
    idea: {
      fontFamily: FontFamily.signikaBold,
      fontWeight: "700",
    },
    welcomeToIdeaContainer1: {
      width: "100%",
    },
    welcomeToIdeaContainer: {
      marginLeft: -121,
      top: 92,
      fontSize: FontSize.size_16xl,
      width: 243,
      height: 80,
      left: "50%",
    },
    ourPlatformIs: {
      marginLeft: -175,
      top: 574,
      fontSize: FontSize.size_2xl,
      fontWeight: "300",
      fontFamily: FontFamily.signikaLight,
      width: 350,
      height: 100,
      left: "50%",
      justifyContent: "center",
    },
    screenshot20240722At753: {
      marginLeft: -167,
      top: 223,
      borderRadius: 167,
      width: 334,
      height: 340,
      left: "50%",
      position: "absolute",
    },
    en: {
      top: 1,
      left: 27,
      fontSize: FontSize.size_8xl,
      width: 44,
      height: 26,
      fontFamily: FontFamily.signikaRegular,
      justifyContent: "center",
    },
    screenshot20240701At656: {
      borderRadius: Border.br_195xl,
      width: 31,
      left: 0,
      top: 0,
    },
    groupItem: {
      top: 16,
      left: 79,
      maxHeight: "100%",
      width: 15,
      position: "absolute",
    },
    enParent: {
      top: 855,
      left: 176,
      width: 79,
    },
    getStartedPage1Child: {
      top: 700,
      left: 165,
      width: 100,
      height: 12,
      position: "absolute",
    },
    getStartedPage1: {
      backgroundColor: Color.colorWhite,
      flex: 1,
      height: 932,
      overflow: "hidden",
      width: "100%",
    },
  });
  