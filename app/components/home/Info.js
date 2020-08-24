import React from 'react';
import { View, Text } from 'react-native';
import moment from "moment-timezone";


import { countNums, compareEvents} from "../../util/util";

function Info(props) {

    const {homeStyles, info, notToday, events, sentEvents } = props;
    
    const compared = compareEvents(events, sentEvents);
    
    
    return (        
        <View style={homeStyles.information}>
        {
          info.enabled ? 
          <Text style={homeStyles.infoText}>Aplikacija trenutno radi</Text>  
          :
          <Text style={homeStyles.infoText}>Aplikacija trenutno neradi</Text>
        }  
        {
          !info.enabled ? 
          null
          :
          <Text style={homeStyles.infoText}>Šaljem poruke u {moment(info.time).format("HH:mm")}</Text>   
        }
        {
          <Text style={homeStyles.infoText}>Danas poslano {countNums(sentEvents)} poruka i {countNums(compared)} u pripremi</Text>
        }
        {
          notToday ?
          <Text style={homeStyles.infoText}>Danas preskačem sa slanjem</Text>
          :
          null
        }          
        </View>   
    );
}

export default Info;