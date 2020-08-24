import React, { useState, useEffect } from 'react';
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, BackHandler, Dimensions } from 'react-native';

import TextModal from "./TextModal";
import SendModal from "./SendModal";
import Buttons from './Buttons';

import { allEvents } from "../../util/calendar";
import { countNums } from '../../util/util';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../../styles/SendNotificationStyles";

const { width } = Dimensions.get('window');
const homeStyles = styles(width);


const defStartTime = moment({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).add(1, "days");
const defEndTime =  moment({hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).add(2, "days");

const defMessage = "Saljemo vam obavijest da otkazujemo vas termin u TERMIN datuma DATUM";

function SendNotification({navigation}) {

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);   

    const [startTime, setStartTime] = useState(defStartTime);
    const [endTime, setEndTime] = useState(defEndTime);

    const [message, setMessage] = useState(defMessage);
    const [tempMessage, setTempMessage] = useState("");
    const [events, setEvents] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);  
    const [sendModal, setSendModal] = useState(false); 

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

    return (
        <View style={homeStyles.container}>
          <View style={homeStyles.infoContainer}>
            <View style={homeStyles.message}>
              <Text style={homeStyles.text}>{message}</Text>
            </View>
            <View style={homeStyles.info}>
              <Text style={homeStyles.text}>Početno vrijeme: {moment(startTime).format("DD MM YYYY HH:mm")}</Text>
              <Text style={homeStyles.text}>Krajnje vrijeme: {moment(endTime).format("DD MM YYYY HH:mm")}</Text>  
              <Text style={homeStyles.text}>Šaljem {countNums(events)} poruka</Text>                              
              {
                  moment(startTime) - moment(endTime) >= 0 ?
                  <Text style={{...homeStyles.text, color: "red"}}>Upozorenje početni datum nemože biti manji ili isti od krajnjeg</Text>
                  :
                  null
              }
            </View>
          </View>            
            
          <Buttons homeStyles={homeStyles} showDatePicker={showDatePicker} setModalVisible={setModalVisible} setTempMessage={setTempMessage} message={message} startTime={startTime} endTime={endTime}  setSendModal={setSendModal} />
                          
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="datetime"
            date={new Date(startTime)}
            onConfirm={(date) => handleConfirm("start", date)}
            onCancel={() => hideDatePicker("start")}
          />

          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="datetime"
            date={new Date(endTime)}
            onConfirm={(date) => handleConfirm("end", date)}
            onCancel={() => hideDatePicker("end")}
          />

          <TextModal tempMessage={tempMessage} setTempMessage={setTempMessage} modalVisible={modalVisible} setModalVisible={setModalVisible} setMessage={setMessage} homeStyles={homeStyles}/>              
          <SendModal homeStyles={homeStyles} sendModal={sendModal} setSendModal={setSendModal} message={message} startTime={startTime} endTime={endTime} /> 
        </View>
            
    );
}

export default SendNotification;


