import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, TouchableHighlight, Button } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modalbox';


export default class BottomButton extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3
          };
        this.modalRef = React.createRef();
        //calculate orientation
        
        this.styles=StyleSheet.create({
            wrapper:{
                flex:1,
                justifyContent:'flex-end',
                backgroundColor:'transparent'

            },
            btn:{
                marginBottom: 0,
                flex:1,
                justifyContent:'center',
                backgroundColor:this.props.backgroundColor,
                borderTopRightRadius:50,
                borderTopLeftRadius:50,
                zIndex:1
                },
            btnModal: {
                position: "absolute",
                top: 10,
                right: 10,
                width: 50,
                height: 50,
                backgroundColor: "transparent"
                },
            modal: {
                justifyContent: 'center',
                alignItems: 'center',
                flex:1
                },


        })
    }
    render(){
        var BContent = (
            <View style={[this.styles.btnModal]}>
              <Button title="X" color="white" onPress={() => this.setState({isOpen: false})}/>
            </View>
          );

        return(
                <TouchableHighlight style={[this.styles.btn, {backgroundColor:this.props.backgroundColor}]} onPress={()=>this.props.modalRef.current.open()}>
                    <Text style={{textAlign:'center', fontWeight:'bold'}}>{this.props.text}</Text>

                </TouchableHighlight>

            
        )
    }
}