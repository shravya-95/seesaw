import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class CapturedFlag extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.styles = StyleSheet.create({
            wrapper: {
                width:vw(3),
                height:vw(3),
                top:this.props.coords.itemCy,
                left:this.props.coords.itemCx,
                position:"absolute",
                borderRadius: 50,
                borderWidth:2,
                borderColor:this.props.borderColor,
                flex:1,
                flexWrap:'nowrap',
                flexDirection:'row',
                overflow:'hidden'
               
              },
            right:{
                backgroundColor:this.props.color,
                height:vw(3),
                width:vw(1.5)
            },
            left:{
                backgroundColor:'None',
                height:vw(3),
                width:vw(1.5)

            }
            })
            
    }
render(){
    return(
        <View style={[this.styles.wrapper,{transform:[{rotate:'45deg'}]}]}>
            <View style={this.styles.left}></View>
            <View style={this.styles.right}></View>
        </View>
    )
}
}