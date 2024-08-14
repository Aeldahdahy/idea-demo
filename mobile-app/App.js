import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenComponent from './component/SplashScreen';
import Main from './component/Main';
import OnBoarding from './component/OnBoarding';


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
  const [isFirstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    let timer;

    async function loadResourcesAndDataAsync() {
      try {
        await loadFonts();
        setFontsLoaded(true);

        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setFirstLaunch(true);
        }

        timer = setTimeout(() => {
          setIsShowSplash(false);
        }, 3000);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || isFirstLaunch === null) {
    return null; 
  }

  if (isShowSplash) {
    return <SplashScreenComponent />;
  }

  if (isFirstLaunch) {
    return <OnBoarding onComplete={() => setFirstLaunch(false)} />;
  } else {
    return <Main />;
  }
}
