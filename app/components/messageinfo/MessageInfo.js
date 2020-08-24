import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, BackHandler } from 'react-native';
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { AppContext } from "../../App";
import { setObjectItem } from "../../util/storage";
import { useFocusEffect } from "@react-navigation/native";

export default function MessageInfo ({navigation}){

  const [change, setChange] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [temporaryText, setTemporaryText] = useState("");

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
       <View style = {styles.container}>        
          {
            change ? 
            <TextInput
            value = {temporaryText}
            onChangeText = { txt => setTemporaryText( () => txt)}            
            />          
            :
            <Text>{info.text}</Text>
          }
          {
            change ? 
            <Button 
              title = {"spremi"}
              onPress= {() =>{ 
                setChange(() => false);
                setInfo( inf => {
                  return {...inf, text: temporaryText};
                });
                store({...info, text: temporaryText}, setObjectItem);
              }
              }
            />            
            :
            <Button 
              title = {"promijeni"}
              onPress= {() =>{
                setChange(() => true);
                setTemporaryText( () => info.text);
              }}
            />
          } 
          
          <Text>
            {moment(info.time).tz("Europe/Zagreb").format("HH:mm")}              
          </Text>            
          

          <Button title="Izaberi vrijeme" onPress={showDatePicker} />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            date={new Date(info.time)}
            onConfirm={(date) => {
              handleConfirm();
              setInfo( inf => {
                return {...inf, time: date};
              });  
              store({...info, time: date}, setObjectItem);
            } }
            onCancel={hideDatePicker}
          />
            
          

       </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


