import React ,{useContext, useState, useEffect} from 'react';
import { View, Button, Text, TextInput, BackHandler } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { AppContext } from "../../App";

import { setObjectItem } from "../../util/storage";
import { useFocusEffect } from '@react-navigation/native';

const defaultText = "Podsjećamo vas na vas termin sutra u TERMIN";

const defaultObj = {
    text: "",
    time: new Date(),
    enabled: false
};

defaultObj.time.setHours(17);
defaultObj.time.setMinutes(0);
defaultObj.time.setSeconds(0);

function FirstTime({navigation}) {

    const [change, setChange] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [information, setInformation] = useState(defaultObj);
    const [changeText, setChangeText] = useState("");

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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date, sInf) => {
        hideDatePicker();
        sInf( inf => {
          return {...inf, time: date};
        });  
    };

    const finish = async(nav, setInf, obj, defText, setObject, notToday) => {
        try {
            if(obj.text === ""){
                obj.text = defText;
            }  
            
            await setObject("info", obj);            
            
            
            setInf( () => obj);        
            nav.navigate("Home");
            
        } catch (err) {
            console.log(err);
        }
        
        
    };

    useEffect(
        () => {
          BackHandler.addEventListener("hardwareBackPress", null);
        },[]
      );

    return (
        <View>
            {
            change ? 
            <TextInput
            value = {changeText}
            onChangeText = { txt => setChangeText(() => txt) }
            />          
            :
            <Text>{
                !information.text ? 
                defaultText.replace(/TERMIN/g, "17:00").replace(/DATUM/g, "17.04.1996") 
                : 
                information.text.replace(/TERMIN/g, "17:00").replace(/DATUM/g, "17.04.1996")}</Text>
            }
            {
            change ? 
            <>
                <Button 
                title = {"spremi"}
                onPress= {() =>{
                     setChange(() => false);
                     setInformation( inf => {
                         return {...inf, text: changeText};
                     })
                    }}
                />                    
                <Button
                title = {"vrati na staro"}
                onPress= {() => setChange(() => false)}
                />  
            </>      
            :
            <Button 
              title = {"promijeni"}
              onPress= {() =>{
                   setChange(() => true);
                   setChangeText( () => {
                    return !information.text ? defaultText : information.text ;
                   });
                }}
            />
            } 
            <Text>{information.time.toLocaleTimeString().slice(0,5)}</Text>            
            <Button title="Izaberi vrijeme" onPress={showDatePicker} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={information.time}
                onConfirm={(date) => handleConfirm(date, setInformation)}
                onCancel={hideDatePicker}
            />

            

            <Button 
                title={"spremi i nastavi"}
                onPress={() => finish(navigation, setInfo, information, defaultText, setObjectItem)}
            />
            
        </View>
    );
}

export default FirstTime;