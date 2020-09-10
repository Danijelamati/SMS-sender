import React from 'react';
import { Modal, Alert, View, Text, TouchableOpacity } from 'react-native';

import sendSMS from "../../util/sendSMS";
import { allEvents } from "../../util/calendar";
import { generaliseEvents } from "../../util/util";

function SendModal(props) {

    const {homeStyles, sendModal, setSendModal, message, startTime, endTime, generalMess } = props;

    const SendNotification = async (start, end, mess) => {
        let events = await allEvents(start.toISOString(), end.toISOString());

        if(events.length === 0){
          Alert.alert(
              "Upozorenje",
              "Nemogu poslati obavijest zbog nedovoljnog broja termina."
          );
          return;
        }

        if(message.length === 0){
          Alert.alert(
              "Upozorenje",
              "Poruka nemože biti prazna."
          );
          return;
        }

        if(generalMess && (message.match(/DATUM/i || message.match(/TERMIN/i)))){
          Alert.alert(
            "Upozorenje",
            "U generalnoj poruci nemogu biti DATUM i TERMIN."
        );
        return;
        }        

        if(generalMess && events.length > 1){
          events= generaliseEvents(events);          
        }
        
        sendSMS(mess, events);
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