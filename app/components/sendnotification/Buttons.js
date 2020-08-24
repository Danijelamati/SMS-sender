import React from 'react';
import { View,  Text,  TouchableOpacity } from 'react-native';

function Buttons(props) {

    const {homeStyles, showDatePicker, setModalVisible, setTempMessage, message, setSendModal} = props;

    return (
      <View style={homeStyles.buttonContainer}>
        <View style={homeStyles.segment}>
          <TouchableOpacity
            style={homeStyles.button}  
            onPress={() => showDatePicker("start")}            
          >
            <Text style={homeStyles.buttonText}>Početno vrijeme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyles.button}
            onPress={() => showDatePicker("end")}
          >
            <Text style={homeStyles.buttonText}>Krajnje vrijeme</Text>
          </TouchableOpacity>
        </View>
        <View style={homeStyles.segment}>
          <TouchableOpacity
            style={homeStyles.button}
            onPress={() => {
              setModalVisible(true);
              setTempMessage( () => message);
            }}
          >
            <Text style={homeStyles.buttonText}>Text poruke</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyles.button}
            onPress={() => setSendModal(true)}
          >
            <Text style={homeStyles.buttonText}>Pošalji</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default Buttons;