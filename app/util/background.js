import { NativeModules } from 'react-native';
import moment from "moment-timezone";

import { allEvents } from "./calendar";
import { getObjectItem, setObjectItem } from "./storage";
import { createDateObject, compareEvents, objectForThisDay } from "./util"; 
import sendSMS from "./sendSMS";

const { Background } = NativeModules;

const BackgroundTask = async () => {
    try {
        
        const events = await allEvents();
        const info = await getObjectItem("info");
        const getSentEvents = await getObjectItem("sentEvents");  
        const todayDate = moment.tz().format("DD MM YYYY"); 
        
        if(!info || info.enabled === false){
          console.log("stoping service");
          Background.stopService();
        }

        if(getSentEvents){
          
          if(!(todayDate in getSentEvents)){
            console.log("doesnt exist")
            await setObjectItem("sentEvents", objectForThisDay());
          }

        }        
        
        info.time = createDateObject(info.time);

        if(moment() < info.time || events.length === 0){
          console.log("stil not sending...");
          return;
        }
        
        if(getSentEvents === null || getSentEvents[todayDate].length === 0 ){    
          
          const obj = objectForThisDay();

          obj[todayDate] = events;
          const sent = sendSMS(info.text, obj[todayDate]);
          
          const saveEvents = await setObjectItem("sentEvents", obj);
          return;
        }   
        
        const compare = compareEvents(events, getSentEvents[todayDate]);
        
        if(compare.length === 0){
          console.log("no new events");
          return;
        }

        const obj = objectForThisDay();
        obj[todayDate] = getSentEvents[todayDate].concat(compare);

        await setObjectItem("sentEvents", obj);

        sendSMS(info.text, compare);

      } catch (error) {
        console.log(error);
        Background.stopService();
      }
};

export {
    Background,
    BackgroundTask
};