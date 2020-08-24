import React, { createContext, useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from "@react-navigation/stack";

import Home from "./components/home/Home";
import MessageInfo from "./components/messageinfo/MessageInfo";
import Loading from './components/loading/Loading';
import FirstTime from './components/firsttime/FirstTime';
import SendNotification from './components/sendnotification/SendNotification';
import About from './components/about/About';

export const AppContext = createContext();

function App () {

  const [info, setInfo] = useState(null);
  const [events, setEvents] = useState([]);  
  const [sentEvents, setSentEvents] = useState([]);
  const [notToday, setNotToday] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);


  const Stack = createStackNavigator();

  useEffect(
    () => {
      (async () => {
        const checkPermissionReadCalendar = await PermissionsAndroid.check("android.permission.READ_CALENDAR");
        const checkPermissionSendSMS = await PermissionsAndroid.check("android.permission.SEND_SMS");
        
        if(checkPermissionReadCalendar && checkPermissionSendSMS){
          setPermissionGranted(true);
          return;
        }
        
        let flag = true;
          do{     
                 
            const userResponse = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
              PermissionsAndroid.PERMISSIONS.SEND_SMS
            ]);
            
            flag=false;
            
            for (let key in userResponse) {     

              if (userResponse[key] !== "granted") {
                flag = true;
              }

            }
            
          }while(flag);
          setPermissionGranted(true);          
          
      })();  
      
    },[]
  );  

  return (    
    <NavigationContainer>
      {
        permissionGranted ?
        <AppContext.Provider value={{info, setInfo, events, setEvents, notToday, setNotToday, sentEvents, setSentEvents}}>
          <Stack.Navigator>             
            <Stack.Screen
              name="Loading"
              component={Loading}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="FirstTime"
              component={FirstTime}   
              options={{ headerShown: false }}       
            /> 
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />  
            <Stack.Screen
              name="SendNotification"
              component={SendNotification}
              options={{title: "Pošalji obavijest"}}
            />                 
            <Stack.Screen
              name="MessageScreen"
              component={MessageInfo}
              options={{title: "Postavke poruke"}}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{title: "O aplikaciji"}}
            />
          </Stack.Navigator> 
        </AppContext.Provider> 
        :
        null
      }              
    </NavigationContainer> 
  );
};

export default App;

