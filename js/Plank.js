import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
const Plank = function(props){
    
    return(
    <div>

    <Image source = {require('C:/Users/Shravya Gade/Repos/RA/SeeSaw/js/res/plank.png')} 
    style = {[plankStyle.plank ,{transform:[{rotate:(props.degree+15)+'deg'}]}]}  onLayout={event => {
        const layout = event.nativeEvent.layout;
        console.log('height:', layout.height);
        console.log('width:', layout.width);
        console.log('x:', layout.x);
        console.log('y:', layout.y);
    }}/>
   
    </div>);
} 
const win = Dimensions.get('window');
var plankStyle = StyleSheet.create({
    plank:{
        flex:1,
        width: vw(100),
        height: win.height/2,
        position:'absolute',
        top:vh(100)/2,
        left:0,
        resizeMode:'contain',  
        zIndex:4  
    }
})

 export default Plank

