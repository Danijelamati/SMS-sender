import React, { useContext, useEffect, useState } from 'react';
import { Text, View, BackHandler,  Dimensions, TouchableOpacity, Image } from 'react-native';
import moment from "moment-timezone";

import { Background } from "../../util/background";
import { AppContext } from '../../App';
import { allEvents } from '../../util/calendar';
import { countNums, objectForThisDay, todayDate } from "../../util/util";
import { setObjectItem, getObjectItem } from "../../util/storage";
import { useFocusEffect } from '@react-navigation/native';
import style from "../../styles/HomeStyles";

import greenActivity from "../../assets/images/greenActivity.png";
import redActivity from "../../assets/images/redActivity.png";


const { width } = Dimensions.get('window');

const homeStyles = style(width);


function Home({navigation}) {   

    const [notToday, setNotToday] = useState(false);

    const appContext = useContext(AppContext);
    const {info, setInfo, events, setEvents} = appContext;  

           
    useFocusEffect( 
      () => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', () =>  true);
        }
      },[]
    );    

    useEffect( ()=> { 

      const getEvents = async(allEve, setEve) => {

          const events = await allEve();
          setEve(events);          
      };
      getEvents(allEvents,setEvents);

      const getNotToday = async(setNot, getObj, setObj, today, objForToday) => {
        const getNotToday = await getObj("notToday");
        
        if(!getNotToday || !(today() in getNotToday)){
          const obj = objForToday();
          obj[today()] = false;
          await setObj("notToday",  obj);
          setNot(() => false);
          return;
        }
        
        setNot(() => getNotToday[today()]);

      }

      getNotToday(setNotToday,getObjectItem, setObjectItem, todayDate, objectForThisDay);

           
    },[]);
 

    const handleEnabled = async (setObject, obj) => {
  
      const a = await setObject("info", obj);
    };
    
    const getEvents = async (allEve,setEve) => {
      const events = await allEve();
      setEve(events);
    };      

    const skipToday = async (notToday, setNotToday, setObject, getObject, objectForThisDay, todayDate) => {
      
      const obj = objectForThisDay();
      obj[todayDate()] = !notToday;
      await setObject("notToday", obj);      
      setNotToday(x => !x);

    };

    const handleActivity = (value, setInf, handleEnabled, getEve, allEve, setEve, Background) =>{ 
      
      setInf(inf => {
        return {...inf, enabled: !value};            
      });      
      
      if(!value){
        handleEnabled(setObjectItem, {...info, enabled: !info.enabled});   
        getEve(allEve,setEve);  
        Background.startService();        

      } else{
        Background.stopService();
        handleEnabled(setObjectItem, {...info, enabled: !info.enabled});
      }

    } 

    
    return (        
      <View style={homeStyles.container}>
        
        <View style={homeStyles.infoContainer}>          
          <View style={homeStyles.imageWrapper}>
            {
              info.enabled ?
              <TouchableOpacity
              style={homeStyles.imageTouch}
              onPress={() => handleActivity(info.enabled, setInfo, handleEnabled, getEvents, allEvents, setEvents, Background)}>
                <Image
                style={homeStyles.imageStyle}
                source={greenActivity}
                onPress/>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={homeStyles.imageTouch}
                onPress={() => handleActivity(info.enabled, setInfo, handleEnabled, getEvents, allEvents, setEvents, Background)}>
                <Image
                  style={homeStyles.imageStyle}
                  source={redActivity}
                  onPress/>
              </TouchableOpacity>
            }
          </View>
        
          <View style={homeStyles.information}>
          {
            info.enabled ? 
            <Text style={homeStyles.infoText}>Aplikacija trenutno radi</Text>  
            :
            <Text style={homeStyles.infoText}>Aplikacija trenutno neradi</Text>
          }  
          {
            !info.enabled ? 
            null
            :
            <Text style={homeStyles.infoText}>Saljem {countNums(events)} poruka u {moment(info.time).format("HH:mm")}</Text>   
          }
          {
            notToday ?
            <Text style={homeStyles.infoText}>Danas preskačem sa slanjem</Text>
            :
            null
          }
          {
            <Text>{console.log("notToday", notToday)}</Text>
          }
          </View>          
              
        </View>
        <View style={homeStyles.buttonsContainer}>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("MessageScreen")}
            >
              <Text style={homeStyles.text}>Postavke poruke</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("SendNotification")}
            >
              <Text style={homeStyles.text}>Pošalji obavijest</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => navigation.navigate("MessageScreen")}
            >
              <Text style={homeStyles.text}>Pošalji sada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.button}
              onPress={() => skipToday(notToday, setNotToday, setObjectItem, getObjectItem, objectForThisDay, todayDate)}
            >
              <Text style={homeStyles.text}>Preskoči danas</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.sub}>
            
              <TouchableOpacity 
              style={homeStyles.button}
              onPress={() => navigation.navigate("MessageScreen")}
              >            
                <Text style={homeStyles.text}>O aplikaciji</Text>             
              </TouchableOpacity> 
            
          </View>
          
        </View>
        
        
      </View>
    );
}



export default Home; 
