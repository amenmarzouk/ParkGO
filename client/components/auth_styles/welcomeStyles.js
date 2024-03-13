import { Platform, StatusBar, StyleSheet } from "react-native";

const welcomestyles = StyleSheet.create({
  container: {
    backgroundColor:"white",
   flex : 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight * 1 : 0,

  },
  title:{
    fontSize:30
  },
  auth:{
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
  },
  registre:{
    borderRadius:8,
    justifyContent:"center",
    width:100,
    height:30,
    alignItems: 'center',
    backgroundColor:"black",
    marginBottom:15,
  },
  login:{
    borderRadius:8,
    width:100,
    height:30,
   alignItems: 'center',
   justifyContent:"center",
   backgroundColor:"black"
  },
buttom:{
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  flex: 1,
  alignItems: 'center',
  justifyContent:"center",
backgroundColor:"blue",
}
})
export default welcomestyles;
