import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, LayoutAnimation} from 'react-native'
import Center from '../components/Center'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'react-native-firebase'

export default function HomeScreen() {
    const [email, setEmail] = useState('')
    const [displayName, setdisplayName] = useState('')

    useEffect(() => {
        console.log('this is the user',firebase.auth().currentUser);
        const user = firebase.auth().currentUser
        const email = user.email
        const displayName = user.displayName
        setEmail(email)
        setdisplayName(displayName)
    }, [email, displayName])

    const signOut = () => {
        firebase.auth().signOut()
    }

    LayoutAnimation.easeInEaseOut()
    // console.log(displayName);
    return (
        <Center>
            <Text>{email}</Text>
            <Text>{displayName}</Text>
            <TouchableOpacity onPress={signOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </Center>
    )
}
const styles = StyleSheet.create({})

