import React from 'react';
import OnBoard from './component/OnBoard';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <OnBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'center', // Center the child components vertically
    alignItems: 'center', // Center the child components horizontally
    backgroundColor: '#ffffff', // Optional background color
  },
});



{/*
  import SplashScreen from './component/SplashScreen';
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  <SafeAreaProvider>
    <SplashScreen />
  </SafeAreaProvider>
*/}