import RNCalendarEvents from 'react-native-calendar-events';
import moment from "moment-timezone";


const allEvents = async (start = null, end = null) =>  { 

    const a = await RNCalendarEvents.findCalendars();
    
    if(!start && !end){      
      start = moment.tz();              
      start.set({hour:22,minute:0,second:0,millisecond:0});
      
      end = moment.tz();              
      end.set({hour:22,minute:0,second:0,millisecond:0}).add( 1, "days");            
      
      if(moment.tz().hour() >= 22){        
        start.add(1, "days");
        end.add(2,"days");
      }
      
      start = start.toISOString();
      end = end.toISOString();      
    } 
     
    try {    
      const getEvents = await RNCalendarEvents.fetchAllEvents(start, end);
      
      let allEvents = [];
     
      for (const [key, value] of Object.entries(getEvents)) {
        allEvents.push(value);
      }
      allEvents = allEvents
      .map( x => {
        return {"startDate": x.startDate, "endDate": x.endDate, "description": x.description.match(/\d{7,}/g)};
      })
      .filter( x => x.description !== null);
       
      
      return allEvents;      

    } catch (error) {
      console.log("all events error = " + error);
    }
  };



export {
    allEvents
};