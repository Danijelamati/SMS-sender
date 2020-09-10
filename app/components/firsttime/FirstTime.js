import React ,{useContext, useState } from 'react';
import { View, Text, BackHandler, Dimensions, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";

import { AppContext } from "../../App";
import style from "../../styles/FirstTimeStyles";

import { setObjectItem } from "../../util/storage";
import { useFocusEffect } from '@react-navigation/native';
import ChangeTextModal from './ChangeTextModal';

const { width } = Dimensions.get("window")
const firstTimeStyles = style(width);

const defaultText = "Podsjećamo vas na vaš termin sutra u TERMIN";

const defaultObj = {
    text: defaultText,
    time: new Date(),
    enabled: false
};

defaultObj.time.setHours(17);
defaultObj.time.setMinutes(0);
defaultObj.time.setSeconds(0);

function FirstTime({navigation}) {
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [information, setInformation] = useState(defaultObj);
    const [textModal, setTextModal] = useState(false);

    const appContext = useContext(AppContext);
    const { setInfo } = appContext;
        
    useFocusEffect( 
        () => {
          BackHandler.addEventListener('hardwareBackPress', () => true);
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', () =>  true);
          }
        },[]
      ); 

    const finish = async( setInf, obj) => {
        try {
                        
            await setObjectItem("info", obj);   
            
            setInf( () => obj);        
            navigation.navigate("Home");
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={firstTimeStyles.container}>

            <View style={firstTimeStyles.infoContainer}>
                <View style={{...firstTimeStyles.half, flex: 7}}>
                <Text style={firstTimeStyles.title}>Text poruke:</Text>
                <Text style={firstTimeStyles.text}>
                    {information.text}
                </Text>
                </View>
                <View style={{...firstTimeStyles.half, flex: 3}}>
                <Text style={firstTimeStyles.text}>
                    Automatsko slanje će početi u {moment(information.time).format("HH:mm")}             
                </Text>
                </View>
            </View> 
            <View style={firstTimeStyles.buttons}>
                <TouchableOpacity
                style={firstTimeStyles.button}
                onPress={() => setTextModal(true) }
                >
                <Text style={firstTimeStyles.buttonText}>Text poruke</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={firstTimeStyles.button}
                onPress={() => setDatePickerVisibility(() => true)}
                >
               <Text style={firstTimeStyles.buttonText}>Izaberi vrijeme</Text>
                </TouchableOpacity>            
            </View>
            <View style={firstTimeStyles.buttons}>
                <TouchableOpacity
                style={firstTimeStyles.button}
                onPress={() => finish(setInfo, information) }
                >
                <Text style={firstTimeStyles.buttonText}>Spremi i nastavi</Text>
                </TouchableOpacity>                
            </View>           

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={information.time}
                onConfirm={(date) =>{
                    setDatePickerVisibility(false);
                    setInformation( inf => {
                        return {...inf, time: date};
                      }); 
                    
                } }
                onCancel={() => setDatePickerVisibility(false)}
            />     

            <ChangeTextModal firstTimeStyles={firstTimeStyles} textModal={textModal} setTextModal={setTextModal} information={information} setInformation={setInformation} />
            
        </View>
    );
}

export default FirstTime;
