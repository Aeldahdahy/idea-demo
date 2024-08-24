import * as React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

export default function ResetPasswordForm ({ 
    onNext,
    onBack,
    resetPassword,
    setLoading,
    setError,
    loading,
    error
   }) {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  
  
  const handleResetPassword = async (data) => {
    if (!data.newPassword || !data.confirmPassword) {
        Alert.alert("Error", "Please enter both new password and confirmation.");
        return;
    }

    setLoading(true);
    setError(null);

    try {
        await resetPassword(data);
        Alert.alert("Success", "Password has been reset successfully!");
        setStep(1); 
    } catch (error) {
        setError(error.message || 'Failed to reset password');
        Alert.alert("Error", error.message || 'Failed to reset password');
    } finally {
        setLoading(false);
    }
};

  const handleBackPress = () => {
    onBack();
  };

  return (
    <View style={styles.createPassword}>
      <View style={styles.createPasswordChild} />
      <Text style={styles.createNewPassword}>Create new password</Text>
      <View style={styles.createPasswordItem} />
      <TouchableOpacity style={styles.doneButton} onPress={handleResetPassword}>
        <Text style={styles.doneText}>Change Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleBackPress}>
        <Image
          style={styles.createPasswordInner}
          resizeMode="cover"
          source={require("../assets/backarrow.png")}
        />
      </TouchableOpacity>
      
      <View style={[styles.rectangleView, styles.rectangleViewShadowBox]} />
      <TextInput
        style={[styles.textInput, styles.newPasswordInput]}
        placeholder="New Password"
        placeholderTextColor={Color.colorGray}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={[styles.textInput, styles.confirmPasswordInput]}
        placeholder="Confirm New Password"
        placeholderTextColor={Color.colorGray}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Image
        style={[
          styles.eye,
          styles.screenshot20240709Layout1,
        ]}
        resizeMode="cover"
        source={require("../assets/eye.png")}
      />
      <Image
        style={[
          styles.lock,
          styles.screenshot20240709Layout,
        ]}
        resizeMode="cover"
        source={require("../assets/lock.png")}
      />
      <Image
        style={[
          styles.eye2,
          styles.screenshot20240709Layout,
        ]}
        resizeMode="cover"
        source={require("../assets/lock.png")}
      />
      <Image
        style={[
          styles.eye3,
          styles.screenshot20240709Layout1,
        ]}
        resizeMode="cover"
        source={require("../assets/eye.png")}
      />
      <Image
        style={styles.groupIcon}
        resizeMode="cover"
        source={require("../assets/ellipse.png")}
      />
      <Image
        style={styles.mainlock}
        resizeMode="cover"
        source={require("../assets/mainlock.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleViewShadowBox: {
    borderColor: Color.colorBlack,
    left: 46,
    height: 55,
    width: 333,
    borderWidth: 1,
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
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  screenshot20240709Layout1: {
    height: 20,
    width: 32,
    borderRadius: Border.br_120xl_5,
    left: 330,
  },
  screenshot20240709Layout: {
    height: 27,
    width: 21,
    left: 69,
    position: "absolute",
  },
  newTypo: {
    height: 25,
    color: Color.colorGray,
    fontWeight: "300",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.signika,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    position: "absolute",
  },
  createPasswordChild: {
    top: 0,
    left: 0,
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: "#163696",
    width: 430,
    height: 220,
    position: "absolute",
  },
  createNewPassword: {
    top: 108,
    left: 42,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: FontFamily.bitter,
    width: 336,
    height: 50,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  createPasswordItem: {
    top: 737,
    left: 45,
    backgroundColor: "#0029a4",
    borderColor: Color.colorWhite,
    height: 55,
    width: 333,
    borderWidth: 1,
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
    position: "absolute",
  },
  doneButton: {
    position: "absolute",
    top: 737,
    left: 45,
    width: 333,
    height: 55,
    backgroundColor: "#0029a4",
    borderRadius: Border.br_16xl,
    justifyContent: "center",
    alignItems: "center",
  },
  doneText: {
    fontSize: 25,
    fontWeight: "600",
    color: Color.colorWhite,
    fontFamily: FontFamily.signika,
  },
  changePassword: {
    top: 870,
    left: 82,
    textDecoration: "underline",
    color: Color.colorBlack,
    width: 277,
    height: 44,
    fontWeight: "300",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: FontFamily.signika,
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  createPasswordInner: {
    top: 35,
    left: 30,
    width: 44,
    height: 41,
    position: "absolute",
  },
  rectangleView: {
    top: 653,
  },
  createPasswordChild1: {
    top: 569,
  },
  eye: {
    top: 672,
  },
  lock: {
    top: 667,
  },
  eye2: {
    top: 583,
  },
  newPassword: {
    top: 584,
    left: 103,
    width: 129,
  },
  confirmNewPassword: {
    top: 669,
    left: 102,
    width: 211,
  },
  eye3: {
    top: 587,
  },
  groupIcon: {
    top: 269,
    left: 89,
    width: 253,
    height: 245,
    position: "absolute",
  },
  mainlock: {
    top: 307,
    left: 156,
    width: 118,
    height: 170,
    position: "absolute",
  },
  createPassword: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  textInput: {
    height: 55,
    width: 333,
    paddingLeft: 50,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: Border.br_16xl,
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  newPasswordInput: {
    top: 584,
    left: 46,
  },
  confirmPasswordInput: {
    top: 669,
    left: 46,
  },
});
