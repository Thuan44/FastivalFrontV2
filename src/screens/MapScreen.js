import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Text, Image } from 'react-native'

const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7ssZSVeRJ0KteJuo5HtgXM00NTihoCf0zA&usqp=CAU" };

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default MapScreen
