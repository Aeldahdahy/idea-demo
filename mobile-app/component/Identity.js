import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const EntrepreneurInvestor2 = () => {
  const handlePress = () => {
    // Handle the button press action here
    console.log("Button Pressed!");
  };

  return (
    <View style={styles.entrepreneurInvestor2}>
      <View
        style={[
          styles.entrepreneurInvestor2Child,
          styles.icons8BackButton962Position,
        ]}
      />
      <Text style={styles.getStarted}>{`Get Started `}</Text>
      <Image
        style={styles.entrepreneurInvestor2Item}
        resizeMode="cover"
        source={require("../assets/image-0.29.png")}
      />
      
      {/* First Button */}
      <TouchableOpacity
        style={[styles.entrepreneurInvestor2Inner, styles.rectangleViewShadowBox]}
        onPress={handlePress}
      />

      {/* Second Button */}
      <TouchableOpacity
        style={[styles.rectangleView, styles.rectangleViewShadowBox]}
        onPress={handlePress}
      />

      <Image
        style={[
          styles.screenshot20240727At429,
          styles.screenshot20240727Layout,
        ]}
        resizeMode="cover"
        source={require("../assets/image-0.31.png")}
      />
      <Text style={styles.chooseYourIdentity}>Choose your identity:</Text>
      <Text style={styles.loremIpsumDolorSit}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Image
        style={[
          styles.screenshot20240727At4291,
          styles.screenshot20240727Layout,
        ]}
        resizeMode="cover"
        source={require("../assets/image-0.32.png")}
      />
      <Text style={[styles.entrepreneur, styles.investorTypo]}>
        Entrepreneur
      </Text>
      <Text style={[styles.investor, styles.investorTypo]}>Investor</Text>
      <Image
        style={styles.screenshot20240727At440}
        resizeMode="cover"
        source={require("../assets/image-0.30.png")}
      />
      
      {/* Back Button */}
      <View style={[styles.ellipseParent, styles.ellipseParentLayout]}>
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../assets/image-0.33.png")}
        />
        <TouchableOpacity
          style={[styles.icons8BackButton962, styles.ellipseParentLayout]}
          onPress={handlePress} // Handle back button press here
        >
          <Image
            style={styles.icons8BackButton962}
            resizeMode="cover"
            source={require("../assets/image-0.34.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons8BackButton962Position: {
    left: 0,
    top: 0,
  },
  rectangleViewShadowBox: {
    height: 99,
    width: 160,
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    top: 691,
    position: "absolute",
  },
  screenshot20240727Layout: {
    height: 31,
    width: 33,
    borderRadius: Border.br_lg,
    top: 705,
    position: "absolute",
  },
  investorTypo: {
    height: 25,
    fontFamily: FontFamily.signikaRegular,
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    textAlign: "center",
    color: Color.colorBlack,
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  ellipseParentLayout: {
    height: 51,
    width: 61,
    position: "absolute",
  },
  entrepreneurInvestor2Child: {
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: "#163696",
    width: 430,
    height: 210,
    position: "absolute",
  },
  getStarted: {
    top: 103,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: FontFamily.bitterBold,
    color: Color.colorWhite,
    textAlign: "left",
    width: 177,
    height: 50,
    alignItems: "center",
    display: "flex",
    left: 59,
    position: "absolute",
  },
  entrepreneurInvestor2Item: {
    top: 250,
    left: 89,
    width: 253,
    height: 245,
    position: "absolute",
  },
  entrepreneurInvestor2Inner: {
    left: 40,
  },
  rectangleView: {
    left: 230,
  },
  screenshot20240727At429: {
    left: 294,
  },
  chooseYourIdentity: {
    top: 543,
    left: 46,
    fontSize: 25,
    fontWeight: "800",
    fontFamily: FontFamily.bitterExtraBold,
    width: 339,
    height: 46,
    justifyContent: "center",
    textAlign: "center",
    color: Color.colorBlack,
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  loremIpsumDolorSit: {
    top: 568,
    left: 64,
    fontWeight: "300",
    fontFamily: FontFamily.signikaLight,
    width: 302,
    height: 100,
    fontSize: FontSize.size_2xl,
    justifyContent: "center",
    textAlign: "center",
    color: Color.colorBlack,
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  screenshot20240727At4291: {
    left: 104,
  },
  entrepreneur: {
    top: 748,
    width: 123,
    left: 59,
    fontFamily: FontFamily.signikaRegular,
  },
  investor: {
    top: 750,
    left: 271,
    width: 79,
  },
  screenshot20240727At440: {
    top: 320,
    left: 125,
    borderRadius: 11,
    width: 171,
    height: 111,
    position: "absolute",
  },
  groupChild: {
    top: 5,
    left: 6,
    width: 50,
    height: 41,
    position: "absolute",
  },
  icons8BackButton962: {
    left: 0,
    top: 0,
  },
  ellipseParent: {
    top: 25,
    left: 16,
  },
  entrepreneurInvestor2: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default EntrepreneurInvestor2;
