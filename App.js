import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Plank from './js/Plank';
import Weight from './js/Weight'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


import PlankSvg from './js/PlankSvg'
export default function App() {
  //TODO: calculate plank torque - done
  //TODO: Add count and direction to weight - done
  //TODO: Add balls UI - done
  //TODO: Make plank svg and align balls to plank - done
  //TODO: 3 colors of balls - done
  //TODO: Add sections - done
  //TODO: Add capture balls
  //TODO: Make responsive - Done
  const [plankLayout, setPlankLayout] = useState(null);
  var tagged = 5;
  var finished = 13;
  var capture=5;
  return (
    <View >
      
    <View style={[styles.container,{flexDirection: "row"}]}>
      <View style={{ flex: 1,  height:vh(100),borderTopWidth:5, borderRightColor: 'gray', borderRightWidth:2}} />
      <View style={{ flex: 1,  height:vh(100),  borderRightColor: 'gray', borderRightWidth:2 }} />
      <View style={{ flex: 1, height:vh(100) }} />
      </View>
      
      <View style={[styles.plank, {transform:[{rotate:torque(tagged,finished)+'deg'}]}]}>
      <Weight count={tagged} direction={torque(tagged,finished)} type={"tagged"}/> 
      <Weight count={finished} direction={torque(tagged,finished)} type={"finished"}/> 
      <Plank/>
      
      </View>
      
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
    width: 'auto',
    height: 'auto',
    position:'absolute',
    top:vh(40),
    left:vw(10),
    paddingBottom:0,
    resizeMode:'contain',  
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
