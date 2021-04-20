import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image,findNodeHandle } from 'react-native';
import {Button, Tooltip} from 'react-native-elements';
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
import Modal from 'react-native-modalbox';
import {Camera} from 'expo-camera';
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
        <Stack.Screen name="Camera" component={CameraView}/>
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
  const [isOpen, setIsOpen]=useState(false);
  const [bottomDrawerColor, setBottomDrawerColor]=useState("None");
  const modalRef = React.useRef();
  var selectedElementRef = React.useRef();

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
      setSecThreeBorderColor("rgba(51, 184, 7, 0.3)")
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
      setSecThreeBorderColor("rgba(51, 184, 7, 0.3)")

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

  var drawerText={}
  if (selectedBall.startsWith('tagged')){
    if (selectedBallSection==2)
      drawerText.title="Fix this flag!"
      drawerText.header="FLAGGED"
    if (selectedBallSection==1)
    drawerText.title="Flag information"

  }
  if (selectedBall.startsWith('captured')){
    if (selectedBallSection==2)
    drawerText.title="Flag information"
    drawerText.header="FIXED"
    if (selectedBallSection==3)
    drawerText.title="Finish this flag!"
  }
  if (selectedBall.startsWith('finished')){
    if (selectedBallSection==3)
    drawerText.title="Flag information"
    drawerText.header="FINISHED"
  }
  var BContent = (
    <View style={[styles.btnModal,{zIndex:1}]}>
      <Button containerStyle={styles.addFlagWrapper} buttonStyle={styles.addFlagBtn} titleStyle={{color:'black', fontWeight:'600'}}  title="X" color="black" onPress={() => setIsOpen(false)}/>
    </View>
  );
  var itemArr=[]
  for (var i=0;i<10;i++){
    itemArr.push(
      <View style={{flex:1, flexDirection:'row', marginStart:30}} key={i.toString()}>
      <Image source={require('./js/res/sampleImage.png')} style={{width:50, resizeMode:'contain', marginRight:20}}></Image>
      <Text style={{flex:1, marginTop:30, marginStart:30, fontWeight:'600'}} key={i}>Some sample text</Text>
      </View>
    );

  }
  var setSelectRef=(ref)=>{
    selectedElementRef=ref
  }

  return (
    <View style={{overflow:'hidden', flex:1, backgroundColor:'black'}} 
    onStartShouldSetResponder={evt => {
      evt.persist();
      let elementHandle = findNodeHandle(selectedElementRef);
        if (elementHandle == evt.target) {
          return;
        }
        setSelectRef(evt.target);
        console.log(evt.target);
      
    }}
    >
    
    <View style={[styles.container,{flexDirection: "row", flex:9}]}>
        <View style={{ flex: 1, height:'100%' , borderTopWidth:10, borderTopColor:secOneBorderColor, borderRightColor: 'gray', borderRightWidth:2, backgroundColor:secOneBgColor}} >
          <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Flagged</Text>
        </View>
        <View style={{ flex: 1,  height:'100%', borderTopWidth:10, borderTopColor:secTwoBorderColor, borderRightColor: 'gray', borderRightWidth:2,backgroundColor:secTwoBgColor }} >
          <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Fixed</Text>
        </View>
        <View style={{ flex: 1, height:'100%', borderTopWidth:10, borderTopColor:secThreeBorderColor,backgroundColor:secThreeBgColor }} >
          <Text style={{top:vh(2), color:'white', textAlign:'center'}}>Finished</Text></View>
        </View>
      
        <View style={[styles.plank, {transform:[{rotate:torque(tagged,finished)+'deg'}]}]}>
        
        <Ball direction={torque(tagged,finished)} 
        count={tagged} type="tagged" 
        focusSectionProp={focusSection} 
        focusBall={setSelectedBall} 
        focusBallSection={setSelectedBallSection} 
        navigation={navigation}
        setSelectRef = {setSelectRef}
        selectedElementRef={selectedElementRef}
        />

        <Ball direction={torque(tagged,finished)} 
        count={capture} type="captured" 
        focusSectionProp={focusSection} 
        focusBall={setSelectedBall} 
        focusBallSection={setSelectedBallSection} 
        navigation={navigation}
        setSelectRef = {setSelectRef}
        selectedElementRef={selectedElementRef}/>

        <Ball direction={torque(tagged,finished)} 
        count={finished} type="finished" 
        focusSectionProp={focusSection} 
        focusBall={setSelectedBall} 
        focusBallSection={setSelectedBallSection}
        setSelectRef = {setSelectRef}
        selectedElementRef={selectedElementRef}/>
        <Plank/>
        

      </View>

      <Button containerStyle={styles.addFlagWrapper} buttonStyle={styles.addFlagBtn} titleStyle={{color:'black', fontWeight:'600'}} title="+" onPress={()=>navigation.navigate('Camera')}/>
      {bottomDrawerVisible?<BottomButton
      text={drawerText.title} backgroundColor={bottomDrawerColor} modalRef={modalRef}>      
      </BottomButton>:null}  
      <Modal style={styles.modal} position={"bottom"} ref={modalRef} isOpen={isOpen} onClosed={() => setIsOpen(false)} backdropPressToClose={true} backdrop={true} backdropContent={BContent} backdropOpacity={0.5}>
          <ScrollView style={{width:'100%'}}>
          <Image
          source={require('./js/res/sampleImage.png')}
          style={styles.imageStyle}
          ></Image>
          <Text h3 style={[styles.modalHeader, {color:bottomDrawerColor}]}>{drawerText.header}</Text>
          {itemArr}
          </ScrollView>
      </Modal>

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
     },
  modal: {
  justifyContent: 'center',
  alignItems: 'center',
  flex:0.8,
  borderTopLeftRadius:50,
  borderTopRightRadius:50,
  zIndex:3
  
  },
  btnModal: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
    },
  modalHeader:{
    fontWeight:'600',
    fontSize:10,
    marginStart: 50,
    marginTop:30

  }
  ,
  imageStyle:{
    marginTop:30,
    width:'100%',
    height:vh(50),
    flex:1,
    resizeMode:'contain',
    borderTopRightRadius:50,
    borderTopLeftRadius:50
  },
  addFlagWrapper:{
    borderRadius:50,
    position:'absolute',
    backgroundColor:'white',
    bottom:20,
    left:20,
    width:vw(4),
    height:vw(4),
    zIndex:2,
    flex:1,
    justifyContent:'center'
  },
  addFlagBtn:{
    backgroundColor:'white',
    width:'100%',
    height:'100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
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

class CameraView extends React.Component {
  render(){
    return(
      <Camera/>
    )
  }
}