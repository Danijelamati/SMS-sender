import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import { setObjectItem } from '../../util/storage';
import { todayDate, objectForThisDay } from "../../util/util";

function ActivateModul(props) {

    const [skipToday, setSkipToday] = useState(false);

    const { homeStyles, modalView, setModalView, handleActivity, info, setInfo, setEvents, setNotToday} = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalView}
            onRequestClose={() => setModalView(false)}
        >
            <View style={homeStyles.modal}>
                <View style={homeStyles.modalView}> 
                    <View style={homeStyles.modalTextContainer}>
                        <Text style={homeStyles.textLarge}>Upozorenje</Text> 
                        <Text style={homeStyles.text}>Vrijeme za automatsko slanje je prošlo, želite li preskočiti slanje danas?</Text>
                        {
                            skipToday ?
                            <Text style={{...homeStyles.text, paddingTop: "10%"}}>Danas preskačem slanje</Text>
                            :
                            <Text style={{...homeStyles.text, paddingTop: "10%"}}>Danas nepreskačem slanje</Text>
                        }
                    </View>   
                    <View style={homeStyles.modalButtons}>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => setSkipToday(true)}
                        >
                        <Text style={homeStyles.modalButtonText}>Preskoči</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => setSkipToday(false)}
                        >
                        <Text style={homeStyles.modalButtonText}>Nepreskači</Text>
                        </TouchableOpacity>
                    </View>                 
                    
                    <View style={homeStyles.modalButtons}>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={async() =>{

                            if(skipToday){
                                const obj = objectForThisDay();
                                obj[todayDate()] = true;                                
                                await setObjectItem("noToday", obj);
                                await setObjectItem("info", {...info, enabled: true});
                                setInfo(inf =>{
                                    return {...inf, "enabled": true};
                                });
                                setNotToday(true);
                                setModalView(false);   
                                return;                             
                            }

                            handleActivity( info.enabled, setInfo, setEvents);
                            setModalView(false);
                            
                        }}
                        >
                        <Text style={homeStyles.modalButtonText}>Uključi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={homeStyles.modalButton}
                        onPress={() => setModalView(false)}
                        >
                        <Text style={homeStyles.modalButtonText}>Odbaci</Text>
                        </TouchableOpacity>
                    </View>                      
                </View>                  
            </View>

        </Modal>
    );
}

export default ActivateModul;