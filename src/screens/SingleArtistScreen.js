import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Button} from 'react-native';
import {artistImages} from '../components/ArtistImages';
import {useSelector, useDispatch} from 'react-redux';

const stringify = data => {
  return JSON.parse(JSON.stringify(data));
};

const SingleArtistScreen = ({route}) => {
  /* Get the param */
  const {item} = route.params;

  // Redux State Management
  const {tokenValue} = useSelector(state => state.token);
  const dispatch = useDispatch();

  const apiUrl = 'http://10.0.2.2:8000/api/artists/';

  const deleteArtist = (artistId, token) => {
    const deleteAttempt = async () => {
      try {
        const response = await fetch(apiUrl + artistId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        const json = await response.json();
        const responseStatus = response.status;

        // Check status code
        if (responseStatus === 200) {
          alert('Artist deleted successfully');
          navigation.navigate('HomeScreen');
        } else if (responseStatus >= 400 && responseStatus < 500) {
          alert('Page not found');
        } else if (responseStatus >= 500) {
          alert('Server Error');
          console.log(json)
        }
      } catch (error) {
        console.error(error);
      }
    };

    deleteAttempt();
  };

  return (
    <View>
      <View style={{height: 200}}>
        <ImageBackground
          source={artistImages.artists[item.artist_img]}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.darkLayer}>
            <Text style={styles.title}>{stringify(item.artist_name)}</Text>
            <View style={styles.artistInfos}>
              <Text style={{color: 'white', marginRight: 10, fontSize: 20}}>
                {stringify(item.artist_concert_date)}
              </Text>
              <View style={styles.verticalLine}></View>
              <View>
                <Text style={{color: 'white'}}>
                  {stringify(item.artist_concert_time)}
                </Text>
                <Text style={{color: 'white'}}>
                  Scène n°{stringify(item.stage_id)}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <Text>{stringify(item.artist_description)}</Text>
      </View>
      <View style={styles.container}>
        {tokenValue !== '' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Button
              title="Modifier"
              onPress={() => console.log('Modifier')}
              color="lightgreen"
              style={styles.button}
            />
            <Button
              title="Supprimer"
              onPress={() => deleteArtist(item.artist_id, tokenValue)}
              color="salmon"
              style={styles.button}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  darkLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 30,
  },
  artistInfos: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 50,
    marginTop: 40,
  },
  verticalLine: {
    height: 30,
    width: 3,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
      height: 100
  }
});

export default SingleArtistScreen;
