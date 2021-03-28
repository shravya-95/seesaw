import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class PureCanvas extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        // console.log(this.props.coords)
        this.state = {
            pan: new Animated.ValueXY()
          };
      
        this.styles = StyleSheet.create({
            circle: {
                height: 20,
                width: 20,
                top:this.props.coords.itemCy,
                left:this.props.coords.itemCx,
                backgroundColor: "blue",
                position:"absolute",
                borderRadius: 50
              }
            });
    }

    shouldComponentUpdate() {
      return false;
    }
    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x:0, y:0 }
        console.log('mounted');
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (e, gesture) => {
            console.log('start capture');  
            return true},
          onPanResponderGrant: (e, gesture) => {
            this.state.pan.setOffset({
              x: this._val.x,
              y:this._val.y
            })
            this.state.pan.setValue({ x:0, y:0})
          },
          onPanResponderMove: ()=>{
            console.log('moving');
            return Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
          ])}
          // adjusting delta value
        //   this.state.pan.setValue({ x:0, y:0})
        });
      }
    

    //should return a view with the circle at a given coordinate
  
    render() {
    //    var props=this.props;
    const panStyle = {
        transform: this.state.pan.getTranslateTransform()
      }
      return (
       
        <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle,this.styles.circle]}
      />
     

      );
    }

  }

  