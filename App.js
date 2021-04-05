import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Plank from './js/Plank';
import Weight from './js/Weight'
import Ball from './js/Ball'
import Steps from './js/Steps'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import BottomDrawer from 'react-native-three-step-bottom-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import PlankSvg from './js/PlankSvg'

const Stack = createStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SeeSaw" component={SeeSaw} />
        <Stack.Screen name="Steps" component={Steps}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function SeeSaw({navigation}){
  //TODO: if ball in left section - show alert
  //TODO: if ball next section - You still need to finish some steps dialogue
    //TODO: 
  //TODO: if ball in prev section or same section - spring back
  //TODO: make it look like design
  //TODO: character?
  //TODO: tap - show detail
  const [plankLayout, setPlankLayout] = useState(null);
  const [secOneBgColor, setSecOneBgColor]=useState("None");
  const [secTwoBgColor, setSecTwoBgColor]=useState("None");
  const [secThreeBgColor, setSecThreeBgColor]=useState("None");
  const [secOneBorderColor, setSecOneBorderColor]=useState("rgba(225, 55, 14, 0.3)");
  const [secTwoBorderColor, setSecTwoBorderColor]=useState("rgba(241, 204, 52, 0.3)");
  const [secThreeBorderColor, setSecThreeBorderColor]=useState("rgba(51, 184, 7, 0.3)");
  const [selectedBall, setSelectedBall]=useState(null);
  const [bottomDrawerVisible, setBottomDrawerVisible]=useState(false);
  const [bottomDrawerColor, setBottomDrawerColor]=useState("None");
  function focusSection(focus,ballKey){
    setSelectedBall(ballKey);
    
    if (focus=="tagged"){
      setSecOneBgColor("rgba(225, 55, 14, 0.3)")
      setSecOneBorderColor("rgb(225, 55, 14)")
      setBottomDrawerVisible(true)
      setBottomDrawerColor("#F1ECE7")
      setSecTwoBgColor("None")
      setSecTwoBorderColor("rgba(241, 204, 52, 0.3)")
      setSecThreeBgColor("None")
      setSecThreeBorderColor("rgba(51, 184, 7, 0.3camer)")
    }
    if (focus=="captured"){
      setSecOneBgColor("None")
      setSecOneBorderColor("rgba(225, 55, 14, 0.3)")
      setSecTwoBgColor("rgba(241, 204, 52, 0.3)")
      setSecTwoBorderColor("rgba(241, 204, 52, 1.0)")
      setBottomDrawerVisible(true)
      setBottomDrawerColor("rgb(241, 204, 52)")
      setSecThreeBgColor("None")
      setSecThreeBorderColor()

    }
    if (focus=="finished"){
      setSecOneBgColor("None")
      setSecOneBorderColor("rgba(225, 55, 14, 0.3)")

      setSecTwoBgColor("None")
      setSecTwoBgColor("rgba(241, 204, 52, 0.3)")

      setSecThreeBgColor("rgba(51, 184, 7, 0.3)")
      setSecThreeBorderColor("rgba(51, 184, 7, 1.0)")
      setBottomDrawerVisible(false)

    }
  
  }
  var tagged = 1;
  var finished = 10;
  var capture=5;

  return (
    <View style={{overflow:'hidden'}}>
      
    <View style={[styles.container,{flexDirection: "row"}]}>
      <View style={{ flex: 1,  height:vh(100),borderTopWidth:10, borderTopColor:secOneBorderColor, borderRightColor: 'gray', borderRightWidth:2, backgroundColor:secOneBgColor}} />
      <View style={{ flex: 1,  height:vh(100), borderTopWidth:10, borderTopColor:secTwoBorderColor, borderRightColor: 'gray', borderRightWidth:2,backgroundColor:secTwoBgColor }} />
      <View style={{ flex: 1, height:vh(100), borderTopWidth:10, borderTopColor:secThreeBorderColor,backgroundColor:secThreeBgColor }} />
      </View>
      
      <View style={[styles.plank, {transform:[{rotate:torque(tagged,finished)+'deg'}]}]}>
      <Ball direction={torque(tagged,finished)} count={tagged} type="tagged" focusSectionProp={focusSection} focusBall={setSelectedBall} navigation={navigation}/>
      <Ball direction={torque(tagged,finished)} count={capture} type="captured" focusSectionProp={focusSection} focusBall={setSelectedBall} navigation={navigation}/>
      <Ball direction={torque(tagged,finished)} count={finished} type="finished" focusSectionProp={focusSection} focusBall={setSelectedBall}/>

      <Plank/>
      </View>
      {bottomDrawerVisible?<BottomDrawer
      containerHeight={vh(10)}
      backgroundColor={bottomDrawerColor}
      roundedEdges={true}
      style={[{width:vw(10)},{borderTopRightRadius:30}]}>
        <Text
        style={{textAlign:'center', fontWeight:'bold'}}
        >Fix this flag!</Text>
      
      </BottomDrawer>:null}     
     </View>
  );
  
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000',
  },
  plank:{
    flex:1,
    width: vw(100),
    height: 'auto',
    position:'absolute',
    top:vh(40),
    left:vw(7),
     }
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

