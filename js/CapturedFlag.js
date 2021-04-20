import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class CapturedFlag extends React.Component {
    constructor(props){
        super(props);
        this.state={
            width:this.props.width,
            shadowRadius:0,
            moveY:0
           
        }
        this.handleLayoutChange = this.handleLayoutChange.bind(this);

        
            
    }
    handleLayoutChange() {
        this.feedPost.measure( (fx, fy, width, height, px, py) => {
          this.fromTop=py
          this.fromLeft=px

        })
      }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.width !== this.state.width) {
          this.setState({ width: nextProps.width });
        }
        if (nextProps.shadowRadius !== this.state.shadowRadius) {
            this.setState({ shadowRadius: nextProps.shadowRadius });
          }
          if (nextProps.moveY !== this.state.moveY) {
            this.setState({ moveY: nextProps.moveY });
          }
      }
render(){
    this.styles = {
        wrapper: {
            width:this.state.width,
            height:this.state.width,
            top:this.props.coords.itemCy,
            left:this.props.coords.itemCx,
            position:"absolute",
            borderRadius: 50,
            borderWidth:2,
            borderColor:this.props.borderColor,
            flex:1,
            flexWrap:'nowrap',
            flexDirection:'row',
            overflow:'hidden',
            shadowRadius:this.state.shadowRadius,
            shadowColor:this.props.borderColor,
           
          },
        right:{
            backgroundColor:this.props.color,
            height:this.state.width,
            width:this.state.width/2
        },
        left:{
            backgroundColor:'None',
            height:this.state.width,
            width:this.state.width/2

        }
        }
    return(
        <View onLayout={(event) => {this.handleLayoutChange(event) }} 
        ref={view => { this.feedPost = view; }}
        style={[this.styles.wrapper,{transform:[{translateY:this.state.moveY},{rotate:'45deg'}]}]}>
            <View style={this.styles.left}></View>
            <View style={this.styles.right}></View>
        </View>
    )
}
}