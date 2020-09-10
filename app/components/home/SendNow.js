import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

function SendNow(props) {
    
    const { homeStyles, sendNow, sendModal, setSendModal} = props;

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
                        <Text style={homeStyles.textLarge}>Upozorenje</Text> 
                        <Text style={homeStyles.text}>Jeste sigurni da želite poslati sada?</Text>
                        
                    </View>      
                    
                    <View style={homeStyles.modalButtons}>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => {
                            setSendModal(false);
                            sendNow();
                        } } 
                        >
                        <Text style={homeStyles.modalButtonText}>Pošalji</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => setSendModal(false)}
                        >
                        <Text style={homeStyles.modalButtonText}>Odbaci</Text>
                        </TouchableOpacity>
                    </View>                      
                </View>                  
            </View>

        </Modal>
    );
}

export default SendNow;