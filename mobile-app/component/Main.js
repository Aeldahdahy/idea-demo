import { View, StyleSheet  } from "react-native";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";

import OtpVerification2 from "./OtpVerification2";
import OtpVerification from "./OtpVerification";


import Identity from "./Identity";



export default function Main() {
  return (
    <View style={styles.container}>
        {/* <SignIn /> */}
        {/* <ForgetPassword /> */}

        {/* <OtpVerification2 /> */}
        <OtpVerification />

        <Identity />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    containerText:{
        color: '#000',
    },
    name:{
      fontWeight:'bold',
      fontSize: 50,

    }
});