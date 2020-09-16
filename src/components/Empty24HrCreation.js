// Library IMPORTS
import React from 'react';
import {Text} from 'react-native';
import moment from 'moment';

// PATHS


// ***********************************************************************************************
// In order to initialize an empty scheduler in the Agenda component
// I've had to run the function IS THIS THE BEST METHOD??
// and if so should it be in a better lifecycle method...
let Empty24HrCreation=(
        Template=()=>{
          let hourlyArr=[];
            
            // ALSO the fact that I'm hard coding a lenth to represent the 24hr cycle bothers me !!
            // does MOMENT's library provide with a better way to represent the array of hours
            for(let i=0;i<=23;i++){
                hourlyArr.push(
                    <Text style={{fontSize:21}}>
                        {moment(`${i}`,'HH').format('hh:00 A')}
                    </Text>
                );
            };
          return hourlyArr;
        }
)();

export default Empty24HrCreation;