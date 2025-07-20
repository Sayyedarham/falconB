// components/AssetIcon.tsx

import React from 'react';
import { View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import XAUUSDLogo from '../icons/XAUUSDLogo';
import XAGUSDLogo from '../icons/XAGUSDLogo';
import BTC from '../icons/BTCUSD';
import USOIL from '../icons/USOIL';

export default function AssetIcon({ assetName, iso1 = 'us', iso2 = 'us' }: { assetName: string, iso1?: string, iso2?: string }) {
  if (assetName === 'XAU/USD') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <XAUUSDLogo size={24} />
        <CountryFlag isoCode="us" size={20} style={{ marginLeft: 4, borderRadius: 3 }} />
      </View>
    );
  }
  if (assetName === 'BTCUSD') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BTC size={24} />
        <CountryFlag isoCode="us" size={20} style={{ marginLeft: 4, borderRadius: 3 }} />
      </View>
    );
  }
  if (assetName === 'USOIL') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <USOIL size={24} />
        <CountryFlag isoCode="us" size={20} style={{ marginLeft: 4, borderRadius: 3 }} />
      </View>
    );
  }
  if (assetName === 'XAGUSD') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <XAGUSDLogo size={24} />
        <CountryFlag isoCode="us" size={20} style={{ marginLeft: 4, borderRadius: 3 }} />
      </View>
    );
  }
  // Default: show two flags
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <CountryFlag isoCode={iso1} size={20} style={{ marginRight: 4, borderRadius: 3 }} />
      <CountryFlag isoCode={iso2} size={20} style={{ borderRadius: 3 }} />
    </View>
  );
}
