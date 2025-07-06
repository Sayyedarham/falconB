import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function USOIL({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="3.349"
          y1="3.122"
          x2="21.904"
          y2="24.434"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#1A1E21" />
          <Stop offset="1" stopColor="#06060A" />
        </LinearGradient>
      </Defs>

      <Path fill="url(#paint0_linear)" d="M0 0h18v18H0z" />
      <Path
        d="M12.5 10c0 2.2-1.575 4-3.5 4s-3.5-1.8-3.5-4S9 3 9 3s3.5 4.8 3.5 7z"
        fill="#fff"
      />
    </Svg>
  );
}
