import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TextInput,
    Alert,
  } from 'react-native';
import { artistImages } from '../components/ArtistImages'
import {SafeAreaView} from 'react-native-safe-area-context';

const stringify = data => {
    return JSON.parse(JSON.stringify(data))
}

const AddArtistScreen = ({ route }) => {
    /* Get the param */
    // const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Ajouter un artiste</Text>
            <SafeAreaView
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
            }}>
            <TextInput
              style={styles.input}
              value={""}
              placeholder="Nom de l'artiste"
            />
            <Button
              title="Ajouter"
              onPress={() => console.log('Do smthing')}
              color="salmon"
              style={styles.button}
            />
          </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    borderRadius: 50,
  },
});

export default AddArtistScreen
