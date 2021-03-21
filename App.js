import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Plank from './js/Plank';
import Weight from './js/Weight'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


import PlankSvg from './js/PlankSvg'
export default function App() {
  //TODO: calculate plank torque - done
  //TODO: Add count and direction to weight - done
  //TODO: Add balls UI - done
  //TODO: Make plank svg and align balls to plank
  //TODO: 3 colors of balls
  //TODO: Add sections - done

  return (
    <View >
      
    <View style={[styles.container,{flexDirection: "row"}]}>
      <View style={{ flex: 1, backgroundColor: 'rgba(225, 55, 14,0.2)', height:vh(100), borderTopColor: 'rgb(225, 55, 14)', borderTopWidth:5, borderRightColor: 'gray', borderRightWidth:2}} />
      <View style={{ flex: 1,  height:vh(100),  borderRightColor: 'gray', borderRightWidth:2 }} />
      <View style={{ flex: 1, height:vh(100) }} />
      </View>
      <View style={[styles.plank, {transform:[{rotate:torque(30,15)+'deg'}]}]}>
      <PlankSvg/>
      </View>
      <Weight count={18} direction={torque(30,15)}/> 
       <StatusBar style="auto" />
     
     </View>
  );
  
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000'
  },
  plank:{
    flex:1,
    width: vw(100),
    height: win.height/2,
    position:'absolute',
    top:vh(60),
    left:vw(1),
    resizeMode:'contain',  
    zIndex:4 
  }
});
const torque = function(tagged,finished){
  //max tipping weight on each side = 20
  //max degree of inclination = 45
  var netWeight = finished-tagged;
  if (Math.abs(netWeight)>=20){
    return (netWeight/Math.abs(netWeight))*15;
  }
  console.log("degree is"+(netWeight/20)*15);
  return (netWeight/20)*15;
}