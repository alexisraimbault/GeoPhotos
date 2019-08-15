import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './homeScreen.js';
import PhotoScreen from './photoScreen.js'
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Photo: {screen: PhotoScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
