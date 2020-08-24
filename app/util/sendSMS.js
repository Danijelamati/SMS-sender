import SendSMS from 'react-native-sms-x';
import moment from "moment-timezone"; 

const sendSMS = (message, events) => {  
   
    let i = 0;

    events.forEach(e => {   
        
        const startDateFormated = moment.tz(e.startDate, "Europe/Berlin").format("DD MM YYYY HH:mm");
        const endTime = moment.tz(e.endDate, "Europe/Berlin").format("HH:mm");
        
        const time = `${startDateFormated.split(" ")[3]} - ${endTime}`;
        const date =  startDateFormated.slice(0,startDateFormated.length-5);  
        
        let string = message.replace(/TERMIN/g, time);
        string = string.replace(/DATUM/g, date);

        const nums = e.description;
        
        nums.forEach( num => {
            SendSMS.send(i, num , string, (msg)=>{ console.log(msg) });
            i++;
        });                
        
    });

    return "";
}

export default sendSMS;