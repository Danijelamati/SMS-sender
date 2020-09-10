import React from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

function TextModal(props) {

    const { tempMessage, setTempMessage, modalVisible, setModalVisible, setMessage, homeStyles, saveMessage } = props;
    
    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(false)}}
            >
               <View style={homeStyles.modal}>
                 <View style={homeStyles.modalView}> 
                  <View style={homeStyles.modalTextContainer}>
                    <TextInput
                      value={tempMessage}
                      style={homeStyles.modalTextInput}
                      multiline={true}
                      onChangeText={(value) => setTempMessage(value)}> 
                    </TextInput>
                  </View>
                  <View style={homeStyles.modalButtons}>
                    <TouchableOpacity
                      style={homeStyles.modalButton}
                      onPress={() =>{
                        setMessage( () => tempMessage);
                        saveMessage(tempMessage);
                        setModalVisible(false);                        
                      }}
                    >
                      <Text style={homeStyles.buttonText}>Spremi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={homeStyles.modalButton}
                      onPress={() => {
                        setModalVisible(false);                       
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

export default TextModal;