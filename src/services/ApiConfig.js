import firebase from 'react-native-firebase';

export const login = ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((value) => console.log(value))
        .then(() => console.log('Sign In Success'))
}

export const signUp = async ({ email, password, fullName }) => {
    console.log('sign up great success', email,fullName);
    const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    await userCred.user.updateProfile({
        displayName: fullName
    });

    return userCred
    // console.log(userCred);
    // await userCred.user.sendEmailVerification();
    // return await firebase.auth().signOut();
}

export const signUpUser = async ({ email, password, firstName, lastName }) => {
    const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    await userCred.user.updateProfile({
        displayName: `${firstName}+${lastName}`
    });
    await userCred.user.sendEmailVerification();
    return await firebase.auth().signOut();
};

export const signOut = (onSignedOut) => {
    firebase.auth().signOut()
        .then(() => console.log('Signed Out Success'))
}

export function updateAuth(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}

export function subscribeToAuthChanges() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        return user
    })
}


// export const signInUser = async ({ email, password }) =>
// 	firebase.auth().signInWithEmailAndPassword(email, password);
// export const sendEmailVerification = async () =>
// 	firebase.auth().currentUser.sendEmailVerification();
// export const sendPasswordReset = async (email) =>
// 	firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser ?  firebase.auth().currentUser.email : email);
// export const getAuthUser = () => firebase.auth().currentUser;
// export const signOut = () => firebase.auth().signOut();
// export const verifyActionCode = ({ actionCode, mode }) =>
// 	mode == 'resetPassword'
// 		? firebase.auth().verifyPasswordResetCode(actionCode)
// 		: firebase.auth().applyActionCode(actionCode);
// export const confirmPasswordReset = async ({ actionCode, newPassword }) =>
// 	firebase.auth().confirmPasswordReset(actionCode, newPassword);
// export const setAuthPersistence = async () => {
// 	try {
// 		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// 	} catch (error) {
// 		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// 		console.log(error);
// 	}
// };
// export const updateEmail = (email) => firebase.auth().currentUser.updateEmail(email);
// export const updatePassword = (password) => firebase.auth().currentUser.updatePassword(password);
// export const reAuth = (password) => {
// 	const user = firebase.auth().currentUser;
// 	const credential = firebase.auth.EmailAuthProvider.credential(
// 		user.email,
// 		password
// 	);
// 	return user.reauthenticateWithCredential(credential);
// };
// export const deleteAccount = () => firebase.auth().currentUser.delete();
