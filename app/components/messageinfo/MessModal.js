import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

import { setObjectItem } from "../../util/storage";

function MessModal(props) {
    
    const {messStyles, modalVisible, setModalVisible, info, setInfo} = props;
    const [tempMessage, setTempMessage] = useState(info.text);   
  
    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(false)}}
            >
               <View style={messStyles.modal}>
                 <View style={messStyles.modalView}> 
                  <View style={messStyles.modalTextContainer}>
                    <TextInput
                      value={tempMessage}
                      style={messStyles.modalText}
                      multiline={true}
                      onChangeText={(value) => setTempMessage(value)}> 
                    </TextInput>
                  </View>
                  <View style={messStyles.modalButtons}>
                    <TouchableOpacity
                      style={messStyles.modalButton}
                      onPress={async() =>{
                        await setObjectItem("info", {...info, text:tempMessage});
                        setInfo((inf) => {
                            return {...inf, text: tempMessage};
                        });
                        setModalVisible(false);
                      }}
                    >
                      <Text style={messStyles.buttonText}>Spremi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={messStyles.modalButton}
                      onPress={() => setModalVisible(false)}                        
                    >
                      <Text style={messStyles.buttonText}>Odbaci</Text>
                    </TouchableOpacity>
                  </View>                    
                 </View>
                  
               </View>
            </Modal>
    );
}

export default MessModal;