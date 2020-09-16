import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Promise } from 'bluebird';

export default class ClientList extends React.Component{
    constructor(props){
        super();

        this.state={
            list:[]
        }
    };

    componentDidMount(){
        
        this.setState({
            list:this.props.db.r
        });
    }

    
    render(){

        let dateSelect=`${this.props.d}`;
        let filteredList=[];
        let initList=this.state.list;

        // console.log(this.props.db.r);
        
        initList.forEach(function(ele){
            
            let schedStrng=ele.serviceLocations;
            // let nxt=schedStrng.service.date;

            schedStrng.forEach(el=>{
                // console.log(JSON.stringify(el.schedule));
                let schedArry=el.schedule;

                schedArry.forEach(e=>{
                    if(dateSelect.match(e.date)){
                        console.log(ele, e);
                        filteredList.push(ele);
                    };
                });
                // console.log(filteredList);
                // console.log('finished');
            })
            // console.log(`${ele.local.f_name}===> `, JSON.stringify(schedStrng));
            // if(dateSelect===ele['serviceLocations']['schedule']['date']){
            //     filteredList.push(ele);
            // }
        })

        // console.log(filteredList);
        return(
            <View>
                <ScrollView>
                    {
                        this.state.list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ 
                                    source: { url: l.local.avatarPic},
                                    style: { width: 40, height: 40 } 
                                }}
                                title={l.local.f_name}
                                subtitle={l.local.l_name}
                                bottomDivider
                            />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

}