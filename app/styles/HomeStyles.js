import { StyleSheet } from "react-native";
import { scale } from "../util/util";

const homeStyles = (width) => {

    return StyleSheet.create({
        container: {
          flex: 1
        },
        infoContainer:{
          flex: 3,
          flexDirection: "column",
        },
        imageTouch:{
          flex: 1,
          alignItems: "center", 
          justifyContent:"center", 
          width: "70%",
    
        },
        imageStyle:{ 
          width: "90%",
          height: "100%",
          resizeMode: "center", 
          borderRadius: 500000
        },
        imageWrapper:{
          flex:4,
          justifyContent: "center",
          alignItems: "center",
        },
        information:{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        },
        infoText:{
          fontSize: scale(14,width),
          fontWeight: "bold"
        },
        buttonsContainer:{
          flex: 2
        },
        sub : {
          flex: 1,
          flexDirection: "row",     
          
        },
        button: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
    
          backgroundColor: "white",
    
          borderWidth: 1,
          borderColor: "navy", 
          
        },
        text: {
          fontSize: scale(15, width),
          fontWeight: "bold"
        },
        textLarge:{
          fontSize: scale(20, width),
          fontWeight: "bold",
        },
        buttonText:{
          fontSize: scale(15, width),
          fontWeight: "bold",
          textTransform: "uppercase"
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
          borderRadius: 20
        },
        modalButtonText:{
          fontSize: scale(12, width),
          fontWeight: "bold",
          textTransform: "uppercase"
        }
          
      });    
}


  export default homeStyles;