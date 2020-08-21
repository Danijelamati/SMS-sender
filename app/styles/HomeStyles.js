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
          fontSize: scale(14,width)
        },
        buttonsContainer:{
          flex: 2,
          backgroundColor: "lime", 
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
          fontSize: scale(15, width)
        }
          
      });    
}


  export default homeStyles;