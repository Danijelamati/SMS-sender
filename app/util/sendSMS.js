import SendSMS from 'react-native-sms-x';
import moment from "moment-timezone"; 

const sendSMS = (message, events) => {  
   
    let i = 0;
    console.log(events);
    events.forEach(event => {   
        
        const startDateFormated = moment.tz(event.startDate, "Europe/Berlin");
        
        const time = startDateFormated.format("HH:mm");
        const date = startDateFormated.format("DD.MM");  
        
        let string = message
            .replace(/TERMIN/g, time)
            .replace(/DATUM/g, date)
            .replace(/RED\s+|RED/g, "\n");

        const nums = event.description;
        
        nums.forEach( num => {
            SendSMS.send(i, num , string, (msg)=>{ console.log(msg) });
            i++;
        });                
        
    });

    return "";
}

export default sendSMS;