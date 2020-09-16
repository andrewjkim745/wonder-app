import React, { Component, useState } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import { Button, Input, Avatar, Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import { api } from '../services/ApiConfig';

const { width, height }=Dimensions.get('window');


export default class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state={
            f_name:'',
            l_name:'',
            serviceLocations:[{
                workStreet:'',
                workCity:'',
                workZip:Number,
                aka:''
            }],
            avatarPic: '',
            errMsg:''
        }
    }
    
    static navigationOptions={
        title: 'Create Profile',
        headerStyle: {
            backgroundColor: '#30EA8A',
        },
        headerRight: ()=>{(
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Save"
                    color="#fff"
                    icon = {{
                        type: 'font-awesome',
                        name: 'plus',
                    }}
                    buttonStyle = {{
                        backgroundColor: 'transparent',
                        marginRight: 14.5,
                    }}
                />
            )},
        headerLeft:()=>{null},
    }

    _handleReq=()=>{
        ImagePicker.showImagePicker({},(response) => {
            
            this.setState({
                avatarPic: response.uri
            })
        });
        
    }

    _onChange=(target, text)=>{
        this.setState({
            [[target]]:text
        })
    }

    _submitProfile=()=>{
        let data={data: this.state};

        api
            .post("/createProfile", data)
            .then(r=>{
                const data=r.data;
                console.log(r.data);

                r.status===200?
                    this.props.navigation.navigate("HomePage",{
                        d: data
                    })
                    :
                    this.state.errMsg
            }).catch(() =>
            this.setState({ errorMsg: "Their was an error storing your profile. Please try again." })
            );
    }

    render(){
        let image=this.state.avatarPic?icon={name: 'user', type: 'font-awesome'}:source={uri:this.state.avatarPic}

        return(
            <View style={styles.container}>

                <Avatar
                    size='xlarge'
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    // {...image}
                    onPress={()=>{this._handleReq()}}
                    showAccessory
                />

                <View style={styles.formContainer}>

                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        placeholder = 'First Name'
                        placeholderTextColor = 'black'
                        onChangeText={(f_name)=>this._onChange('f_name', f_name)}
                    />
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        placeholder='Last Name'
                        placeholderTextColor = 'black'
                        onChangeText={(l_name)=>this._onChange('l_name', l_name)}
                    />
                    <Input 
                        containerStyle={{
                            width: 300,
                        }}
                        placeholder='Work Street Address'
                        placeholderTextColor='black'
                        onChangeText={(text)=>this._onChange('serviceLocations.workStreet',text)}
                        // rightIcon={{
                        //     type:'font-awesome', 
                        //     name: 'plus',
                        //     onPress: () => {<Overlay />}
                        // }}
                    />
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        placeholder='City'
                        placeholderTextColor='black'
                        onChangeText={(text)=>this._onChange('serviceLocations.workCity',text)}
                    />
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        placeholder='Zip Code'
                        placeholderTextColor='black'
                        onChangeText={(text)=>this._onChange('serviceLocations.workZip',text)}
                    />
                    <Input
                        containerStyle = {{
                            width: 300,
                        }}
                        placeholder='Known As'
                        placeholderTextColor='black'
                        onChangeText={(text)=>this._onChange('serviceLocations.aka',text)}
                    />
                    <Button
                        title='Save'
                        onPress={()=>{this._submitProfile()}}
                    />
                    <Text>{this.state.errMsg}</Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})
