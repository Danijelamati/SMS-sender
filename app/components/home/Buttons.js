import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from "moment-timezone";

function Buttons(props) {

const {homeStyles, navigation, skipToday, notToday, setNotToday, setSendModal, setRefresh, setSkipModal, info} = props;

    return (
        <View style={homeStyles.buttonsContainer}>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("MessageScreen")}
            >
              <Text style={homeStyles.buttonText}>Postavke poruke</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => {
                if(notToday && info.enabled && moment(info.time) < moment()){ 
                  setSkipModal(true);
                  return;
                }
                skipToday(notToday, setNotToday)}}
            >
              <Text style={homeStyles.buttonText}>Preskoči danas</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => setSendModal(true)}
            >
              <Text style={homeStyles.buttonText}>Pošalji sada</Text>
            </TouchableOpacity>            
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("SendNotification")}
            >
              <Text style={homeStyles.buttonText}>Pošalji obavijest</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            <TouchableOpacity 
              style={homeStyles.button}
              onPress={() => setRefresh(x => x+1)}
              >            
                <Text style={homeStyles.buttonText}>Osvježi</Text>             
            </TouchableOpacity>  
            <TouchableOpacity 
                style={homeStyles.button}
                onPress={() => navigation.navigate("About")}
                >            
                  <Text style={homeStyles.buttonText}>O aplikaciji</Text>             
            </TouchableOpacity>              
          </View>
          
        </View>
    );
}

export default Buttons;