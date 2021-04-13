import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Plank from './js/Plank';
import Weight from './js/Weight'
import CapturedFlag from './js/CapturedFlag'
import Ball from './js/Ball'
import Steps from './js/Steps'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import BottomDrawer from 'react-native-three-step-bottom-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomButton from './js/BottomButton'

/**
 * TODO:
 * 1. Selected ball - highlight
 * 2. Drawer screen - tag info
 * 3. Drawer screen - fix tag
 * 4. AR screen add new tag
 */


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
  //TODO: character?
  //TODO: tap - show detail
  const [plankLayout, setPlankLayout] = useState(null);
  const [secOneBgColor, setSecOneBgColor]=useState("None");
  const [secTwoBgColor, setSecTwoBgColor]=useState("None");
  const [secThreeBgColor, setSecThreeBgColor]=useState("None");
  const [secOneBorderColor, setSecOneBorderColor]=useState("rgba(225, 55, 14, 0.3)");
  const [secTwoBorderColor, setSecTwoBorderColor]=useState("rgba(241, 204, 52, 0.3)");
  const [secThreeBorderColor, setSecThreeBorderColor]=useState("rgba(51, 184, 7, 0.3)");
  const [selectedBall, setSelectedBall]=useState("");
  const [selectedBallSection, setSelectedBallSection]=useState(0)
  const [bottomDrawerVisible, setBottomDrawerVisible]=useState(false);
  const [bottomDrawerColor, setBottomDrawerColor]=useState("None");

  function focusSection(focus,ballKey){
    setSelectedBall(ballKey);
    // focus = selectedBallSection
    
    if (focus==1){
      setSelectedBallSection(1)
      setSecOneBgColor("rgba(225, 55, 14, 0.3)")
      setSecOneBorderColor("rgb(225, 55, 14)")
      setBottomDrawerVisible(true)
      setBottomDrawerColor("#F1ECE7")
      setSecTwoBgColor("None")
      setSecTwoBorderColor("rgba(241, 204, 52, 0.3)")
      setSecThreeBgColor("None")
      setSecThreeBorderColor("rgba(51, 184, 7, 0.3camer)")
    }
    if (focus==2){
      setSelectedBallSection(2)

      setSecOneBgColor("None")
      setSecOneBorderColor("rgba(225, 55, 14, 0.3)")
      setSecTwoBgColor("rgba(241, 204, 52, 0.3)")
      setSecTwoBorderColor("rgba(241, 204, 52, 1.0)")
      setBottomDrawerVisible(true)
      setBottomDrawerColor("rgb(241, 204, 52)")
      setSecThreeBgColor("None")
      setSecThreeBorderColor()

    }
    if (focus==3){
      setSelectedBallSection(3)
      setSecOneBgColor("None")
      setSecOneBorderColor("rgba(225, 55, 14, 0.3)")

      setSecTwoBgColor("None")
      setSecTwoBorderColor("rgba(241, 204, 52, 0.3)")

      setSecThreeBgColor("rgba(51, 184, 7, 0.3)")
      setSecThreeBorderColor("rgba(51, 184, 7, 1.0)")
      setBottomDrawerVisible(true)
      setBottomDrawerColor("rgba(51, 184, 7, 1.0)")

    }
    var drawerText=""
  if (selectedBall.startsWith('tagged')){
    if (selectedBallSection==2)
      drawerText="Fix this flag!"
    if (selectedBallSection==1)
      drawerText="Flag information"

  }
  if (selectedBall.startsWith('captured')){
    if (selectedBallSection==2)
      drawerText="Flag information"
    if (selectedBallSection==3)
      drawerText="Finish this flag!"
  }
  if (selectedBall.startsWith('finished')){
    if (selectedBallSection==3)
      drawerText="Flag information"
  }
  
  }
  var tagged = 1;
  var finished = 10;
  var capture=5;

  var drawerText=""
  if (selectedBall.startsWith('tagged')){
    if (selectedBallSection==2)
      drawerText="Fix this flag!"
    if (selectedBallSection==1)
      drawerText="Flag information"

  }
  if (selectedBall.startsWith('captured')){
    if (selectedBallSection==2)
      drawerText="Flag information"
    if (selectedBallSection==3)
      drawerText="Finish this flag!"
  }
  if (selectedBall.startsWith('finished')){
    if (selectedBallSection==3)
      drawerText="Flag information"
  }



  return (
    <View style={{overflow:'hidden'}}>
    
    <View style={[styles.container,{flexDirection: "row"}]}>
      <View style={{ flex: 1,  height:vh(100),borderTopWidth:10, borderTopColor:secOneBorderColor, borderRightColor: 'gray', borderRightWidth:2, backgroundColor:secOneBgColor}} >
        <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Flagged</Text>
      </View>
      <View style={{ flex: 1,  height:vh(100), borderTopWidth:10, borderTopColor:secTwoBorderColor, borderRightColor: 'gray', borderRightWidth:2,backgroundColor:secTwoBgColor }} >
      <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Fixed</Text>
      </View>
      <View style={{ flex: 1, height:vh(100), borderTopWidth:10, borderTopColor:secThreeBorderColor,backgroundColor:secThreeBgColor }} >
        <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Finished</Text></View>
      </View>
      
      <View style={[styles.plank, {transform:[{rotate:torque(tagged,finished)+'deg'}]}]}>
      <Ball direction={torque(tagged,finished)} count={tagged} type="tagged" focusSectionProp={focusSection} focusBall={setSelectedBall} focusBallSection={setSelectedBallSection} navigation={navigation}/>
      <Ball direction={torque(tagged,finished)} count={capture} type="captured" focusSectionProp={focusSection} focusBall={setSelectedBall} focusBallSection={setSelectedBallSection} navigation={navigation}/>
      <Ball direction={torque(tagged,finished)} count={finished} type="finished" focusSectionProp={focusSection} focusBall={setSelectedBall} focusBallSection={setSelectedBallSection}/>

      <Plank/>
      </View>
      {bottomDrawerVisible?<BottomDrawer
      containerHeight={vh(80)}
      
      startUp={false}
      downDisplay={vh(70)}
      backgroundColor={bottomDrawerColor}
     
      roundedEdges={true}
      style={[{width:vw(10)},{borderTopRightRadius:30}]}>
        <View>
        <Text
        style={{textAlign:'center', fontWeight:'bold'}}
        >{drawerText}</Text>
        
        <ScrollView>
       
          <View style={{height:200, zIndex:1}}><Text>Hello I am an item!</Text></View>
        
        </ScrollView>
        </View>
      
      
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

