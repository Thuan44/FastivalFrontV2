import { useRoute } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const ConnectionScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userToken, setUserToken] = useState(null);
    const [connected, setConnected] = useState(false)

    const loginApiUrl = 'http://10.0.2.2:8000/api/login/'
    const logoutApiUrl = 'http://10.0.2.2:8000/api/logout/'

    const login = (email, password) => {
        // Fetch user data
        const loginAttempt = async () => {
            setLoading(true);
            try {
                const response = await fetch(loginApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        user_email: email,
                        user_password: password
                    })
                });

                const json = await response.json();
                console.log(json)
                const responseStatus = response.status

                // Check status code
                if (responseStatus === 201) {
                    alert('Logged in successfully.\n\nYour token is: \n' + json.token)
                    setUserToken(json.token)
                    setConnected(true)
                    // navigation.navigate('SingleArtistScreen', {item}

                } else if (responseStatus >= 400 && responseStatus < 500) {
                    alert('Wrong credentials, please try again')
                } else if (responseStatus >= 500) {
                    alert('Server Error')
                }
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loginAttempt()
    }

    const logout = async (token) => {
        try {
            const response = await fetch(logoutApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const json = await response.json();
            alert(json.message)
            setUserToken("")
            setConnected(false)
        } catch (error) {
            console.error(error);
        }

    }


    // View
    if (!connected) {
        return (
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator /> : (

                    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', width: 200, }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bonjour !</Text>
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10 }}>Veuillez vous connecter pour accéder aux fonctionnalités administrateur.</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                        />
                        <Button
                            title="Se connecter"
                            onPress={() => login(email, password)}
                            color="salmon"
                            style={styles.button}
                        />
                        <Text onPress={() => console.log('Go to Sign Up Screen')} style={{ marginTop: 5 }}>S'enregistrer</Text>
                    </SafeAreaView>

                )}

            </View>
        );
    } // End if(!connected)
    else {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Oups !</Text>
                <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10 }}>Vous nous quittez déjà ?</Text>
                <Button
                    title="Se déconnecter"
                    onPress={() => logout(userToken)}
                    color="#c85a54"
                    style={styles.button}
                />
            </View>
        )
    }

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
        borderRadius: 5
    },
    button: {
        borderRadius: 50
    }
});

export default ConnectionScreen