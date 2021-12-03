import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, ActivityIndicator, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Card, ButtonGroup, Chip } from 'react-native-elements'
import { artistImages } from '../components/ArtistImages'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SingleArtistScreen from '../screens/SingleArtistScreen';

// const Stack = createNativeStackNavigator();


const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  // Top button group
  const topButtons = ['Programmation', 'Artistes']
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Fetch data method
  const getArtists = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/artists');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArtists();
  }, []);

  // Render lineup
  const renderLineUp = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.artist_id}>
        <Card containerStyle={{ marginBottom: -10, borderRadius: 5, padding: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.image}
              source={artistImages.artists[item.artist_img]}
            />
            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.artist_name}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginRight: 20 }}>Scène n°{item.stage_id}</Text>
                <Text>{item.artist_concert_time}</Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  // Render artist
  const renderArtistCard = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={{ width: '50%' }} onPress={() => console.log('Voir ' + item.artist_name)}>
        <Card containerStyle={{ padding: 0, borderRadius: 5, marginHorizontal: 5, marginVertical: 12 }}>
          <Card.Image
            style={{ width: '100%', height: 120, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            source={artistImages.artists[item.artist_img]}
          >
          </Card.Image>
          <Card.Title style={{ marginBottom: 10, marginTop: 10 }}>{item.artist_name}</Card.Title>
        </Card>
      </TouchableOpacity>
    )
  }


  // View
  return (

    <View style={styles.container}>

      {isLoading ? <ActivityIndicator /> : (
        <View>

          {/* Top Buttons */}
          <ButtonGroup
            onPress={setSelectedIndex}
            selectedIndex={selectedIndex}
            buttons={topButtons}
            selectedButtonStyle={{ backgroundColor: 'salmon' }}
            containerStyle={{
              height: 40, marginBottom: 20, borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.00,
              elevation: 1,
            }}
          />

          {selectedIndex === 0 ?

            // Programmation section
            <View>
              {/* Date chips */}
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableHighlight activeOpacity={0.6}>
                  <Chip title="Tous" buttonStyle={{ backgroundColor: 'salmon' }} onPress={() => console.log('All dates!')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.6}>
                  <Chip title="Jeu 25 Août" type="outline" titleStyle={{ color: 'salmon' }} buttonStyle={{ borderColor: 'salmon', borderWidth: 1, }} onPress={() => console.log('Jeudi')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.6}>
                  <Chip title="Ven 26 Août" type="outline" titleStyle={{ color: 'salmon' }} buttonStyle={{ borderColor: 'salmon', borderWidth: 1 }} onPress={() => console.log('Vendredi')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.6}>
                  <Chip title="Sam 27 Août" type="outline" titleStyle={{ color: 'salmon' }} buttonStyle={{ borderColor: 'salmon', borderWidth: 1 }} onPress={() => console.log('Samedi')} />
                </TouchableHighlight>
              </View>

              {/* List of artists */}
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.artist_id}
                renderItem={renderLineUp}
              />
            </View>

            :

            // Artist section
            <View>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'salmon', marginBottom: 10 }}>Tous les artistes</Text>

              {/* Cards of artists */}
              <FlatList
                key={2}
                data={data}
                renderItem={renderArtistCard}
                keyExtractor={(item, index) => item.artist_id}
                numColumns={2}
              />

            </View>
          }


        </View>

      )}

      {/* <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SingleArtistScreen" component={SingleArtistScreen} />
      </Stack.Navigator> */}
    </View> // Main View container
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 180,
  },
  image: {
    width: 140,
    height: 70,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  boxContainer: {
    width: '100%',
    height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  box: {
    width: '50%',
    height: '50%',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HomeScreen
