import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { Color, Border, FontFamily } from "../GlobalStyles";

const { width, height } = Dimensions.get('window');

export default function Identity({ 
  onBack,
  handlePress,
  setRole,
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingVertical: height * 0.07 }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image source={require("../assets/image-0.22.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.getStarted, { fontSize: width * 0.08 }]}>Get Started</Text>
      </View>

      <ImageBackground
        style={[styles.mainImage, { width: width * 0.8, height: height * 0.35, marginVertical: height * 0.02 }]}
        resizeMode="contain"
        source={require("../assets/image-0.29.png")}
      >
        <Image
          style={[styles.footerImage, { width: width * 0.6, height: height * 0.2, bottom: 0 }]}
          resizeMode="contain"
          source={require("../assets/image-0.30.png")}
        />
      </ImageBackground>

      <Text style={[styles.chooseYourIdentity, { fontSize: width * 0.07 }]}>Choose your identity:</Text>
      <Text style={[styles.description, { fontSize: width * 0.05 }]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      <View style={[styles.identityOptions, { marginBottom: height * 0.05 }]}>
        <TouchableOpacity
          style={[styles.optionButton, setRole === 'entrepreneur' && styles.selectedOption]}
          onPress={() => handlePress('entrepreneur')}
        >
          <Image
            style={[styles.optionImage, { width: width * 0.1, height: height * 0.04 }]}
            resizeMode="cover"
            source={require("../assets/image-0.31.png")}
          />
          <Text style={[styles.optionText, { fontSize: width * 0.045 }]}>Entrepreneur</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, setRole === 'investor' && styles.selectedOption]}
          onPress={() => handlePress('investor')}
        >
          <Image
            style={[styles.optionImage, { width: width * 0.1, height: height * 0.04 }]}
            resizeMode="cover"
            source={require("../assets/image-0.32.png")}
          />
          <Text style={[styles.optionText, { fontSize: width * 0.045 }]}>Investor</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
  },
  footerImage: {
    alignSelf: "center",
    flex:1,   
  },
  backButton: {
    paddingLeft: 0,
    paddingTop: 3,
  },
  backIcon: {
    width: 45,
    height: 50,
  },
  getStarted: {
    fontWeight: "700",
    fontFamily: FontFamily.bitterBold,
    color: Color.colorWhite,
  },
  mainImage: {
    alignSelf: "center",
    position: "relative",
  },
  chooseYourIdentity: {
    fontWeight: "800",
    fontFamily: FontFamily.bitterExtraBold,
    color: Color.colorBlack,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontWeight: "300",
    fontFamily: FontFamily.signikaLight,
    color: Color.colorBlack,
    textAlign: "center",
    marginBottom: 32,
  },
  identityOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionButton: {
    flex: 1,
    height: 99,
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_mini,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  selectedOption: {
    backgroundColor: Color.colorMidnightblue,
  },
  optionImage: {
    marginBottom: 8,
  },
  optionText: {
    fontFamily: FontFamily.signikaRegular,
    color: Color.colorBlack,
    textAlign: "center",
  },
  
});
