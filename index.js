/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import Voice from './src/components/VoiceTest';
import Location from './src/components/location';
import Emergency from './src/components/Emergency';
import Routes from './src/components/Routes';

const App = () =>(
    <Routes/>
);

AppRegistry.registerComponent(appName, () => App);
