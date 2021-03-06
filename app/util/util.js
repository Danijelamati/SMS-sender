import moment from "moment-timezone";

const createDateObject = (time) => { 
  const dateObj = moment(time);  
  
  return moment().set({hours: dateObj.hour(), minutes: dateObj.minutes(), seconds: 0, milliseconds: 0});
};

const compareEvents = (events, sentEvents) => {
  
  const newEvents = [];

  events.forEach(eve => {
    let flag = false;
    
    for(let i = 0; i<sentEvents.length; i++){
      if(JSON.stringify(eve) === JSON.stringify(sentEvents[i])){    
        flag = true;    
        break;
      }
    }
    if(!flag){
      newEvents.push(eve);
    }
  });

  return newEvents;
};

const countNums = (events) => {
  let i = 0;
  
  if(!events || events.length === 0){
    return 0;
  } 

  events.forEach(e => {
    i+=e.description.length;
  });
  return i;
};

const generaliseEvents = (events) => {

  const nums = events.map(e => e.description);
  
  const reducer = (arr1, arr2) => [
    ...arr1,
    ...arr2.filter( x => !arr1.includes(x))
  ];
  
  const sym = (...args) => [...new Set(args.reduce(reducer))];

  return [{"startDate": " ", "endDate": " ", "description": sym(...nums)}];
};

const objectForThisDay = () => {
  const obj = {};
  let time = moment.tz();  
  
  if(time.hour() >= 22){   
    time.add(1,"days");
  } 
  
  obj[time.format("DD MM YYYY")] = null;

  return obj;
};

const scale = (size, width) => {

  const guidelineBaseWidth = 350;

  return width / guidelineBaseWidth * size;
}

const todayDate = () => {
  date = moment.tz(); 
  
  if(date.hour() >= 22){   
    date.add(1,"days");
  } 

  return date.format("DD MM YYYY");
}

export {    
    createDateObject,
    compareEvents,
    countNums,
    generaliseEvents,
    objectForThisDay,
    scale,
    todayDate
};