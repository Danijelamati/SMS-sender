import React, { useContext, useEffect, useState } from 'react';
import { View, BackHandler,  Dimensions, Alert, Text } from 'react-native';

import Buttons from './Buttons';
import Info from './Info';
import Activity from './Activity';

import { Background } from "../../services/background";
import { AppContext } from '../../App';
import { allEvents } from '../../util/calendar';
import { objectForThisDay, todayDate, compareEvents } from "../../util/util";
import { setObjectItem, getObjectItem } from "../../util/storage";
import { useFocusEffect } from '@react-navigation/native';
import style from "../../styles/HomeStyles";
import sendSMS from "../../util/sendSMS";


const { width } = Dimensions.get('window');

const homeStyles = style(width);


function Home({navigation}) { 

    const appContext = useContext(AppContext);
    const {info, setInfo, events, setEvents, sentEvents, setSentEvents, notToday, setNotToday} = appContext;  
           
    useFocusEffect( 
      () => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', () =>  true);
        }
      },[]
    );        

    useEffect( ()=> { 

      const getEve = async(setEve) => {

          const events = await allEvents();
          setEve(events);          
      };
      getEve(setEvents);

      const getNotToday = async(setNot) => {
        const skipToday = await getObjectItem("notToday");
        
        if(!skipToday || !(todayDate() in skipToday)){
          const obj = objectForThisDay();
          obj[todayDate()] = false;
          await setObjectItem("notToday",  obj);
          setNot(() => false);
          return;
        }        
        setNot(() => skipToday[todayDate()]);

      }
      getNotToday(setNotToday);
      
      const getSentEvents = async(setSent) => {
          const sent = await getObjectItem("sentEvents");
          
          if(sent){
            if(sent[todayDate()].length !==0 ){
              setSent(() => sent[todayDate()]);
            }
          }
          
      };
      getSentEvents(setSentEvents);
          
    },[]);

    const skipToday = async (notToday, setNotToday) => {
      
      const obj = objectForThisDay();
      obj[todayDate()] = !notToday;
      await setObjectItem("notToday", obj);      
      setNotToday(x => !x);

    };

    const handleActivity =async (value, setInf, setEve) =>{ 
      
      setInf(inf => {
        return {...inf, enabled: !value};            
      });      
      
      if(!value){
        
        setObjectItem("info" , {...info, enabled: !info.enabled});   
        const getEvents = await allEvents();
        setEve(() => getEvents);
        Background.startService();        

      } else{        
        Background.stopService();
        setObjectItem("info", {...info, enabled: !info.enabled});
      }     
    };
    
    const sendNow = async() => {
      try {
        
        const getSentEvents = await getObjectItem("sentEvents");
        const events = await allEvents();
        
        if(events.length === 0 || !events){
          Alert.alert(
            "Upozorenje",
            "Nema termina za poslati"
          );         
          return;
        }

        if(getSentEvents === null || getSentEvents[todayDate()].length === 0 ){    
          
          const obj = objectForThisDay();

          obj[todayDate()] = events;
          sendSMS(info.text, obj[todayDate()]);
          
          await setObjectItem("sentEvents", obj);
          return;
        }  

        const compare = compareEvents(events, getSentEvents[todayDate()]);

        if(compare.length === 0){
          
          Alert.alert(
            "Upozorenje",
            "Nema termina za poslati"
          );  
          return;
        }

        const obj = objectForThisDay();
        obj[todayDate()] = getSentEvents[todayDate()].concat(compare);

        await setObjectItem("sentEvents", obj);

        sendSMS(info.text, compare);

      } catch (err) { 
        Alert.alert(
          "Upozorenje",
          "Dogodila se greška"
        );  
      }
    }

    
    return (        
      <View style={homeStyles.container}>

        <View style={homeStyles.infoContainer}>          
          <Activity homeStyles={homeStyles} info={info} setInfo={setInfo} setEvents={setEvents} handleActivity={handleActivity} notToday={notToday} setNotToday={setNotToday}/>

          <Info homeStyles ={homeStyles} info={info} notToday={notToday} events={events} sentEvents={sentEvents}/> 
          
        </View>

        <Buttons homeStyles={homeStyles} navigation={navigation} sendNow={sendNow} skipToday={skipToday} notToday={notToday} setNotToday={setNotToday}/>        
       
      </View>
    );
}



export default Home; 
