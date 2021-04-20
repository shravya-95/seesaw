import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class Steps extends React.Component {
    render(){
        return(
            <View 
            style={{backgroundColor:"black", height:vh(100)}}>
                <Button
          title="Go back"
          color="black"
          onPress={() => this.props.navigation.goBack()}
        />
                <Text
                style={{color:"white", textAlign:"center", fontWeight:'600'}}
                >
                    Some steps to fix...</Text>
                
            </View>
        )
    }
}
