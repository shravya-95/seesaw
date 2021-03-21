import React, {useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const Weight = function(props){
    const canvasRef = useRef(null);
    useEffect(() =>{
        var ctx = canvasRef.current.getContext("2d");
        // ctx.clearRect(0,0,vw(100),vh(100));
        ctx.save();
        var radius = 9,
        direction = props.direction,                         // ball radius
        deg = -60 / 180 * Math.PI,          // direction of row start -60°
        plankDeg =   -(direction-60) / 180 * Math.PI,
        balls = props.count,                         // number of balls to draw
        drawn = 0,                          // count balls drawn on current row
        rowLen = 1,                         // max length of current row (first=1)
        x = 13,                            // start point
        y = 90,                            //
        cx = 13, cy =90,                  // replicates start point + offsets
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
            if (direction<0){
                x=13
                cx=13
            }
            else{
                x=vw(33) - radius
                cx=vw(33) - radius
            }
        }
        


        if (props.type=="finished"){
            if (direction<0){
                x=vw(100)-177
                cx=vw(100)-177
            }
            else{
                x=vw(100)-20
                cx=vw(100)-20
            }
            
            ctx.fillStyle = "#33B807";
            ctx.fill()
        }
        if (props.type=="captured"){
            if (direction<0){
            x=vw(100)/3 + radius +5
            cx=vw(100)/3 + radius + 5
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
                cx -= pv.x;
                cy += pv.y;                     // move diameter of ball to left (in this case)
                drawn++;                              // increase balls on row count
                
                if (drawn === maxRowLen) { 
                    drawn = 0;
                                  
                    
                    if (maxRowLen<5){  
                        cx = x - v.x * rowLen; 
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
            ctx.lineWidth = 3;
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
    });
    return(
        <canvas
        ref={canvasRef}
        style={{position:'absolute'}}
        height='auto'
        width={vw(100)}        
        /> 
    );

}



export default Weight