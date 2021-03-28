import React, {Component, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, PanResponder, Animated } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class Weight extends Component{

    constructor(props){
        super(props);
        this.props=props;
        this.canvasRef=React.createRef();
        this.saveContext = this.saveContext.bind(this);
        this.state = {
            pan: new Animated.ValueXY()
          };
    }
    saveContext(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
      }
    componentWillMount(){
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset({
                  x: this.state.pan.x._value,
                  y: this.state.pan.y._value
                });
              },
            onPanResponderMove: (Animated.event([
              null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ])),
            // adjusting delta value
            
          });
          

    }
    componentDidMount = () =>{
       



            const props = this.props;
            const canvas = this.canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.save();
            var radius = vh(2),
            direction = props.direction,                         // ball radius
            deg = -60 / 180 * Math.PI,          // direction of row start -60°
            plankDeg =   -(direction-60) / 180 * Math.PI,
            balls = props.count,                         // number of balls to draw
            drawn = 0,                          // count balls drawn on current row
            rowLen = 1,                         // max length of current row (first=1)
            x = 0,                            // start point
            y = vh(22),                            //
            cx = 0, cy =vh(22),                  // replicates start point + offsets
            v = {                               // vector
                x: radius * 2.5 * Math.cos(deg),
                y: radius * 2.5 * Math.sin(deg)
            },
            pv = {
                //vector for the plank
                x:radius * 2.5 * Math.cos(plankDeg),
                y: radius * 2.5 * Math.sin(plankDeg)
            },
            i;
            var maxRowLen=1;
            
            if (balls>30)
            balls=30
            ctx.fillStyle = "#E1370E";

            if (props.type=="tagged"){
                if (direction>0){
                    x=radius*4
                    cx=radius*4
                }
                else{
                    x=vw(3)
                    cx=vw(3)
                }
            }
            


            if (props.type=="finished"){
                // direction=direction*(-1)
                if (direction>0){
                    x=vw(60)
                    cx=vw(60)
                }
                else{
                    x=vw(80)
                    cx=vw(80)
                }
                
                ctx.fillStyle = "#33B807";
                ctx.fill()
            }
            if (props.type=="captured"){
                if (direction<0){
                x=vw(100)/3 + radius +3
                cx=vw(100)/3 + radius + 3
                ctx.fillStyle = "#fff";
                ctx.fill()
                }
                if (direction>0){
                    x=vw(66) - radius -5
                    cx=vw(66) - radius - 5
                    ctx.fillStyle = "#fff";
                    ctx.fill()  

                }

            }
            if (direction<=0){
                
                for(i = 0; i <  balls; i++) {
                    
                    drawBall(cx, cy);                     // draw ball
                    // cx -= radius * 2;
                    cx += pv.x;
                    cy += pv.y;                     // move diameter of ball to left (in this case)
                    drawn++;                              // increase balls on row count
                    
                    if (drawn === maxRowLen) { 
                        drawn = 0;
                                    
                        
                        if (maxRowLen<5){  
                            cx = x + v.x * rowLen; 
                            cy = y + v.y * rowLen;                               
                            rowLen++;
                            maxRowLen++;
                        }
                        else{
                            cx = x - (v.x * 4) + (v.x * rowLen * 2)
                            cy = y + v.y * 4;
                            rowLen++;
                        }                         
                    }
                }
            }
            else{
                for(i = 0; i <  balls; i++) {
                    
                    drawBall(cx, cy);                     // draw ball
                    // cx -= radius * 2;
                    cx += pv.x;
                    cy += pv.y;                     // move diameter of ball to left (in this case)
                    drawn++;                              // increase balls on row count
                    
                    if (drawn === maxRowLen) { 
                        drawn = 0;
                                    
                        
                        if (maxRowLen<5){  
                            cx = x + v.x * rowLen; 
                            cy = y + v.y * rowLen;                               
                            rowLen++;
                            maxRowLen++;
                        }
                        else{
                            cx = x - (v.x * 4) + (v.x * rowLen * 2)
                            cy = y + v.y * 4;
                            rowLen++;
                        }                         
                    }
                }

            }
            

            
            // ctx.fill();
            
        
        
        
            function drawBall(x, y) {
                ctx.lineWidth = 2;
                ctx.moveTo(x + radius, y); 
                ctx.arc(x, y, radius, 0, 6.28);
                ctx.stroke();
                ctx.closePath();
                if (props.type=="tagged"){
                    ctx.strokeStyle = "#E1370E";
                }
                else
                ctx.strokeStyle = "#33B807"

                
            }
            
            const AnimatesCanvas = Animated.createAnimatedComponent(Weight);
            
            }
        render(){
            const panStyle = {
                transform: this.state.pan.getTranslateTransform()
              }
            
            return(
                <AnimatesCanvas
                {...this.panResponder.panHandlers}
                style={{transform:  [{ translateX: this.state.pan.x }, { translateY: this.state.pan.y }]}}>
                <View style={styles.box} />
                <canvas
                ref={this.canvasRef}
                style={{position:'absolute'}}
                height='auto'
                width={vw(80)}        
                />
                </AnimatesCanvas> )
        }
            
    }
    const styles = StyleSheet.create({
        box: {
            height: 150,
            width: 150,
            backgroundColor: "blue",
            borderRadius: 5
          }
        });