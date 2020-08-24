import React from 'react';
import { Modal, Alert, View, Text, TouchableOpacity } from 'react-native';

import sendSMS from "../../util/sendSMS";
import { allEvents } from "../../util/calendar";

function SendModal(props) {

    const {homeStyles, sendModal, setSendModal, message, startTime, endTime } = props;

    const SendNotification = async (start, end, mess) => {
        const getEvents = await allEvents(start.toISOString(), end.toISOString());

        if(getEvents.length === 0){
          Alert.alert(
              "Upozorenje",
              "Nemogu poslati obavijest zbog nedovoljnog broja termina."
          )
        }
        sendSMS(mess, getEvents);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={sendModal}
            onRequestClose={() => setSendModal(false)}
        >
            <View style={homeStyles.modal}>
                <View style={homeStyles.modalView}> 
                  <View style={homeStyles.modalTextContainer}>
                    <Text style={homeStyles.modalText}>
                        {message}
                    </Text>                    
                  </View>
                  <View style={homeStyles.modalButtons}>
                    <TouchableOpacity
                      style={homeStyles.modalButton}
                      onPress={() =>{
                        SendNotification(startTime,endTime,message);
                        setSendModal(false);
                      }}
                    >
                      <Text style={homeStyles.buttonText}>Pošalji</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={homeStyles.modalButton}
                      onPress={() => {
                        setSendModal(false);
                      }}
                    >
                      <Text style={homeStyles.buttonText}>Odbaci</Text>
                    </TouchableOpacity>
                  </View>                    
                 </View>
                  
               </View>

        </Modal>
    );
}

export default SendModal;