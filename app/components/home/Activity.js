import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import greenActivity from "../../assets/images/greenActivity.png";
import redActivity from "../../assets/images/redActivity.png";

function Activity(props) {

    const {homeStyles, info, setInfo, setEvents, handleActivity} = props;
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
                onPress={() => handleActivity(info.enabled, setInfo, setEvents)}>
                <Image
                  style={homeStyles.imageStyle}
                  source={redActivity}
                  onPress/>
              </TouchableOpacity>
            }
          </View>
    );
}

export default Activity;