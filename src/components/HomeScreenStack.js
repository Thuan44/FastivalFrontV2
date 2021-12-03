import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, ActivityIndicator, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SingleArtistScreen from '../screens/SingleArtistScreen';

const HomeStack = createStackNavigator();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />             
      <HomeStack.Screen name="SingleArtistScreen" component={SingleArtistScreen} />
    </HomeStack.Navigator>
  )
};

export default HomeScreenStack
