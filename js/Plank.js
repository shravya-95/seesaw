import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
const Plank = function(props){
    
    return(
    
            <Image source = {require('./res/plank_new.png')} 
    style = {[plankStyle.plank]}  onLayout={event => {
        const layout = event.nativeEvent.layout;
        console.log('height:', layout.height);
        console.log('width:', layout.width);
        console.log('x:', layout.x);
        console.log('y:', layout.y);
    }}/>

    );
} 
const win = Dimensions.get('window');
var plankStyle = StyleSheet.create({
    plank:{
        flex:1,
        width: vw(90),
        height: win.height/2,
        position:'absolute',
        resizeMode:'contain',  
        zIndex:-1
    }
})

 export default Plank

