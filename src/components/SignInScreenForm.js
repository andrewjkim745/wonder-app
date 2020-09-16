// Libraries
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

// IMPORT PATHS
import Empty24HrCreation from '../components/Empty24HrCreation';

export default class SignInScreenForm extends Component{
    render(){
        return(
            <View>
                <Input 
                    containerStyle={{
                    width: 300,
                    }}
                    style={styles.input}
                    placeholder='email'
                    placeholderTextColor='black'
                />
                <Input 
                    containerStyle = {{
                    width: 300,
                    }}
                    style={styles.input}
                    placeholder={'password'}
                    placeholderTextColor='black'
                />
            </View>
        )
    }
};

const styles=StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        borderColor: 'black',
        width: 100
    }
});