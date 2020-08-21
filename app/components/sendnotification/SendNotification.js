import React, { useState, useEffect } from 'react';
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Button, Text, TextInput, BackHandler, TouchableOpacity } from 'react-native';

import sendSMS from '../../util/sendSMS';
import { allEvents } from "../../util/calendar";
import { countNums } from '../../util/util';
import { useFocusEffect } from '@react-navigation/native';

const defStartTime = moment({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).add(1, "days");
const defEndTime =  moment({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).add(2, "days");

const defMessage = "Saljemo vam obavijest da otkazujemo vas termin u TERMIN datuma DATUM";

function SendNotification({navigation}) {

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);   

    const [startTime, setStartTime] = useState(defStartTime);
    const [endTime, setEndTime] = useState(defEndTime);

    const [message, setMessage] = useState(defMessage);
    const [events, setEvents] = useState([]);
    const [change, setChange] = useState(false);

    useFocusEffect( 
      () => {
        BackHandler.addEventListener('hardwareBackPress', () => { navigation.goBack(); return true});
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', () => true);
        }
      },[]
    );

    useEffect( ()=> {
      
        const getEvents = async(allEve, setEve, start, end) => {

            const events = await allEve(start.toISOString(), end.toISOString());
            setEve(events);
            console.log(events);
            console.log(events.length);

        };
        getEvents(allEvents,setEvents, startTime, endTime);
    },[startTime, endTime]);

    const showDatePicker = (value) => {
        const pick = new Map()
                    .set("start", setStartDatePickerVisibility)
                    .set("end", setEndDatePickerVisibility);

        const set = pick.get(value);

        set(true);   
      };
    
    const hideDatePicker = (value) => {
        const pick = new Map()
                    .set("start", setStartDatePickerVisibility)
                    .set("end", setEndDatePickerVisibility);

        const set = pick.get(value);

        set(false);  
    };
    
    const handleConfirm = (value,date) => {
        hideDatePicker(value);  

        const pickTime = new Map()
                    .set("start", setStartTime)
                    .set("end", setEndTime);

        const set = pickTime.get(value);
        set(date);          
    };

    const SendNotification = async (sendSMS, allEve, start, end, mess) => {
        const getEvents = await allEve(start.toISOString(), end.toISOString());

        sendSMS(mess, getEvents);
    };

    return (
        <View>
            {
            change ? 
            <TextInput
            value = {message}
            onChangeText = { txt => setMessage( () => txt)}            
            />          
            :
            <Text>{message}</Text>
          }
          {
            change ? 
            <Button 
              title = {"spremi"}
              onPress= {() =>{ 
                setChange(() => false); 
              }
              }
            />            
            :
            <Button 
              title = {"promijeni"}
              onPress= {() =>{
                setChange(() => true);
              }}
            />
            } 


            <Text>Pocetno vrijeme: {moment(startTime).format("DD MM YYYY HH:mm")}</Text>
            
            <Button title="Izaberi pocetno vrijeme" onPress={() => showDatePicker("start")} />

            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              date={new Date(startTime)}
              onConfirm={(date) => handleConfirm("start", date)}
              onCancel={() => hideDatePicker("start")}
            />

            <Text>Krajnje vrijeme: {moment(endTime).format("DD MM YYYY HH:mm")}</Text>
            <Button title="Izaberi krajnje vrijeme" onPress={() => showDatePicker("end")} />

            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="datetime"
              date={new Date(endTime)}
              onConfirm={(date) => handleConfirm("end", date)}
              onCancel={() => hideDatePicker("end")}
            />

            <Text>
                Saljem {countNums(events)} poruka
            </Text>

            {
                moment(startTime) - moment(endTime) >= 0 ?
                <Text>"Upozorenje pocetni datum nemoze biti manji il isti od krajnjeg"</Text>
                :
                <Button
                    title={"posalji obavijest"}
                    onPress={() => SendNotification(sendSMS, allEvents, startTime, endTime, message)}
                />
            }
            
        </View>        
    );
}

export default SendNotification;
