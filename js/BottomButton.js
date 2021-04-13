import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


export default class BottomButton extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        //calculate orientation
        
        this.styles=StyleSheet.create({
            btn:{
                bottom:0,
                flex:1,
                justifyContent:'center',
                backgroundColor:this.props.backgroundColor,
                height:vh(10),
                borderRadius:20
                },
            


        })
    }
    render(){
        return(
            <TouchableHighlight style={this.styles.btn}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>{this.props.text}</Text>

            </TouchableHighlight>
        )
    }
}