import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Border, FontFamily, Color, FontSize } from '../GlobalStyles';


const RegisterForm = () => {
  const handleCreateAccount = () => {
    // Handle create account logic here
    console.log("Create Account button pressed");
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log("Register button pressed");
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login button pressed");
  };

  return (
    <View style={styles.register}>
      <View style={styles.registerChild} />
      <Text style={styles.letsGetYou}>Let's get you registered !</Text>
      <View style={[styles.registerItem, styles.groupItemLayout]} />
      <View style={[styles.registerInner, styles.groupItemLayout]} />
      <Image
        style={[styles.eye, styles.screenshot20240709Layout1]}
        resizeMode="cover"
        source={require("../assets/eye.png")}
      />
      <Image
        style={[styles.eye1, styles.screenshot20240709Layout]}
        resizeMode="cover"
        source={require("../assets/lock.png")}
      />
      <View style={[styles.rectangleView, styles.groupItemLayout]} />
      <View style={[styles.registerChild1, styles.groupItemLayout]} />
      <View style={[styles.registerChild2, styles.groupItemLayout]} />
      <View style={[styles.rectangleParent, styles.groupItemLayout]}>
        <View style={[styles.groupChild, styles.groupItemLayout]} />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[styles.login, styles.loginTypo]}>Login</Text>
        </TouchableOpacity>
        <View style={[styles.groupItem, styles.groupItemLayout]} />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={[styles.register1, styles.loginTypo]}>Register</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.person}
        resizeMode="cover"
        source={require("../assets/person.png")}
      />
      <Image
        style={styles.mailIcon}
        resizeMode="cover"
        source={require("../assets/mail.png")}
      />
      <Image
        style={[styles.lock, styles.screenshot20240709Layout]}
        resizeMode="cover"
        source={require("../assets/lock.png")}
      />
      <TextInput style={[styles.fullName, styles.passwordTypo]} placeholder="Full Name" />
      <TextInput style={[styles.emailAddress, styles.passwordTypo]} placeholder="Email Address" />
      <TextInput style={[styles.password, styles.passwordTypo]} placeholder="Password" />
      <TextInput style={[styles.confirmPassword, styles.passwordTypo]} placeholder="Confirm Password" />
      <Text style={[styles.orRegisterWith, styles.passwordTypo]}>Or register with</Text>
      <Text style={[styles.alreadyHaveAnContainer, styles.loginTypo]}>
        <Text style={styles.alreadyHaveAnContainer1}>
          <Text style={styles.alreadyHaveAn}>{`Already have an account? `}</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.logIn1} onPress={handleLogin}>Log-In</Text>
          </TouchableOpacity>
        </Text>
      </Text>
      <Image
        style={[styles.eye4, styles.screenshot20240709Layout1]}
        resizeMode="cover"
        source={require("../assets/eye.png")}
      />
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccount}>Create account</Text>
      </TouchableOpacity>
      <View style={[styles.lineView, styles.lineViewPosition]} />
      <View style={[styles.registerChild3, styles.lineViewPosition]} />
      <Image
        style={[styles.screenshot20240723At1006, styles.screenshot20240723Layout]}
        resizeMode="cover"
        source={require("../assets/google.png")}
      />
      <Image
        style={[styles.screenshot20240723At1008, styles.screenshot20240723Layout]}
        resizeMode="cover"
        source={require("../assets/facebook.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemLayout: {
    height: 55,
    position: "absolute",
  },
  screenshot20240709Layout1: {
    height: 20,
    width: 32,
    borderRadius: Border.br_120xl_5,
    left: 337,
    position: "absolute",
  },
  screenshot20240709Layout: {
    height: 27,
    width: 21,
    left: 76,
    position: "absolute",
  },
  loginTypo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    position: "absolute",
  },
  passwordTypo: {
    height: 25,
    textAlign: "left",
    color: Color.colorGray_100,
    fontFamily: FontFamily.signikaLight,
    fontWeight: "300",
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  lineViewPosition: {
    height: 1,
    borderTopWidth: 1,
    borderColor: Color.colorGray_100,
    top: 723,
    borderStyle: "solid",
    position: "absolute",
  },
  screenshot20240723Layout: {
    width: 33,
    top: 760,
    height: 33,
    position: "absolute",
  },
  registerChild: {
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: Color.colorMidnightblue,
    width: 430,
    height: 181,
    left: 0,
    top: 0,
    position: "absolute",
  },
  letsGetYou: {
    top: 58,
    left: 13,
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.bitterBold,
    width: 385,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorWhite,
    fontWeight: "700",
    position: "absolute",
  },
  registerItem: {
    top: 268,
    width: 333,
    height: 55,
    borderWidth: 1,
    left: 53,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  registerInner: {
    top: 521,
    width: 333,
    height: 55,
    borderWidth: 1,
    left: 53,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  eye: {
    top: 539,
  },
  eye1: {
    top: 535,
  },
  rectangleView: {
    top: 610,
    backgroundColor: Color.colorNavy,
    borderColor: Color.colorWhite,
    width: 333,
    height: 55,
    borderWidth: 1,
    left: 53,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  registerChild1: {
    top: 437,
    width: 333,
    height: 55,
    borderWidth: 1,
    left: 53,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  registerChild2: {
    top: 353,
    width: 333,
    height: 55,
    borderWidth: 1,
    left: 53,
    borderStyle: "solid",
    borderRadius: Border.br_16xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  groupChild: {
    backgroundColor: "#e8e5e5",
    width: 333,
    height: 55,
    borderRadius: Border.br_16xl,
    left: 0,
    top: 0,
  },
  login: {
    top: 19,
    left: 209,
    width: 64,
    fontFamily: FontFamily.signikaRegular,
    color: Color.colorBlack,
    height: 20,
    justifyContent: "center",
  },
  groupItem: {
    borderRadius: 28,
    backgroundColor: "#ffe284",
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 2,
    width: 170,
    height: 55,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
  },
  register1: {
    top: 18,
    left: 41,
    width: 89,
    fontFamily: FontFamily.signikaRegular,
    color: Color.colorBlack,
    height: 20,
    justifyContent: "center",
  },
  rectangleParent: {
    top: 150,
    left: 50,
    width: 333,
    height: 55,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  person: {
    top: 282,
    left: 77,
    height: 28,
    width: 21,
    position: "absolute",
  },
  mailIcon: {
    top: 369,
    width: 26,
    height: 26,
    left: 76,
    position: "absolute",
    overflow: "hidden",
  },
  lock: {
    top: 451,
  },
  fullName: {
    top: 284,
    width: 92,
    left: 112,
    textAlign: "left",
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
  },
  emailAddress: {
    top: 368,
    width: 129,
    left: 112,
    textAlign: "left",
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
  },
  password: {
    top: 453,
    width: 93,
    left: 112,
    textAlign: "left",
    color: Color.colorGray_100,
    fontSize: FontSize.size_xl,
  },
  confirmPassword: {
    top: 536,
    left: 108,
    width: 156,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.colorGray_100,
  },
  orRegisterWith: {
    top: 711,
    left: 154,
    fontSize: 17,
    width: 114,
  },
  alreadyHaveAn: {
    fontFamily: FontFamily.signikaLight,
    fontWeight: "300",
  },
  logIn1: {
    fontFamily: FontFamily.signikaBold,
    fontWeight: "700",
  },
  logIn: {
    textDecoration: "underline",
  },
  alreadyHaveAnContainer1: {
    width: "100%",
  },
  alreadyHaveAnContainer: {
    top: 870,
    left: 7,
    width: 416,
    height: 44,
  },
  eye4: {
    top: 456,
  },
  createAccount: {
    top: 620,
    left: 94,
    fontSize: FontSize.size_6xl,
    fontWeight: "600",
    fontFamily: FontFamily.signikaSemiBold,
    width: 250,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  lineView: {
    left: 39,
    width: 105,
  },
  registerChild3: {
    left: 278,
    width: 107,
  },
  screenshot20240723At1006: {
    left: 172,
    borderRadius: 330,
  },
  screenshot20240723At1008: {
    left: 224,
    borderRadius: 116,
  },
  register: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    width: "100%",
  },
});

export default RegisterForm;


