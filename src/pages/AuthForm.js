import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import { Button, Text } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';


const AuthForm = (props) => {

    
fullNameInput = (
<View>
    <TextInput
    style={styles.formInput}
    onChangeText={text => props.setFieldValue('fullName', text)}
    placeholder='Full Name'
    autoCapitalize={false}
    />
    <Text style={styles.validationText}>{props.errors.fullName}</Text>
</View>
);

const [secureText, setsecureText] = useState(true)
return (
        <View style={styles.container}>
            <Text h2 style={styles.header}>Welcome!</Text>
            {props.authMode === 'signup' ? fullNameInput : null}
            <TextInput
            style={styles.formInput}
            onChangeText={text => props.setFieldValue('email', text)}
            placeholder='Email'
            autoCapitalize={false}

            />
            <Text style={styles.validationText}> {props.errors.email}</Text>
            <TextInput
            style={styles.formInput}
            secureTextEntry={secureText}
            onChangeText={text => props.setFieldValue('password', text)}
            placeholder='Password'
            autoCapitalize={false}

            />
            <Button 
                onPress={() => setsecureText(!secureText)} 
                title={secureText ? 'Show' : 'Hide'}
                buttonStyle={styles.loginButton}
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
    fontSize: 25,
    borderColor: '#fff',
    fontWeight: "800",
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
mapPropsToValues: () => ({ email: '', password: '', fullName: '' }),
validationSchema: (props) => yup.object().shape({
email: yup.string().email().required(),
password: yup.string().min(8).required(),
fullName: props.authMode === 'signup' ?
    yup.string().min(5).required() : null
}),
handleSubmit: (values, { props }) => {
props.authMode === 'login' ? props.login(values) : props.signup(values)
},
})(AuthForm);