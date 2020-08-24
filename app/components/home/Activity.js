import React, {useState} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import moment from "moment-timezone";

import greenActivity from "../../assets/images/greenActivity.png";
import redActivity from "../../assets/images/redActivity.png";
import ActivateModul from './ActivateModul';

function Activity(props) {

    const [modalView, setModalView] = useState(false);
    const {homeStyles, info, setInfo, setEvents, handleActivity, notToday, setNotToday} = props;    
    
    return (
        <View style={homeStyles.imageWrapper}>
            {
              info.enabled ?
              <TouchableOpacity
              style={homeStyles.imageTouch}
              onPress={() => handleActivity(info.enabled, setInfo, setEvents)}>
                <Image
                style={homeStyles.imageStyle}
                source={greenActivity}
                onPress/>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={homeStyles.imageTouch}
                onPress={() => {
                
                if(!notToday && moment(info.time) < moment()){                  
                  setModalView(true);  

                  return;
                }
                handleActivity(info.enabled, setInfo, setEvents)
                }
                }>
                <Image
                  style={homeStyles.imageStyle}
                  source={redActivity}
                  onPress/>
              </TouchableOpacity>
            }
              <ActivateModul homeStyles={homeStyles} modalView={modalView} setModalView={setModalView} 
                setNotToday={setNotToday} handleActivity={handleActivity} info={info} setInfo={setInfo} 
                setEvents={setEvents}/>
            
          </View>
    );
}

export default Activity;