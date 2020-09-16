import React,{Component} from 'react';
import {TextInput,Dimensions} from 'react-native';
import {TouchableOpacity,ScrollView} from 'react-native-gesture-handler';

import itemsArr from '../components/Empty24HrCreation';


const {width}=Dimensions.get('window')
export default class EmptyDailyPlanner extends Component{
    render(){
        return(
            <ScrollView>
                {itemsArr.map((item, index)=>                                            
                    <TouchableOpacity
                        key={index}
                        style={{
                            backgroundColor: 'white',
                            width: width,
                            borderColor: 'black',
                            height:75
                        }}>
                        {item}
                        <TextInput 
                            placeholder={"...What's happenin"}
                            
                        />
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }
}