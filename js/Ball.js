import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated, TouchableWithoutFeedbackComponent } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import PureCanvas from './PureCanvas'
export default class Ball extends React.Component {
    constructor(props) {
      super(props);
      this.saveContext = this.saveContext.bind(this);
      var props = this.props;
      var radius = vw(2.5),
          direction = props.direction,                         // ball radius
          deg = -60 / 180 * Math.PI,          // direction of row start -60°
          plankDeg =   -(direction-60) / 180 * Math.PI,
          balls = props.count,                         // number of balls to draw
          drawn = 0,                          // count balls drawn on current row
          rowLen = 1,                         // max length of current row (first=1)
          x = 0,                            // start point
          y = vh(19),                            //
          cx = 0, cy =vh(19),                  // replicates start point + offsets
          v = {                               // vector
              x: radius * 1.5 * Math.cos(deg),
              y: radius * 1.5 * Math.sin(deg)
          },
          pv = {
              //vector for the plank
              x:radius * 1.5 * Math.cos(plankDeg),
              y: radius * 1.5 * Math.sin(plankDeg)
          },
          i;
      this.itemProps=[]
      this.handleLayoutChange = this.handleLayoutChange.bind(this);

      if (props.type=="tagged"){
        if (direction<0){
          x=0
          cx=0
        }
        else{
          x=vw(25)-(balls/3 * vw(4))
          cx=vw(25) - (balls/3 * vw(4))
        }
        
      }

      if (props.type == "finished"){
        if (direction<0){
          x=vw(60)
          cx=vw(60)
        }
        else{
          x = vw(90) - (balls/3 * vw(4))
          cx=vw(90) - (balls/3 * vw(4))

        }
        
      }
      if (props.type=="captured"){
        if (direction<0){
          x=vw(26)
          cx=vw(26)
        }
        else{
          x = vw(58) - (balls/3 * vw(4))
          cx=vw(58) - (balls/3 * vw(4))

        }
        
      }
      if (props.type=="untagged"){
        x=10,
        cx=10
        y=vh(100)-50
        cy=vh(100)-50
      }
      

      for(i = 0; i <  balls; i++) {
          var itemProp = {
              itemCx:cx,
              itemCy:cy,
              id:this.props.type+"-"+i
          }
          // drawBall(cx, cy);      
                        // draw ball
          this.itemProps.push(itemProp)
          // cx -= radius * 2;
          cx += pv.x;
          cy += pv.y;                     // move diameter of ball to left (in this case)
          drawn++;                              // increase balls on row count
          
          if (drawn === rowLen) { 
              drawn = 0;
              cx = x + v.x * rowLen; 
              cy = y + v.y * rowLen;                               
              rowLen++;
          }

        }
    }
  
    saveContext(ctx) {
      this.ctx = ctx;
      this.width = this.ctx.canvas.width;
      this.height = this.ctx.canvas.height;
    }
  

  renderBalls(){
      return this.itemProps.map((item)=>{
          return(
                  <PureCanvas 
                  coords={item} 
                  key={item.id} 
                  type={this.props.type} 
                  focusSectionProp={this.props.focusSectionProp} 
                  focusBall = {this.props.focusBall} 
                  focusBallSection = {this.props.focusBallSection} 
                  navigation={this.props.navigation}
                  direction={this.props.direction}
                  setSelectRef = {this.props.setSelectRef}
                  selectedElementRef={this.props.selectedElementRef}/>
              
          );
      });
  }
  handleLayoutChange() {
    this.feedPost.measure( (fx, fy, width, height, px, py) => {
      this.fromTop=py
      this.fromLeft=px
      console.log(this.props.type)
      console.log(fx, fy, width, height, px, py)
    })
  }
    render() {
        
      return (
          <View style={{width:'auto',height:'100%', position:"relative"}}>
              {this.renderBalls()}
          </View>
      )
    }
  }