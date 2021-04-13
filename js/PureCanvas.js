import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated, TouchableHighlight } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { createStackNavigator } from '@react-navigation/stack';
import CapturedFlag from './CapturedFlag'

export default class PureCanvas extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        // console.log(this.props)
        this.state = {
            pan: new Animated.ValueXY(),
            currPanel:props.currPanel,
            selected:this.props.focusBall==this.props.coords.id,
            section:null
          };
          
        this.styles = StyleSheet.create({
            circle: {
                
                top:this.props.coords.itemCy,
                left:this.props.coords.itemCx,
                position:"absolute",
                borderRadius: 50,
                borderWidth:2
              },
            circleSelected:{
                height:50,
                width:50,
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                backgroundColor:'white',
            }
            });
            const TAB_BAR_HEIGHT = 49;
            var section = 0;
            if (props.type=="tagged"){
                this.currPanel=1;
                this.bgColor="None"
                this.borderColor="#E1370E"
                this.state.section=1
            }
            else if (props.type=="captured"){
                this.currPanel=2
                this.bgColor="#F1CC34"
                this.borderColor="#F1CC34"
                this.state.section=2
            }
            else if (props.type=="finished"){
                this.currPanel=3
                this.bgColor="#33B807"
                this.borderColor="#33B807"
                this.state.section=3
            }
            // this.setState({section:section},()=>{
            //   console.log(this.state.section, 'section updated')
            // })
            this.captured = this.props.type=='captured'
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({

        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            return gestureState.dx != 0 && gestureState.dy != 0;
       },
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y:this._val.y
        })
        // this.state.pan.setValue({ x:0, y:0})
      },
      onPanResponderMove: (e,gesture)=>{
        this.state.pan.setValue({x:gesture.dx,y:gesture.dy})
        this.props.focusBall(this.props.coords.id)
        // return Animated.event([
        // null, { dx: this.state.pan.x, dy: this.state.pan.y }
    //   ])
    },
      onPanResponderRelease        : (e, gesture) => {
        //   this.state.pan.extractOffset();
          
          
            if (gesture.moveX<vw(33)){
                console.log("Entered 1st panel")
                if(this.currPanel>=1){
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                      }).start();
                }
                else{
                  // this.props.navigation.navigate("Steps")
                }

            }
            else if (gesture.moveX>vw(33) && gesture.moveX<vw(66)){
                console.log("Entered 2nd panel");
                if (this.props.type=='captured' || this.props.type=='finished'){
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                  }).start();
                }
                else{
                  section=2
                  
                  this.props.focusBallSection(2, this.props.coords.id)
                  // this.props.navigation.navigate("Steps")
                }
          }
          else if(gesture.moveX>vw(66)){
              console.log("Entered 3rd panel")
              if (this.props.type=='finished' || this.props.type=='tagged'){
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                  }).start();
                }
                else{
                  section=3
                  
                  this.props.focusBallSection(3,this.props.coords.id)
                  // this.props.navigation.navigate("Steps")
                }
          }
          // this.setState({section:section},()=>{
          //   console.log(this.state.section, 'section updated')
          // })
          
          this.props.focusSectionProp(section,this.props.coords.id);
      }
      // adjusting delta value
    //   this.state.pan.setValue({ x:0, y:0})
    });
    
    this.customStyle = function(){
      
      if (this.state.selected==true){
        console.log("SELECTED")
        return({
          width:vw(9),
          height:vw(9),
          backgroundColor: this.bgColor, 
          borderColor: this.borderColor,
        }
        )
        
      }
        return(
            {
              height: vw(3),
                width: vw(3),
                backgroundColor: this.bgColor, 
                borderColor: this.borderColor,
             })
        
    }
        }

    shouldComponentUpdate() {
      return false;
    }

    

    

    //should return a view with the circle at a given coordinate
  
    render() {
      {console.log("re-render")}
      this.customStyle=this.customStyle.bind(this)
    const panStyle = {
        transform: this.state.pan.getTranslateTransform(),
        zindex: 4
      }
      return (
        
        <TouchableHighlight onPress={() => {
            this.setState({selected:true})
            console.log(this.state.section)
            this.props.focusSectionProp(this.state.section,this.props.coords.id);
          }} underlayColor="white">
        
        <Animated.View
        {...this.panResponder.panHandlers} style={panStyle}>
          {this.captured?<CapturedFlag 
        {...this.panResponder.panHandlers}
        color={this.bgColor} coords={this.props.coords} borderColor={this.borderColor} style={panStyle}/>:
        <View style={[this.customStyle(),this.styles.circle]}/>}
        </Animated.View>
    
        
      </TouchableHighlight>
     

      );
    }

  }

//   {transform: [{ translateX: this.state.pan.x._value }, { translateY: this.state.pan.y.value }]}