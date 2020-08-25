import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import { setObjectItem } from "../../util/storage";

function WarningModal(props) {  

    const {messStyles, warningModal, setWarningModal, info, setInfo, timeToConsider, setDatePickerVisibility} = props;

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={warningModal}
                onRequestClose={() => {setWarningModal(false)}}
            >
               <View style={messStyles.modal}>
                 <View style={messStyles.modalView}> 
                  <View style={messStyles.modalTextContainer}>
                    <Text style={messStyles.modalText}>Vrijeme automatskog slanja je već prošlo ako izaberete ovo vrijeme termini će se početi slati odmah</Text>
                  </View>
                  <View style={messStyles.modalButtons}>
                    <TouchableOpacity
                      style={messStyles.modalButton}
                      onPress={async() =>{
                        console.log("timetoconsider", timeToConsider);
                        await setObjectItem("info", {...info, time: timeToConsider});
                        setInfo((inf) => {
                            return {...inf, time: timeToConsider};
                        });
                        setWarningModal(false);
                        setDatePickerVisibility(false);
                      }}
                    >
                      <Text style={messStyles.buttonText}>Nastavi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={messStyles.modalButton}
                      onPress={() =>{
                        setWarningModal(false);
                        setDatePickerVisibility(false);
                      } }                        
                    >
                      <Text style={messStyles.buttonText}>Odbaci</Text>
                    </TouchableOpacity>
                  </View>                    
                 </View>
                  
               </View>
            </Modal>
    );
}

export default WarningModal;