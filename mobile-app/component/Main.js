import { View, Text, StyleSheet  } from "react-native";
import SignIn from './SignIn';


export default function Main() {
  return (
    <View style={styles.container}>
        <SignIn />
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