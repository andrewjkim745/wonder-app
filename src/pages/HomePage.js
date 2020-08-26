import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';

const { width, height } = Dimensions.get('window')

import EmptyDailyPlanner from '../components/EmptyDailyPlanner';
import ClientList from './ClientList';

export default class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            // name:this.props.navigation.state.params.name,
            date:moment().format('YYYY-MM-DD'),
            //itemsArr: //this.props.navigation.state.params.itemsArr
        }
    }

    static navigationOptions = {
        title: 'My Schedule',
        headerStyle: {
          backgroundColor: '#30EA8A',
        },
        headerRight: ()=>{(
            <Button
                onPress={() => alert('This is a button!')}
                title = {null}
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

    render() {
        let currDate= this.state.date;
        let itemsArr=this.state.itemsArr;
        var pair = {
            [currDate]: [itemsArr]
        };
        let itemsObj={[currDate]:[]};

        let selectedDate;

        console.log('this is the selected date : ',currDate)
        return(
            <View style = {styles.container}>
            
                <ImageBackground 
                    source = {require('../assets/homeCoffee.jpg')} 
                    style = {{width: width, height: 200,}}
                >
                    {/* <Text style = {styles.imageText}>{this.state.name}</Text> */}
                </ImageBackground>

                <View style = {styles.dateContainer}>
                    <Agenda 
                        selected={currDate}
                        loadItemsForMonth={(month) => {
                            // This prop gets triggered during scrolling potential to drive up
                            // API cost
                            // console.log('API CALL PROBABLY SHOULD HAPPEN HERE TO COLLECT ALL DATA')
                        }}
                        pastScrollRange={3}
                        futureScrollRange={3}
                        onDayPress={(day)=>{selectedDate=day}}                      
                        items={
                            {...itemsObj, ...pair}
                        }
                        renderDay={(day, item)=>{
                            // I dont like that ITEM written above is the entire arr(this.state.itermArr)
                            // hence why below we are iterating through state
                            // this prop assumes only to render one item per day....IS THIS THE BEST WAY???
                            console.log(selectedDate);
                            return (
                                <View style={{alignItems:'center',backgroundColor:'white'}}>
                                    <View>
                                        <Text style={{fontSize:41}}>{moment(day.dateString).format('Do')}</Text>
                                        <Text style={{fontSize:20}}>{moment(day.dayString).format('MMM')}</Text>
                                    </View>
                                    <View>
                                        {/* <ClientList
                                            d={day}
                                            db={this.props.navigation.state.params.db}
                                        /> */}
                                        <EmptyDailyPlanner />
                                    </View>
                                </View>
                            );
                        }}
                        renderEmptyData={()=>{
                            return(
                                <View>
                                    <View style={{alignItems:'center',backgroundColor:'white'}}>
                                        <Text style={{fontSize:41}}>{moment(selectedDate.dateString).format('Do')}</Text>
                                        <Text style={{fontSize:20}}>{moment(selectedDate.dateString).format('MMM')}</Text>
                                    </View>
                                    <View>
                                        <EmptyDailyPlanner />
                                    </View>
                                </View>
                            )
                        }}
                        theme={{
                            agendaDayTextColor: 'black',
                            agendaDayNumColor: 'green',
                            agendaTodayColor: 'red',
                            agendaKnobColor: 'blue'
                        }}
                        style={{}}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    dateSelector:{
        width: '100%',
        height: '5%',
        backgroundColor: 'orange',
    },
    dateContainer:{
        flex: 3,
        backgroundColor: 'gray',
        justifyContent: 'center',
        width: '100%',
    },
    dateHeader: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 4
    },
    dateFooter: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 6
    },
})