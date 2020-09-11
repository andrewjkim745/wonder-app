import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import { Button, Text } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';

const AuthForm = (props) => {

displayNameInput = (
<View>
    <TextInput
    style={styles.formInput}
    onChangeText={text => props.setFieldValue('displayName', text)}
    placeholder='Display Name'
    autoCapitalize={false}
    />
    <Text style={styles.validationText}>{props.errors.displayName}</Text>
</View>
);

return (
        <View style={styles.container}>
            <Text h2 style={styles.header}>Welcome!</Text>
            {props.authMode === 'signup' ? displayNameInput : null}
            <TextInput
            style={styles.formInput}
            onChangeText={text => props.setFieldValue('email', text)}
            placeholder='Email'
            autoCapitalize={false}

            />
            <Text style={styles.validationText}> {props.errors.email}</Text>
            <TextInput
            style={styles.formInput}
            secureTextEntry={true}
            onChangeText={text => props.setFieldValue('password', text)}
            placeholder='Password'
            autoCapitalize={false}

            />
            <Text style={styles.validationText}> {props.errors.password}</Text>
            <Button
            onPress={() => props.handleSubmit()}
            buttonStyle={styles.loginButton}
            title={props.authMode === 'login' ? 'Login' : 'Create Account'} />
            <Button
            backgroundColor='transparent'
            color='black'
            buttonStyle={styles.switchButton}
            onPress={() => props.switchAuthMode()}
            title={props.authMode === 'login' ? 'Create an Account' : 'Already a member?'} />
        </View>
    );
}

const styles = StyleSheet.create({
header: {
marginBottom: 60
},
container: {
flex: 1,
backgroundColor: '#30EA8A',
justifyContent: 'center',
alignItems: 'center',
},
validationText: {
marginTop: 8,
marginBottom: 16,
color: 'red',
alignSelf: 'center'
},
formInput: {
width: 300,
height: 50,
borderColor: '#fff',
borderWidth: 1,
marginBottom: 16,
padding: 8
},
loginButton: {
width: 200,
marginBottom: 16,
backgroundColor: '#30EA8A',
borderWidth: 1,
borderRadius: 10,
borderColor: 'white'
},
switchButton: {
width: 200,
backgroundColor: '#30EA8A',
borderWidth: 1,
borderRadius: 10,
borderColor: 'white'
}
});

export default withFormik({
mapPropsToValues: () => ({ email: '', password: '', displayName: '' }),
validationSchema: (props) => yup.object().shape({
email: yup.string().email().required(),
password: yup.string().min(2).required(),
displayName: props.authMode === 'signup' ?
    yup.string().min(5).required() : null
}),
handleSubmit: (values, { props }) => {
props.authMode === 'login' ? props.login(values) : props.signup(values)
},
})(AuthForm);