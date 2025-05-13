import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SplashScreenComponent from './component/SplashScreen';
import Main from './component/Main';
import OnBoarding from './component/OnBoarding';

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    'Signika-Regular': require('./assets/Signika/static/Signika-Regular.ttf'),
    'Signika-Light': require('./assets/Signika/static/Signika-Light.ttf'),
    'Signika-Bold': require('./assets/Signika/static/Signika-Bold.ttf'),
    'Signika-SemiBold': require('./assets/Signika/static/Signika-SemiBold.ttf'),
    'Bitter-Bold': require('./assets/Bitter/static/Bitter-Bold.ttf'),
  });
};

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    let timer;

    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await loadFonts();
        setFontsLoaded(true);

        // Check if app has launched before
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }

        // Show splash screen for at least 3 seconds
        timer = setTimeout(() => {
          setIsShowSplash(false);
        }, 3000);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return () => clearTimeout(timer);
  }, []);

  // Render nothing until fonts are loaded and first launch status is determined
  if (!fontsLoaded || isFirstLaunch === null) {
    return null;
  }

  // Show splash screen while isShowSplash is true
  if (isShowSplash) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <SplashScreenComponent />
        </View>
      </SafeAreaView>
    );
  }

  // Show OnBoarding for first-time users, Main for returning users
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {isFirstLaunch ? (
          <OnBoarding
            onComplete={async () => {
              await AsyncStorage.setItem('hasLaunched', 'true');
              setFirstLaunch(false);
            }}
          />
        ) : (
          <Main />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Match SplashScreen.js Color.colorWhite
  },
  innerContainer: {
    flex: 1,
  },
});