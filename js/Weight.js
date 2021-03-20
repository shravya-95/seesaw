import React, {useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const Weight = function(props){
    const canvasRef = useRef(null)
    const handleCanvas = function(ctx){
        // var ctx = canvas.getContext("2d"),
        var radius = 9,                         // ball radius
        deg = -60 / 180 * Math.PI,          // direction of row start -60°
        balls = 15,                         // number of balls to draw
        drawn = 0,                          // count balls drawn on current row
        rowLen = 1,                         // max length of current row (first=1)
        x = 150,                            // start point
        y = 140,
        cx = 150, cy =140,                  // replicates start point + offsets
        v = {                               // vector
            x: radius * 2 * Math.cos(deg),
            y: radius * 2 * Math.sin(deg)
        },
        i;
        ctx.fillStyle = "#D70000";
        ctx.fill();
    
    
        
        for(i = 0; i <  balls; i++) {
        drawBall(cx, cy);                     // draw ball
        cx -= radius * 2;                     // move diameter of ball to left (in this case)
        drawn++;                              // increase balls on row count
        if (drawn === rowLen) {               // reached max balls for row?
            cx = x + v.x * rowLen;              // increase one row
            cy = y + v.y * rowLen;
            drawn = 0;                          // reset ball count for row
            rowLen++;                           // increase row limit
        }
        }
    
    
    
        function drawBall(x, y) {
        ctx.moveTo(x + radius, y); ctx.arc(x, y, radius, 0, 6.28);
        ctx.closePath();
        }
    }
    return(
        <canvas
        ref={canvasRef}
        height={400}
        
        onClick={e => {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          handleCanvas(ctx)
        }}
      />
    )

}



export default Weight