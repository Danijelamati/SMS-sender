import React, {useContext, useEffect, useState, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

import { allEvents } from "../../util/calendar";
import { AppContext } from '../../App';
import { getObjectItem, setObjectItem } from "../../util/storage";
import { createDateObject, todayDate } from "../../util/util";

import physioat from "../../assets/images/physioat.png";

function Loading({navigation}) {
    
    const [loaded, setLoaded] = useState(false);    
    const [once, setOnce] = useState(false);
    const [authorised, setAuthorised] = useState();

    const appContext = useContext(AppContext);
    
    const { setEvents, setInfo, info, setNotToday, setSentEvents} = appContext;   

    useEffect(
      () => {
        (async () => {
          
          spring.start();

          const storage = async (setInf,setAuthorised,setNot, setSent) => {
            try {
              let inf = await getObjectItem("info");
              const not = await getObjectItem("notToday");              
              const sent = await getObjectItem("sentEvents");              
              
              if(sent){
                
                if(todayDate() in sent){                  
                  setSent(() => sent[todayDate()]);
                }
                else{
                  await setObjectItem("sentEvents", {[todayDate()]: []});
                }
              } 
              
              if(inf){   
                inf.time = createDateObject(inf.time); 
                setInf(() => inf);
              }

              setNot(() => not);
              setAuthorised(false);
            } catch (err) { 
              console.log(err);
            }
          };
          storage(setInfo,setAuthorised,setNotToday,setSentEvents);
        })();
      },[]
    );
    
    useEffect(    
        () =>{
          
            if(authorised === false){
               
                const auth = async () => {
                    try {                     
                      
                      await  RNCalendarEvents.requestPermissions();
                      let checkPermission = await RNCalendarEvents.checkPermissions();                        
                      
                      while(checkPermission !== "authorized"){
                        await  RNCalendarEvents.requestPermissions();
                        checkPermission = await RNCalendarEvents.checkPermissions();                        
                      }    

                      setAuthorised( () => true);
                    } catch (error) {
                       console.log(error);
                    }
                  }
                  auth();
            } 
            if(authorised === true){
             
                const a = async (allE,setE,setL) => {
                    try {
                        
                        const b = await allE();
                        
                        setE( () => b );
                        setTimeout(() => setL( () => true) , 1000);                        
                        
                    } catch (error) {
                        console.log(error);
                        return "error";
                    }
                }
                a(allEvents,setEvents, setLoaded);   
                
                setLoaded(true);
            }
          
        },[authorised]
      );  
    


      const navigate = (inf,nav,spring,animation) => {
        
        spring.stop();
        Animated.spring(animation).stop();
        
        if( !inf ){
          nav.navigate("FirstTime"); 
                    
          return;
        }       
       
        nav.navigate("Home");      
       
      };
      
      const timeout = (info,navigation,setOnce,spring,animation) => {  
              
        setOnce(true);        
        setTimeout(() => navigate(info,navigation,spring,animation), 4000);
        
      };
      
      const animation = useRef(new Animated.Value(0.3)).current;

      const spring = Animated.loop(
        Animated.spring(animation, {
          toValue: 1,
          speed: 1,
          useNativeDriver: true
        })
      );

    return (
        <View style={[styles.container, styles.horizontal]}> 
            
          <Animated.Image
            style={{ 
            width: "80%",
            height: "100%",
            resizeMode: "center", 
            borderRadius: 300, 
            transform: [{scale : animation}] }
            }
            source={physioat}/>     
        {
          loaded && !once ? 
          timeout(info,navigation,setOnce,spring,animation)          
          : 
          null
        }
             
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });

export default Loading;
