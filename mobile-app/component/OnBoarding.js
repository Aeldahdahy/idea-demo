import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default function OnBoarding() {
  return (
    <View style={styles.Container}>
        <View style={styles.ContainerHeader}>
            <Text style={styles.HeaderMain}>Welcome to</Text>
            <Text style={styles.HeaderBold}>IDEA.</Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    HeaderMain:{
        fontSize:20
    },
    HeaderBold:{
        fontSize:20,
        fontWeight: "bold",
    },
});