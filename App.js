import Header from './src/components/Header'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabMenu from './src/components/TabMenu';
import { TabView } from 'react-native-elements';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header title="FASTIVAL" />
        <TabMenu />
      </View>
    </NavigationContainer>
    // <View>
    //   <Text>Hello World</Text>
    // </View>
  )
}

export default App


/** Style */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


