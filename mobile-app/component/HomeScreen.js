import { View, Text, StyleSheet  } from "react-native";
import OnBoarding from "./OnBoarding";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <OnBoarding />
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
});