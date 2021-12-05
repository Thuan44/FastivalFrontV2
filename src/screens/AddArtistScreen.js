import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import {artistImages} from '../components/ArtistImages';
import {SafeAreaView} from 'react-native-safe-area-context';

const stringify = data => {
  return JSON.parse(JSON.stringify(data));
};

const AddArtistScreen = ({route}) => {
  const [artistName, setartistName] = useState('');
  const [artistDescription, setartistDescription] = useState('');
  const [artistImage, setartistImage] = useState('');
  const [concertDate, setConcertDate] = useState(null);
  const [concertTime, setConcertTime] = useState(null);
  const [stageId, setStageId] = useState('');

  // Redux State Management
  const {tokenValue} = useSelector(state => state.token);
  const dispatch = useDispatch();

  const apiUrl = 'http://10.0.2.2:8000/api/artists';

  const addArtist = (
    artistName,
    artistDescription,
    artistImage,
    concertDate,
    concertTime,
    stageId,
    token,
  ) => {
    const addAttempt = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            artist_name: artistName,
            artist_description: artistDescription,
            artist_img: artistImage,
            artist_concert_date: concertDate,
            artist_concert_time: concertTime,
            stage_id: stageId,
          }),
        });

        const json = await response.json();
        const responseStatus = response.status;

        // Check status code
        if (responseStatus === 200) {
          alert('Artist added successfully');
        } else if (responseStatus >= 400 && responseStatus < 500) {
          alert('Page not found');
        } else if (responseStatus >= 500) {
          alert('Server Error');
        }
      } catch (error) {
        console.error(error);
      }
    };
    addAttempt();
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
        Ajouter un artiste
      </Text>
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
        }}>
        <TextInput
          style={styles.input}
          onChangeText={setartistName}
          value={artistName}
          placeholder="Nom de l'artiste"
        />
        <TextInput
          style={styles.input}
          onChangeText={setartistDescription}
          value={artistDescription}
          placeholder="Description de l'artiste"
        />
        <TextInput
          style={styles.input}
          onChangeText={setartistImage}
          value={artistImage}
          placeholder="Nom de l'image"
        />
        <TextInput
          style={styles.input}
          onChangeText={setConcertDate}
          value={concertDate}
          placeholder="Date (YYYY-MM-DD)"
        />
        <TextInput
          style={styles.input}
          onChangeText={setConcertTime}
          value={concertTime}
          placeholder="Heure (HH:MM:SS)"
        />
        <Picker
          selectedValue={stageId}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setStageId(itemValue)}>
          <Picker.Item value="0" label="Scène" />
          <Picker.Item label="Scène 1" value="1" />
          <Picker.Item label="Scène 2" value="2" />
          <Picker.Item label="Scène 5" value="5" />
        </Picker>
        <Button
          title="Ajouter"
          onPress={() =>
            addArtist(
              artistName,
              artistDescription,
              artistImage,
              concertDate,
              concertTime,
              stageId,
              tokenValue,
            )
          }
          color="salmon"
          style={styles.button}
        /> 
      </SafeAreaView>
    </View>
  );
};

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

export default AddArtistScreen;
