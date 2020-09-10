import { StyleSheet } from "react-native";
import { scale } from "../util/util";

const AboutStyles = (width) => {
    return StyleSheet.create({
        largeText:{
            fontSize: scale(24, width),
            fontWeight: "bold",
            paddingBottom: "7%",
            paddingLeft: "5%"
        },
        text:{
            fontSize: scale(17, width),
            paddingBottom: "5%",
            paddingLeft: "3%"
        }
    });
};

export default AboutStyles;