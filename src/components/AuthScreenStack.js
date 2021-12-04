import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, ActivityIndicator, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const AuthStack = createStackNavigator();

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator initialRouteName="ConnectionScreen">
      <AuthStack.Screen name="ConnectionScreen" component={ConnectionScreen} options={{headerShown: false}}/>             
      <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/>             
      <AuthStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  )
};

export default AuthScreenStack
