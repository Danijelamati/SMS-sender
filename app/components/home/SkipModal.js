import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

function SkipModal(props) {


    const { homeStyles, skipModal, setSkipModal, setNotToday, skipToday} = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={skipModal}
            onRequestClose={() => setSkipModal(false)}
        >
            <View style={homeStyles.modal}>
                <View style={homeStyles.modalView}> 
                    <View style={homeStyles.modalTextContainer}>
                        <Text style={homeStyles.textLarge}>Upozorenje</Text> 
                        <Text style={homeStyles.text}>Ako uključite sada slanje aplikacija će slati poruke za danas (ako ih ima) i slat će sve naknadne poruke za danas</Text>                        
                    </View>    
                    
                    <View style={homeStyles.modalButtons}>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => {
                            setSkipModal(false);
                            skipToday(true, setNotToday);
                        }}
                        >
                        <Text style={homeStyles.modalButtonText}>Uključi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => setSkipModal(false)}
                        >
                        <Text style={homeStyles.modalButtonText}>Odbaci</Text>
                        </TouchableOpacity>
                    </View>                      
                </View>                  
            </View>

        </Modal>
    );
}

export default SkipModal;