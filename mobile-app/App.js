import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from './component/SplashScreen';
import Index from './component/Index';

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    'Signika-Regular': require('./assets/static/Signika-Regular.ttf'),
    'Signika-Light': require('./assets/static/Signika-Light.ttf'),
    'Signika-Bold': require('./assets/static/Signika-Bold.ttf'),
  });
};

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let timer;

    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await loadFonts();
        setFontsLoaded(true);

        // Simulate a splash screen timer
        timer = setTimeout(() => {
          setIsShowSplash(false);
        }, 3000);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen after everything is loaded
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <>{isShowSplash ? <SplashScreenComponent /> : <Index />}</>
  );
}
