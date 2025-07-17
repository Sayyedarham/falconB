
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface trade {
  id: string;
  assest_name: string;
  asset_id: string;
  quantity: number;
  amount: number;
  pl: number;
  is_open: boolean;
}

const renderItem = ({ item }: { item: trade }) => (
  <View style={[stylees.card,item.pl >= 0 ? stylees.greenCard : stylees.redCard]}>
    <View style={stylees.row}>
      <Text style={stylees.label}>Asset:</Text>
      <Text style={stylees.value}>{item.assest_name}</Text>
    </View>
    <View style={stylees.row}>
      <Text style={stylees.label}>Quantity:</Text>
      <Text style={stylees.value}>{item.quantity}</Text>
    </View>
    <View style={stylees.row}>
      <Text style={stylees.label}>P/L:</Text>
      <Text
        style={[stylees.value, item.pl >= 0 ? stylees.green : stylees.red]}>
        {item.pl}
      </Text>
    </View>
    <View style={stylees.row}>
      <Text style={stylees.label}>Amount:</Text>
      <Text style={stylees.value}>{item.amount}</Text>
    </View>
  </View>
);

export default function TradeScreen() {
  const { user } = useAuth();
  const [trade, setTrade] = useState<trade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'open' | 'close'>('open');
  const [error, setError] = useState<string | 'Error'>('');

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('trade')
        .select('*')
        .eq('user_id', user?.id);
      if (error) {
        setError('Could not fetch trades! Please check your network.');
      } else {
        setTrade(data || []);
      }
    } catch (error) {
      setError('Something went wrong...');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredTrades = trade.filter((item) =>
    activeTab === 'open' ? item.is_open : !item.is_open
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trading</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'open' && styles.activeTab]}
          onPress={() => setActiveTab('open')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'open' && styles.activeTabText,
            ]}>
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'close' && styles.activeTab]}
          onPress={() => setActiveTab('close')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'close' && styles.activeTabText,
            ]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, margin: 10 }}>
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>
        ) : filteredTrades.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No trades found
          </Text>
        ) : (
          <FlatList
            data={filteredTrades}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  tabText: {
    color: '#555',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
});

const stylees = StyleSheet.create({
  greenCard: {
    borderColor: 'green',
    // borderWidth: 2,
  },
  redCard: {
    borderColor: 'red',
    // borderWidth: 2,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontWeight: '400',
    color: '#222',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
});
