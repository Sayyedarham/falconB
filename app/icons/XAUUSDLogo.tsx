import React from 'react';
import { Image } from 'react-native';

export default function XAUUSDLogo({ size = 24 }: { size?: number }) {
  return (
    <Image
      source={require('../../assets/images/xauusd.png')}
      style={{ width: size, height: size, resizeMode: 'contain' }}
    />
  );
}
