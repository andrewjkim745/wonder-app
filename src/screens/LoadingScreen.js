import React, { useEffect } from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import Center from '../components/Center'
import { subscribeToAuthChanges } from '../services/ApiConfig'

export default function LoadingScreen({navigation}) {

    useEffect(() => {
        let user = subscribeToAuthChanges()
        onAuthStateChanged(user)
    }, [])
    
    const onAuthStateChanged = user => {
        if(user !== null) {
            navigation.navigate(user ? 'App' : 'Auth')
        }
    }
    return (
        <Center>
            <Text>Loading...</Text>
            <ActivityIndicator size='large'></ActivityIndicator>
        </Center>
    )
}

const styles = StyleSheet.create({

})
