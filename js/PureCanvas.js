import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated, TouchableHighlight, Modal, findNodeHandle, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { createStackNavigator } from '@react-navigation/stack';
import CapturedFlag from './CapturedFlag'
import Tooltip from 'react-native-walkthrough-tooltip';
import Popover from 'react-native-popover-view';



export default class PureCanvas extends React.Component {

    constructor(props){
        super(props);
        this.props=props;
        // console.log(this.props)
        this.state = {
            pan: new Animated.ValueXY(),
            currPanel:props.currPanel,
            selected:this.props.focusBall==this.props.coords.id,
            section:null,
            toolTipVisible:false,
            backgroundColor: this.bgColor, 
            borderColor: this.borderColor,
            height: vw(3),
            width: vw(3),
            shadowRadius:0,
            moveY:0,
            moveX:0
            
          };
          this.elementRef = React.createRef();

        this.styles = StyleSheet.create({
            circle: {
                
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
            const TAB_BAR_HEIGHT = 49;
            var section = 0;
            if (props.type=="tagged"){
                this.currPanel=1;
                this.bgColor="None"
                this.borderColor="#E1370E"
                this.state.section=1
            }
            else if (props.type=="captured"){
                this.currPanel=2
                this.bgColor="#F1CC34"
                this.borderColor="#F1CC34"
                this.state.section=2
            }
            else if (props.type=="finished"){
                this.currPanel=3
                this.bgColor="#33B807"
                this.borderColor="#33B807"
                this.state.section=3
            }
            else if (props.type=="untagged"){
              this.bgColor='pink'
              this.state.section=3
            }
            this.state.backgroundColor=this.bgColor
            this.state.borderColor=this.borderColor
            // this.setState({section:section},()=>{
            //   console.log(this.state.section, 'section updated')
            // })
            this.captured = this.props.type=='captured'
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.setBallStyle = this.setBallStyle.bind(this);
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
      },
      onPanResponderMove: (e,gesture)=>{
        this.state.pan.setValue({x:gesture.dx,y:gesture.dy})
        this.props.focusBall(this.props.coords.id)
        // return Animated.event([
        // null, { dx: this.state.pan.x, dy: this.state.pan.y }
    //   ])
    },
      onPanResponderRelease        : (e, gesture) => {
        //   this.state.pan.extractOffset();
          
          
            if (gesture.moveX<vw(33)){
                console.log("Entered 1st panel")
                if(this.currPanel>=1){
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                      }).start();
                }
                else{
                  // this.props.navigation.navigate("Steps")
                }

            }
            else if (gesture.moveX>vw(33) && gesture.moveX<vw(66)){
                console.log("Entered 2nd panel");
                if (this.props.type=='captured' || this.props.type=='finished'){
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                  }).start();
                }
                else{
                  section=2
                  
                  this.props.focusBallSection(2, this.props.coords.id)
                  // this.props.navigation.navigate("Steps")
                }
          }
          else if(gesture.moveX>vw(66)){
              console.log("Entered 3rd panel")
              if (this.props.type=='finished' || this.props.type=='tagged'){
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                  }).start();
                }
                else{
                  section=3
                  
                  this.props.focusBallSection(3,this.props.coords.id)
                  // this.props.navigation.navigate("Steps")
                }
          }
          // this.setState({section:section},()=>{
          //   console.log(this.state.section, 'section updated')
          // })
          
          this.props.focusSectionProp(section,this.props.coords.id);
      }
      // adjusting delta value
    //   this.state.pan.setValue({ x:0, y:0})
    });
    
    
        }
        



    
    handleLayoutChange() {
      this.feedPost.measure( (fx, fy, width, height, px, py) => {
        this.fromTop=py
        this.fromLeft=px
      })
    }
    setBallStyle(){
      var currSelectedElement = findNodeHandle(this.props.selectedElementRef);
      if (currSelectedElement!=this.elementRef && this.state.selected){
        this.setState({selected:false,width:vw(3), height:vw(3), shadowRadius:0, moveY:-this.fromTop})
      }
    }
    componentDidMount(){
      this.setBallStyle();
    }
    // componentWillReceiveProps(nextProps){
    //   if (nextProps.width !== this.state.width) {
    //     this.setState({ width: nextProps.width });
    //   }
    // }

    //should return a view with the circle at a given coordinate
  
    render() {
      
      var ballStyle={
        height:this.state.height,
        width:this.state.width,
        backgroundColor:this.state.backgroundColor,
        borderColor:this.state.borderColor,
        shadowRadius:this.state.shadowRadius,
        shadowColor:this.state.borderColor,
        transform:[{translateY:this.state.moveY, translateX:this.state.moveX}]
        
      }
    const panStyle = {
        transform: this.state.pan.getTranslateTransform(),
        
      }
      return (
      <>
        
    
        <TouchableHighlight 
        
        onLayout={
          (event) => {this.handleLayoutChange(event) }} 
          ref={view => { this.feedPost = view; }}
      onPress={() => {
          this.setState({toolTipVisible:true,selected:true,width:vw(4), height:vw(4), shadowRadius:4, moveY:-this.fromTop-this.props.coords.itemCy+vh(10)})
          this.props.focusSectionProp(this.state.section,this.props.coords.id);
          this.props.setSelectRef(this.elementRef)
        }} underlayColor="white">

                        
        <Animated.View
        {...this.panResponder.panHandlers} style={[panStyle,{height:'100%'}]}
         
        >
          
          <Popover
          mode='tooltip'
          isVisible={this.state.toolTipVisible}
          placement='bottom'
          verticalOffset={-this.props.coords.itemCy+this.state.moveY-100}
          onRequestClose={()=> this.setState({toolTipVisible:false})}
          backgroundStyle={{backgroundColor:'rgba(255,255,255,0.3)'}}
          popoverStyle={{backgroundColor:'rgba(255,255,255,0.8)', width:vh(40),padding:10, transform:[{rotate:"45deg"}]}}
          from={(this.captured?<CapturedFlag 
            {...this.panResponder.panHandlers}
            color={this.bgColor} 
            coords={this.props.coords} 
            borderColor={this.borderColor} 
            style={[panStyle]} 
            shadowRadius={this.state.shadowRadius} 
            width={this.state.width}
            moveY={this.state.moveY}
            />:
            <View ref={this.elementRef} style={[ballStyle,this.styles.circle]}/>)}
          >
            <Text>Flag Description - here is some detail about the flag</Text>
          </Popover>
        
        </Animated.View>
        </TouchableHighlight>
      
        
    
        </>

      );
    }

  }

//   {transform: [{ translateX: this.state.pan.x._value }, { translateY: this.state.pan.y.value }]}