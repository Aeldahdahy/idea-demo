import { View, StyleSheet  } from "react-native";
import SignIn from './SignIn';
import ForgetPassword from "./ForgetPassword";
import RegisterForm from './RegisterForm';
import Identity from "./Identity";





export default function Main() {
  return (
    <View style={styles.container}>
        <SignIn />
        {/* <ForgetPassword /> */}

        {/* <RegisterForm /> */}
        {/* <Identity /> */}

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