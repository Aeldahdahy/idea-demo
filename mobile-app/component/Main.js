import { View, Text, StyleSheet  } from "react-native";
import SignIn from './SignIn';
import ChangePassword from './ChangePassword';

export default function Main() {
  return (
    <View style={styles.container}>
      {/* <SignIn /> */}
        <ChangePassword />
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