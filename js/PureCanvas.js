import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated, TouchableHighlight } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class PureCanvas extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        // console.log(this.props.coords)
        this.state = {
            pan: new Animated.ValueXY(),
            currPanel:props.currPanel,
            selected:false
          };
      
        this.styles = StyleSheet.create({
            circle: {
                height: vw(2),
                width: vw(2),
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
            if (props.type=="tagged"){
                this.currPanel=1;
                this.bgColor="None"
                this.borderColor="#E1370E"
            }
            else if (props.type=="captured"){
                this.currPanel=2
                this.bgColor="#F1CC34"
                this.borderColor="#F1CC34"
            }
            else if (props.type=="finished"){
                this.currPanel=3
                this.bgColor="#33B807"
                this.borderColor="#33B807"
            }
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    console.log('mounted');
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
        console.log('moving');
        this.state.pan.setValue({x:gesture.dx,y:gesture.dy})
        // return Animated.event([
        // null, { dx: this.state.pan.x, dy: this.state.pan.y }
    //   ])
    },
      onPanResponderRelease        : (e, gesture) => {
          console.log(this.state.pan.x._value+" "+vw(33)+" "+gesture.moveX)
        //   this.state.pan.extractOffset();
          
          
            if (gesture.moveX<vw(33)){
                console.log("Entered 1st panel")
                if(this.currPanel>=1){
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                      }).start();
                }

            }
            else if (gesture.moveX>vw(33) && gesture.moveX<vw(66)){
                console.log("Entered 2nd panel");
                if (this.currPanel>=2){
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                  }).start();
                }
          }
          else if(gesture.moveX>vw(66)){
              console.log("Entered 3rd panel")
          }
      }
      // adjusting delta value
    //   this.state.pan.setValue({ x:0, y:0})
    });
    this.customStyle = function(){
        return(
            {
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
    const panStyle = {
        transform: this.state.pan.getTranslateTransform(),
        zindex: 4
      }
      return (
        <TouchableHighlight onPress={() => {
            this.state.selected=true;
            console.log(this.state.selected)
          }} underlayColor="white">
        <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle,this.styles.circle, this.customStyle(),this.state.selected && this.styles.circleSelected]}
        
      />
      </TouchableHighlight>
     

      );
    }

  }

//   {transform: [{ translateX: this.state.pan.x._value }, { translateY: this.state.pan.y.value }]}