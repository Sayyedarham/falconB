import React from 'react';
import { Image } from 'react-native';

export default function XAGUSDLogo({ size = 24 }: { size?: number }) {
  return (
    <Image
      source={require('../../assets/images/xagusd.png')}
      style={{ width: size, height: size, resizeMode: 'contain' }}
    />
  );
}
