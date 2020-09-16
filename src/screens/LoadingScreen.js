import React, { useEffect } from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import Center from '../components/Center'
import firebase from 'react-native-firebase'

export default function LoadingScreen({navigation}) {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
                navigation.navigate(user ? 'Auth' : 'Auth')
        })
    }, [])
    
    return (
        <Center>
            <Text>Loading...</Text>
            <ActivityIndicator size='large'></ActivityIndicator>
        </Center>
    )
}

const styles = StyleSheet.create({

})
