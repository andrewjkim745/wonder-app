import React, { Component } from 'react';
import { api } from '../services/ApiConfig'
import { StyleSheet, Text, View, KeyboardAvoidingView, StatusBar, AsyncStorage } from 'react-native';
import { Button, Input } from 'react-native-elements';

// IMPORT PATHS
import Empty24HrCreation from '../components/Empty24HrCreation';

export default class Registration extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        newId: "", 
        profilename: "",
        errorMsg: ""
    }

    handleRegister = () => {
        const {
            firstName,
            lastName,
            email,
            password
        } = this.state;
        
        const data = {
            // firstName,
            // lastName,
            email,
            password
        }
        // console.log('inside handleRegister', data)
        api
            .post("/signup", data)
// ****************************************************************************************************
// we need a fail safe for when a client is already registered and re-registers with same
// EMAIL theres a bug when this happens
            .then(response =>
                response.status === 200 ? this.props.navigation.navigate("Profile"//, {
                    // name:data.firstName,
                    // itemsArr:Empty24HrCreation
                //}
                ): this.state.errorMsg
        )
            .catch(() =>
                this.setState({ errorMsg: "There was an error registering the account" })
        );
    }

    handleLogin = () => {
        const {
            email,
            password
        } = this.state;
        const data = {
            email,
            password
        }
        // console.log('inside handleLogin', data)
        api
            .post("/signin", data)
            .then(response =>{
                // console.log(response),
                response.status === 200 ? this.props.navigation.navigate("HomePage",{
                    db: response.data
                }) : this.state.errorMsg
        })
            .catch((err) =>
                this.setState({ errorMsg: err })
        );
    }
    render() {
        return (
            <KeyboardAvoidingView  behavior = 'padding' style ={styles.container}>
                <StatusBar barStyle = 'light-content' />

                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}> Welcome Barista! </Text>
                </View>

                <View style = {styles.formContainer}>
                    {/* <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        value = {this.state.firstName}
                        style = {styles.input}
                        placeholder = 'First Name'
                        placeholderTextColor = 'black'
                        returnKeyType = 'next'
                        onSubmitEditing = {() => this.last_name.focus()}
                        onChangeText= {(firstName) => this.setState({firstName})}
                        autoCapitalize = 'words'
                        autoCorrect = {false}
                    /> */}
                    {/* <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        value = {this.state.lastName}
                        style = {styles.input}
                        placeholder = 'Last Name'
                        placeholderTextColor = 'black'
                        returnKeyType = 'next'
                        onSubmitEditing = {() => this.email.focus()}
                        onChangeText= {(lastName) => this.setState({lastName})}
                        autoCapitalize = 'words'
                        autoCorrect = {false}
                    /> */}
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        value = {this.state.email}
                        style = {styles.input}
                        placeholder = 'Email'
                        placeholderTextColor = 'black'
                        returnKeyType = 'next'
                        ref = {(input) => this.email = input}
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        onChangeText={(email) => this.setState({email})}
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        value = {this.state.password}
                        style = {styles.input}
                        placeholder = 'Password'
                        placeholderTextColor = 'black'
                        secureTextEntry
                        returnKeyType = 'go'
                        ref = {(input) => this.passwordInput = input}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Text style = {styles.passwordText}>Password must be at least 8 characters long and contain a number.</Text>
                    <Button
                        title = 'Sign Up!'
                        titleStyle = {{
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                        buttonStyle = {{
                            backgroundColor: 'transparent',
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        onPress = {() => this.handleRegister()}
                    />
                    
                    {/*This is the sign up button*/}
                    <Button
                        title = 'Sign In!'
                        titleStyle = {{
                            color: 'black',
                            fontWeight: 'bold'
                        }}
                        buttonStyle = {{
                            backgroundColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: 'white',
                            marginTop: 10
                        }}
                        // testing how to change screens
                        onPress={() => this.handleLogin()}
                    />
                    <Text>{this.state.errorMsg}</Text>
                </View>

                <View style = {styles.buttons}>
                    <Button
                        // onPress={() => this.props.navigation.navigate('FacebookLogin')}
                        // title = 'Back'
                        titleStyle = {{
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                        buttonStyle = {{
                            backgroundColor: 'transparent',
                            borderColor: 'black',
                            width: 100,
                        }}
                        // icon = {{
                        //     type: 'font-awesome',
                        //     name: 'arrow-left',
                        //     size: 15,
                        // }}
                    />
                </View>
            </KeyboardAvoidingView>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30EA8A',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    formContainer:{
        justifyContent: 'space-around',
        marginHorizontal: 50,
        height: 300,
    },
    input: {
        backgroundColor: 'transparent',
        borderColor: 'black',
        width: 100,
    },
    passwordText:{
        color: '#494C4A',
        marginHorizontal: 15
    }
})