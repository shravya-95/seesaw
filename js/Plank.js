import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const Plank = function(props){
    return(
    <div>
    <Image source = {require('C:/Users/Shravya Gade/Repos/RA/SeeSaw/js/res/plank.png')} 
    style = {[plankStyle.plank ,{transform:[{rotate:(props.degree+15)+'deg'}]}]} />
    </div>);
    
} 
const win = Dimensions.get('window');
var plankStyle = StyleSheet.create({
    plank:{
        flex:1,
        width: win.width/2,
        height: win.height/2,
        position:'absolute',
        zIndex:1,
        top:win.height/4,
        left:win.width/4,
        resizeMode:'contain',    
    }
})

 export default Plank

