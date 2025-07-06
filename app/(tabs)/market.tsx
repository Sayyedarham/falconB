import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
// import CountryFlag from "react-native-country-flag";
// // import flags from "react-native-country-flag/data";
// import XAU from '../icons/XAU';
// import BTC from '../icons/BTCUSD';
// import USOIL from '../icons/USOIL';
import AssetIcon from '../icons/AssetIcon';

export interface Asset{
  asset_name:string,
  asset_price:number,
  change_percent:number,
  price_change:number,
  trend:string
}

/*
  to dos:
    1) when clicked on any asset view a half screen to buy the asset which essentially places an order
    2) and add dummy chart to half screen
*/

export default function MarketScreen() {
  const currencyIcon = {
    "XAUUSD":"XAU",
    "BTCUSD":"BTC",
    "USOIL":"USOIL"
  }
  const [currencyPairs,setCurrencyPairs] = useState<Asset[]>([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string>("");
  const getPrices = async ()=>{
    setLoading(true);
    const {data,error} = await supabase
      .from("asset")
      .select("*");
    
    if(error){
      setError(`Error: ${error}`);
    }else{
      setCurrencyPairs(data);
    }
    setLoading(false);
  }
  useEffect(()=>{
    getPrices();

    const interval = setInterval(getPrices, 15000);

    return () => clearInterval(interval);
  },[])
if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>Loading...</Text>
    </View>
  );
}
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
      </View>
      {
        error &&  
        <View style={styles.Errorheader}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      }

      {/* <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Clock size={32} color="#FF9500" />
        </View>
        <Text style={styles.statusTitle}>Market Closed</Text>
        <Text style={styles.statusMessage}>
          Showing last available prices. Live trading is currently unavailable.
        </Text>
      </View> */}

      <View style={styles.pairsContainer}>
        <Text style={styles.sectionTitle}>Currency Pairs</Text>
        
        {currencyPairs.map((item, index) => (
          <View key={index} style={styles.pairCard}>
             <View style={styles.leftSection}>
             <View style={styles.flagsRow}>
              <AssetIcon assetName={item.asset_name} iso1={item?.isoCode1 || "null"} iso2={item?.isoCode2 || "null"} />
          </View>
          <Text style={styles.pairName}>{item.asset_name}</Text>
      </View>
            <View style={styles.pairInfo}>
              <Text style={styles.pairName}>{item.asset_name}</Text>
              <Text style={styles.pairPrice}>{item.asset_price}</Text>
            </View>
            
            <View style={styles.changeInfo}>
              <View style={styles.changeRow}>
                {item.trend === 'UP' ? (
                  <TrendingUp size={16} color="#34C759" />
                ) : (
                  <TrendingDown size={16} color="#FF3B30" />
                )}
                <Text style={[
                  styles.changeValue,
                  item.trend === 'UP' ? styles.positiveChange : styles.negativeChange
                ]}>
                  {item.price_change}
                </Text>
              </View>
              <Text style={[
                styles.changePercent,
                item.trend === 'UP' ? styles.positiveChange : styles.negativeChange
              ]}>
                {item.change_percent}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* <View style={styles.infoCard}>
        <AlertCircle size={20} color="#007AFF" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Real-time market data and advanced charting will be available in the next phase.
        </Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  Errorheader: {
    backgroundColor: '#ffe6e6', // Light red background
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#ff4d4d', // Red border
    borderWidth: 1,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b30000', // Dark red text
    marginBottom: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#800000', // Slightly muted red
  },
  betaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF9500',
    marginTop: 4,
  },
  statusCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  statusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  statusMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  pairsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  pairCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pairInfo: {
    flex: 1,
  },
  pairName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  pairPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  changeInfo: {
    alignItems: 'flex-end',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  changeValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  changePercent: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  positiveChange: {
    color: '#34C759',
  },
  negativeChange: {
    color: '#FF3B30',
  },
  infoCard: {
    backgroundColor: '#F0F8FF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6F3FF',
    marginBottom: 40,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#007AFF',
    lineHeight: 18,
  },
  leftSection: {
  flex: 1,
  justifyContent: 'center',
},
flagsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 4,
},
flag: {
  marginRight: 4,
  borderRadius: 3,
  overflow: 'hidden',
},
middleSection: {
  flex: 1,
  alignItems: 'center',
},
rightSection: {
  flex: 1,
  alignItems: 'flex-end',
},
trendRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
});