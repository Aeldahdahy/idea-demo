import React, { useEffect, useState } from 'react';
import SplashScreen from './component/SplashScreen';
import HomeScreen from './component/HomeScreen';

export default function App() {
  console.log('App is running');

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    
    setTimeout(()=>{
    
      setIsShowSplash(false);

    }, 3000);
    
    return () => clearTimeout(timer);

  }, []);


  return <>{isShowSplash ? <SplashScreen /> : <HomeScreen />}</>;
}
