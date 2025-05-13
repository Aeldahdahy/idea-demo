import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoImage from '../assets/img-0.40.png';
import RobotImage from '../assets/img-0.34.png';
import BuildingImage from '../assets/img-0.35.png';
import GraphImage from '../assets/img-0.36.png';
import PlantImage from '../assets/img-0.37.png';
import SpoonImage from '../assets/img-0.38.png';
import BagImage from '../assets/img-0.39.png';
import { Color } from '../GlobalStyles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Background Circles */}
      <Animatable.View animation="fadeIn" duration={2000} style={styles.circle1} />
      <Animatable.View animation="fadeIn" delay={200} style={styles.circle2} />
      <Animatable.View animation="fadeIn" delay={400} style={styles.circle3} />
      <Animatable.View animation="fadeIn" delay={600} style={styles.circle4} />
      <Animatable.View animation="fadeIn" delay={800} style={styles.circle5} />
      <Animatable.View animation="fadeIn" delay={1000} style={styles.circle6} />
      <Animatable.View animation="fadeIn" delay={1200} style={styles.circle7} />

      {/* Images with Circle Backgrounds */}
      <Animatable.View animation="bounceIn" duration={1500} style={styles.imageCircle}>
        <Image source={GraphImage} style={[styles.image, styles.imageTopLeft]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={200} style={styles.imageCircle}>
        <Image source={LogoImage} style={[styles.image, styles.imageTopRight]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={400} style={styles.imageCircle}>
        <Image source={SpoonImage} style={[styles.image, styles.imageTopRight2]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={600} style={styles.imageCircle}>
        <Image source={RobotImage} style={[styles.image, styles.imageCenter]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={800} style={styles.imageCircle}>
        <Image source={PlantImage} style={[styles.image, styles.imageCenterRight]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={1000} style={styles.imageCircle}>
        <Image source={BagImage} style={[styles.image, styles.imageBottomLeft]} />
      </Animatable.View>

      <Animatable.View animation="bounceIn" duration={1500} delay={1200} style={styles.imageCircle}>
        <Image source={BuildingImage} style={[styles.image, styles.imageBottomRight]} />
      </Animatable.View>

      {/* Welcome Text */}
      <Animatable.View animation="fadeInUp" duration={2000} style={[styles.textContainer, styles.textHighestZIndex]}>
        <Text style={styles.welcomeText}>Welcome To</Text>
        <Text style={styles.titleText}>IDEA - Venture! 👋</Text>
        <Text style={styles.descriptionText}>
          Connecting entrepreneurs to investors, fueling innovation and growth.
        </Text>
      </Animatable.View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
  },
  // Background Circles
  circle1: {
    position: 'absolute',
    width: wp('30.77%'), // 120 / 390
    height: wp('30.77%'),
    borderRadius: wp('15.38%'), // 60 / 390
    backgroundColor: '#E6F0FA',
    top: hp('1.18%'), // 10 / 844
    left: wp('2.56%'), // 10 / 390
  },
  circle2: {
    position: 'absolute',
    width: wp('25.64%'), // 100 / 390
    height: wp('25.64%'),
    borderRadius: wp('12.82%'), // 50 / 390
    backgroundColor: '#D3E3F1',
    top: hp('2.37%'), // 20 / 844
    right: wp('5.13%'), // 20 / 390
  },
  circle3: {
    position: 'absolute',
    width: wp('20.51%'), // 80 / 390
    height: wp('20.51%'),
    borderRadius: wp('10.26%'), // 40 / 390
    backgroundColor: '#163696',
    top: hp('17.77%'), // 150 / 844
    left: wp('-12.82%'), // -50 / 390
  },
  circle4: {
    position: 'absolute',
    width: wp('23.08%'), // 90 / 390
    height: wp('23.08%'),
    borderRadius: wp('11.54%'), // 45 / 390
    backgroundColor: '#C9D6E5',
    top: hp('26.07%'), // 220 / 844
    left: wp('23.08%'), // 90 / 390
  },
  circle5: {
    position: 'absolute',
    width: wp('28.21%'), // 110 / 390
    height: wp('28.21%'),
    borderRadius: wp('14.10%'), // 55 / 390
    backgroundColor: '#163696',
    top: hp('40.28%'), // 340 / 844
    right: wp('-12.82%'), // -50 / 390
  },
  circle6: {
    position: 'absolute',
    width: wp('17.95%'), // 70 / 390
    height: wp('17.95%'),
    borderRadius: wp('8.97%'), // 35 / 390
    backgroundColor: '#E6F0FA',
    top: hp('29.62%'), // 250 / 844
    right: wp('-12.82%'), // -50 / 390
  },
  circle7: {
    position: 'absolute',
    width: wp('33.33%'), // 130 / 390
    height: wp('33.33%'),
    borderRadius: wp('16.67%'), // 65 / 390
    backgroundColor: '#D3E3F1',
    top: hp('47.39%'), // 400 / 844
    left: wp('-17.95%'), // -70 / 390
  },
  // Image Circles
  imageCircle: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('12.82%'), // 50 / 390
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: wp('20.51%'), // 80 / 390
    height: wp('20.51%'),
  },
  image: {
    width: wp('20.51%'), // 80 / 390
    height: wp('20.51%'),
  },
  imageTopLeft: {
    top: hp('-10.10%'), // -330 / 844
    left: wp('-35.64%'), // 100 / 390
  },
  imageTopRight: {
    top: hp('-22.51%'), // -190 / 844
    right: wp('33.33%'), // 130 / 390
  },
  imageTopRight2: {
    top: hp('0.92%'), // 50 / 844
    right: wp('38.46%'), // 150 / 390
  },
  imageCenter: {
    top: hp('-10%'), // '20%'
    left: wp('15%'), // '15%'
  },
  imageCenterRight: {
    top: hp('-35.55%'), // -300 / 844
    right: wp('5.69%'), // -30 / 390
  },
  imageBottomLeft: {
    bottom: hp('27.91%'), // 320 / 844
    left: wp('34.13%'), // 20 / 390
  },
  imageBottomRight: {
    bottom: hp('23%'), // 0 / 844
    right: wp('-10.26%'), // -40 / 390
    width: wp('25.64%'), // 100 / 390
    height: wp('25.64%'),
  },
  // Text Styles
  textContainer: {
    position: 'absolute',
    bottom: hp('17.77%'), // 150 / 844
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  textHighestZIndex: {
    zIndex: 999, // Highest zIndex to ensure text is on top
  },
  welcomeText: {
    fontSize: wp('12.26%'), // 40 / 390
    fontWeight: '900',
    color: '#000',
  },
  titleText: {
    fontSize: wp('10.26%'), // 40 / 390
    fontWeight: '900',
    color: '#000',
  },
  descriptionText: {
    fontSize: wp('6.15%'), // 24 / 390
    color: '#666',
    textAlign: 'center',
    marginTop: hp('0.59%'), // 5 / 844
  },
});