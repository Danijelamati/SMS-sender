import React, { useContext, useState } from "react";
import { Text, View, TextInput, Button, BackHandler, TouchableOpacity, Dimensions } from 'react-native';
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import MessModal from "./MessModal";

import { AppContext } from "../../App";
import { setObjectItem } from "../../util/storage";
import { useFocusEffect } from "@react-navigation/native";
import style from "../../styles/MessInfoStyles";
import WarningModal from "./WarningModal";


const { width } = Dimensions.get('window');

const messStyles = style(width);

export default function MessageInfo ({navigation}){

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible ,setModalVisible] = useState(false);  
  const [warningModal, setWarningModal] = useState(false);
  const [timeToConsider, setTimeToConsider] = useState(null);

  const appContext = useContext(AppContext);
  const {info, setInfo} = appContext;
  
  useFocusEffect( 
    () => {
      BackHandler.addEventListener('hardwareBackPress', () => {navigation.goBack(); return true});
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => true);
      }
    },[]
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    hideDatePicker();    
  };

  const store = async( obj, setStore) => {    
    try{      
      await setStore("info", obj);      
    }
    catch(err){
      console.log(err);
    }
  }

    return (
       <View style = {messStyles.container}>        
          <View style={messStyles.infoContainer}>
            <View style={{...messStyles.half, flex: 7}}>
              <Text style={messStyles.title}>Text poruke:</Text>
              <Text style={messStyles.text}>
                {info.text}
              </Text>
            </View>
            <View style={{...messStyles.half, flex: 3}}>
              <Text style={messStyles.text}>
                Automatsko slanje će početi u {moment(info.time).tz("Europe/Zagreb").format("HH:mm")}             
              </Text>
            </View>
          </View> 
          <View style={messStyles.buttons}>
            <TouchableOpacity
              style={messStyles.button}
              onPress={() => setModalVisible(true) }
            >
              <Text style={messStyles.buttonText}>Text poruke</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={messStyles.button}
              onPress={() => showDatePicker()}
            >
              <Text style={messStyles.buttonText}>Izaberi vrijeme</Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            date={new Date(info.time)}
            onConfirm={(date) => {
              
              if(moment(date) < moment() && moment(date) < moment(info.time) && info.enabled){
                setTimeToConsider(date);
                setWarningModal(true);
                return;
              }
              
              handleConfirm();
              setInfo( inf => {
                return {...inf, time: date};
              });  
              store({...info, time: date}, setObjectItem);
            } }
            onCancel={hideDatePicker}
          />
            
          <MessModal messStyles={messStyles} modalVisible={modalVisible} setModalVisible={setModalVisible} info={info} setInfo={setInfo}/>
          <WarningModal messStyles={messStyles} warningModal={warningModal} setWarningModal={setWarningModal} info={info} setInfo={setInfo} timeToConsider={timeToConsider} setDatePickerVisibility={setDatePickerVisibility} />

       </View>
    );
};


