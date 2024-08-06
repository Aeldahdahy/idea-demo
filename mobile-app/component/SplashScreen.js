import { View, StyleSheet, Image } from "react-native";
import LogoImage from '../assets/favicon.png';


export default function SplashScreen(){
  return(
    <View style={styles.container}>
      <View>
        <Image source={LogoImage} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image:{
    width:80,
    height:60,
    resizeMode: 'cover',
  },  
});