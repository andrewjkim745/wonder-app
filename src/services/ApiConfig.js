import firebase from 'react-native-firebase';

export const login = ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((value) => console.log(value))
        .then(() => console.log('Sign In Success'))
}

export const signUp = ({ email, password, displayName }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log(userInfo)
            .then(() => console.log('Create Account Success'))
        })

}

export const signOut = (onSignedOut) => {
    firebase.auth().signOut()
        .then(() => console.log('Signed Out Success'))
}

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}