// components/AssetIcon.tsx
import React from 'react';
import CountryFlag from 'react-native-country-flag';
import XAU from '../icons/XAU';
import BTC from '../icons/BTCUSD';
import USOIL from '../icons/USOIL';

export default function AssetIcon({ assetName, iso1 = 'us', iso2 = 'us' }: { assetName: string, iso1?: string, iso2?: string }) {
  if (assetName === 'XAU/USD') return <XAU size={24} />;
  if (assetName === 'BTCUSD') return <BTC size={24} />;
  if (assetName === 'USOIL') return <USOIL size={24} />;
  if (assetName === 'XAGUSD') return <CountryFlag isoCode={iso1} size={20} style={{ marginRight: 4, borderRadius: 3 }} />;

  return (
    <>
      <CountryFlag isoCode={iso1} size={20} style={{ marginRight: 4, borderRadius: 3 }} />
      <CountryFlag isoCode={iso2} size={20} style={{ borderRadius: 3 }} />
    </>
  );
}
