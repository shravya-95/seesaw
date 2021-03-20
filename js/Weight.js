import React, {useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const Weight = function(props){
    const canvasRef = useRef(null);
    useEffect(() =>{
        var ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0,0,vw(100),vh(100));
        ctx.save();
        var radius = 9,
        direction = props.direction - 25,                         // ball radius
        deg = -60 / 180 * Math.PI,          // direction of row start -60°
        plankDeg = - direction / 180 * Math.PI,
        balls = 15,                         // number of balls to draw
        drawn = 0,                          // count balls drawn on current row
        rowLen = 1,                         // max length of current row (first=1)
        x = 9,                            // start point
        y = 131,                            //
        cx = 9, cy =131,                  // replicates start point + offsets
        v = {                               // vector
            x: radius * 2 * Math.cos(deg),
            y: radius * 2 * Math.sin(deg)
        },
        pv = {
            //vector for the plank
            x:radius * 2 * Math.cos(plankDeg),
            y: radius * 2 * Math.sin(plankDeg)
        },
        i;
        
    
    
        for(i = 0; i <  balls; i++) {
            
            drawBall(cx, cy);                     // draw ball
            // cx -= radius * 2;
            cx += pv.x;
            cy += pv.y;                     // move diameter of ball to left (in this case)
            drawn++;                              // increase balls on row count
            if (drawn === rowLen) {               // reached max balls for row?
                cx = x + v.x * rowLen;              // increase one row
                cy = y + v.y * rowLen;
                drawn = 0;                          // reset ball count for row
                rowLen++;                           // increase row limit
            }
        }
        ctx.fillStyle = "#E1370E";
        // ctx.fill();
        
    
    
    
        function drawBall(x, y) {
            ctx.lineWidth = 3;
            ctx.moveTo(x + radius, y); 
            ctx.arc(x, y, radius, 0, 6.28);
            ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255, 0, 0,0.5)';
        }
    });
    return(
        <canvas
        ref={canvasRef}
        style={{position:'absolute'}}
        top={0}
        height={vh(100)}
        width={vw(100)}
        /> 
    );

}



export default Weight