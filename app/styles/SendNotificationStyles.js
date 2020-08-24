import { StyleSheet } from "react-native";
import { scale } from "../util/util";


const notificationStyles = (width) => {
    return StyleSheet.create({
        container:{
            flex: 1
        },
        infoContainer:{
            flex: 3
        },
        message:{
            flex:3,
            paddingTop: "10%",
            paddingLeft: "10%",
            paddingRight: "10%"
        },
        info:{
            flex:2,
            alignItems: "center"
        },
        text:{
            fontSize: scale(16,width),   
        },
        buttonContainer:{
            flex: 1
        },
        segment:{
            flex: 1,
            flexDirection: "row",
        },
        button: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
      
            backgroundColor: "white",
      
            borderWidth: 1,
            borderColor: "navy"             
            
        },
        buttonText: {
            fontSize: scale(16, width)
        },
        modal:{
            flex: 1,            
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            width: "80%",
            height: "70%",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        modalTextContainer:{
            flex:4
        },
        modalTextInput:{
            height:"100%",
        },
        modalButtons:{
            flex: 1,
            flexDirection: "row",

            alignItems:"center",
            justifyContent: "space-between",
            
            width: "100%"
        },
        modalButton:{
            alignItems: "center",
            justifyContent:  "center",

            width: "40%",
            height: "70%",
            backgroundColor: "white",

      
            borderWidth: 1,
            borderColor: "navy",
            borderRadius: 20,  
        },
        modalText:{
            fontSize: scale(16,width)
        }

    });
};

export default notificationStyles;

