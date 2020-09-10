import { NativeModules } from 'react-native';
import moment from "moment-timezone";

import { allEvents } from "../util/calendar";
import { getObjectItem, setObjectItem } from "../util/storage";
import { createDateObject, compareEvents, objectForThisDay, todayDate } from "../util/util"; 
import sendSMS from "../util/sendSMS";

const { Background } = NativeModules;

const BackgroundTask = async () => {
    try {
        
        const events = await allEvents();
        const info = await getObjectItem("info");
        const getSentEvents = await getObjectItem("sentEvents");  
        const skipToday = await getObjectItem("notToday");
        const today = todayDate(); 
        
        if(!info || info.enabled === false){
          console.log("stoping service");
          Background.stopService();
        }
        
        if(!skipToday || !(today in skipToday)){
          const obj = objectForThisDay();
          obj[today] = false;
          await setObj("notToday",  obj);                    
        }

        if(skipToday[today]){
          console.log("skiping today");
          return;
        }
        
        if(getSentEvents){
          
          if(!(today in getSentEvents)){
            console.log("doesnt exist")
            await setObjectItem("sentEvents", objectForThisDay());
          }

        }        
        
        info.time = createDateObject(info.time);

        if(moment() < info.time || events.length === 0){
          console.log("stil not sending...");
          return;
        }
        
        if(getSentEvents === null || getSentEvents[today].length === 0 ){    
          
          const obj = objectForThisDay();

          obj[today] = events;
          const sent = sendSMS(info.text, obj[today]);
          
          const saveEvents = await setObjectItem("sentEvents", obj);
          return;
        }   
        
        const compare = compareEvents(events, getSentEvents[today]);
        
        if(compare.length === 0){
          console.log("no new events");
          return;
        }

        const obj = objectForThisDay();
        obj[today] = getSentEvents[today].concat(compare);

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
