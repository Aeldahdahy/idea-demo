import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Text, Dimensions } from "react-native";
import IDEALogo from '../assets/idea.png'; // Ensure you have your logo in this path
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BGColor = "#0029A4";

export default function SplashScreen() {
  // Safe Area
  const edges = useSafeAreaInsets();

  // Animation values
  const startAnimation = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    // Starting animation after 500ms
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get('window').height + (edges.top + 65),
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: (Dimensions.get('window').width / 2) - 35,
            y: (Dimensions.get('window').height / 2) - 5,
          },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: (Dimensions.get('window').height / 2) - 80,
          },
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();
    }, 500);
  }, []);

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <Animated.View style={{
        flex: 1,
        backgroundColor: BGColor,
        transform: [
          { translateY: startAnimation }
        ],
        zIndex: 1,
      }}>
        <Animated.View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Animated.Image source={IDEALogo} style={{
            width: 100,
            height: 100,
            transform: [
              { translateX: moveLogo.x },
              { translateY: moveLogo.y },
              { scale: scaleLogo },
            ]
          }} />
          <Animated.Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            transform: [
              { translateY: moveTitle.y },
              { scale: scaleTitle }
            ]
          }}>
            IDEA
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        zIndex: 0,
      }}>
      </Animated.View>
    </View>
  );
}
