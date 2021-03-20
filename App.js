import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Plank from './js/Plank';
import Weight from './js/Weight'


export default function App() {
  //calculate plank torque
  return (
    <View style={styles.container}>
      <Plank degree= {torque(30,15)}/>
      <Weight/>
       <StatusBar style="auto" />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const torque = function(tagged,finished){
  //max tipping weight on each side = 20
  //max degree of inclination = 45
  var netWeight = finished-tagged;
  if (Math.abs(netWeight)>=20){
    return (netWeight/Math.abs(netWeight))*15;
  }
  return (netWeight/20)*15;
}