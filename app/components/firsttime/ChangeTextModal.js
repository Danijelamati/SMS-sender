import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

function ChangeTextModal(props) {
    
    const {firstTimeStyles, textModal, setTextModal, information, setInformation} = props;
    const [tempMessage, setTempMessage] = useState(information.text);    

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={textModal}
                onRequestClose={() => {setTextModal(false)}}
            >
               <View style={firstTimeStyles.modal}>
                 <View style={firstTimeStyles.modalView}> 
                  <View style={firstTimeStyles.modalTextContainer}>
                    <TextInput
                      value={tempMessage}
                      style={firstTimeStyles.modalText}
                      multiline={true}
                      onChangeText={(value) => setTempMessage(value)}> 
                    </TextInput>
                  </View>
                  <View style={firstTimeStyles.modalButtons}>
                    <TouchableOpacity
                      style={firstTimeStyles.modalButton}
                      onPress={() => {
                        setInformation( inf => {
                          return {...inf, text: tempMessage};
                        });
                        setTextModal(false);
                        }
                    }
                    >
                      <Text style={firstTimeStyles.buttonText}>Spremi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={firstTimeStyles.modalButton}
                      onPress={() => setTextModal(false)}                        
                    >
                      <Text style={firstTimeStyles.buttonText}>Odbaci</Text>
                    </TouchableOpacity>
                  </View>                    
                 </View>
                  
               </View>
            </Modal>
    );
}

export default ChangeTextModal;