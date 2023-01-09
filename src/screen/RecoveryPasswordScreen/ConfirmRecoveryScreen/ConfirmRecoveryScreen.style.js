import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";

export const styles = StyleSheet.create({
  
  input:{
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: normalize(10, 'width'),
    borderColor: "#70707059"
    

  },
  containerLogo: {
    alignSelf: 'center',
    marginTop: normalize(60 , "height"),
    
  },
  imageLogo: {
    resizeMode: "contain",
    width: normalize(100, 'width'),
    height: normalize(100, 'width'),
    marginTop: normalize(-20, 'height')
  },
  containerStyleIcon:{
    padding: normalize(20 , "width"),
    backgroundColor: "#84D9B1",
    borderRadius: 100,
    width: normalize(100, "width"),
    height: normalize(100 , "width"),
    padding: 0,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    marginTop: normalize(90 , "height")
  },
  icon:{
    
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    fontSize: RFPercentage(10),
    marginTop: normalize(10, "height")

  },
  lblTitle: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    marginTop: normalize(10, 'height'),
    color: "#666666",
    marginBottom: normalize(10, 'height'),
    marginTop: normalize(10, "height")

  },
  btn: {
    height: normalize(50, 'width'),
    width: normalize(270, 'width'),
    borderRadius: 10,
  },
  containerSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(5),
  },
  content: {
    marginHorizontal: normalize(20, 'height'),
  },  
  
 

});
