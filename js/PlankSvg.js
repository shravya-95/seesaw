import * as React from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default function PlankSvg(props) {
  return (
    <svg width="812" height="121" viewBox="0 0 812 121" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="plank" filter="url(#filter0_i)">
<rect x="-13" y="100.483154" width={vw(100)} height="7" rx="3.5" fill="#BABABA"/>
</g>
<g filter="url(#filter1_d)">
<circle cx={vw(50)} cy="105" r="10" fill="#CEC3BB"/>
</g>
<g filter="url(#filter2_d)">
<circle cx={vw(50)} cy="103" r="6" fill="#F8F8F8"/>
</g>
<defs>
<filter id="filter0_i" x="-14.3259" y="0.483154" width="842.194" height="119.844" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-3"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
</filter>
<filter id="filter1_d" x={vw(50)-10} y="100" width="21" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="1" dy="3"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x={vw(50)-6} y="100" width="13" height="15" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="1" dy="3"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>


  );
}
