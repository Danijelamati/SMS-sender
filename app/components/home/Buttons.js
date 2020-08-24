import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

function Buttons(props) {

const {homeStyles, navigation, sendNow, skipToday, notToday, setNotToday } = props;

    return (
        <View style={homeStyles.buttonsContainer}>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("MessageScreen")}
            >
              <Text style={homeStyles.text}>Postavke poruke</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("SendNotification")}
            >
              <Text style={homeStyles.text}>Pošalji obavijest</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => sendNow()}
            >
              <Text style={homeStyles.text}>Pošalji sada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => skipToday(notToday, setNotToday)}
            >
              <Text style={homeStyles.text}>Preskoči danas</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            
              <TouchableOpacity 
              style={homeStyles.button}
              onPress={() => navigation.navigate("About")}
              >            
                <Text style={homeStyles.text}>O aplikaciji</Text>             
              </TouchableOpacity> 
            
          </View>
          
        </View>
    );
}

export default Buttons;