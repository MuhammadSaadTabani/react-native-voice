/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button  , Easing, Animated } from 'react-native';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import {TransitionConfig} from 'react-navigation-transitions';
import Emergency from './Emergency';
import Login from './Login';



const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}


const AppNavigator = createStackNavigator(
  
  
  {
  HomeScreen: {
    screen: Emergency,
    navigationOptions : {
        header  : null
    }
  },
  Login: {
    screen: Login,
  },
  
}, {
    initialRouteName: 'Login',
    initialRouteParams: { transition: 'fade' },
   // transitionConfig: TransitionConfig,
   transitionConfig
});

export default createAppContainer(AppNavigator);