import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { artistImages } from '../components/ArtistImages'

const stringify = data => {
    return JSON.parse(JSON.stringify(data))
}

const SingleArtistScreen = ({ route }) => {
    /* Get the param */
    const { item } = route.params;

    return (
        <View>
            <View style={{ height: 200 }}>
                <ImageBackground source={artistImages.artists[item.artist_img]} resizeMode="cover" style={styles.image}>
                    <View style={styles.darkLayer}>
                        <Text style={styles.title}>{stringify(item.artist_name)}</Text>
                        <View style={styles.artistInfos}>
                            <Text style={{ color: 'white', marginRight: 10, fontSize: 20 }}>{stringify(item.artist_concert_date)}</Text>
                            <View style={styles.verticalLine}></View>
                            <View>
                                <Text style={{ color: 'white' }}>{stringify(item.artist_concert_time)}</Text>
                                <Text style={{ color: 'white' }}>Scène n°{stringify(item.stage_id)}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.container}>
                <Text>{stringify(item.artist_description)}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    darkLayer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 30
    },
    artistInfos:{
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
    }
});

export default SingleArtistScreen
