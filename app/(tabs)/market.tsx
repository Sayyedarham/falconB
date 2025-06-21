import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

const currencyPairs = [
  { pair: 'EUR/USD', price: '1.0892', change: '+0.0012', changePercent: '+0.11%', trend: 'up' },
  { pair: 'GBP/USD', price: '1.2734', change: '-0.0023', changePercent: '-0.18%', trend: 'down' },
  { pair: 'USD/JPY', price: '149.85', change: '+0.45', changePercent: '+0.30%', trend: 'up' },
  { pair: 'AUD/USD', price: '0.6598', change: '-0.0015', changePercent: '-0.23%', trend: 'down' },
  { pair: 'USD/CAD', price: '1.3542', change: '+0.0008', changePercent: '+0.06%', trend: 'up' },
  { pair: 'USD/CHF', price: '0.8876', change: '-0.0012', changePercent: '-0.14%', trend: 'down' },
];

export default function MarketScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
        <Text style={styles.betaText}>Beta Version</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Clock size={32} color="#FF9500" />
        </View>
        <Text style={styles.statusTitle}>Market Closed</Text>
        <Text style={styles.statusMessage}>
          Showing last available prices. Live trading is currently unavailable.
        </Text>
      </View>

      <View style={styles.pairsContainer}>
        <Text style={styles.sectionTitle}>Currency Pairs</Text>
        
        {currencyPairs.map((item, index) => (
          <View key={index} style={styles.pairCard}>
            <View style={styles.pairInfo}>
              <Text style={styles.pairName}>{item.pair}</Text>
              <Text style={styles.pairPrice}>{item.price}</Text>
            </View>
            
            <View style={styles.changeInfo}>
              <View style={styles.changeRow}>
                {item.trend === 'up' ? (
                  <TrendingUp size={16} color="#34C759" />
                ) : (
                  <TrendingDown size={16} color="#FF3B30" />
                )}
                <Text style={[
                  styles.changeValue,
                  item.trend === 'up' ? styles.positiveChange : styles.negativeChange
                ]}>
                  {item.change}
                </Text>
              </View>
              <Text style={[
                styles.changePercent,
                item.trend === 'up' ? styles.positiveChange : styles.negativeChange
              ]}>
                {item.changePercent}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.infoCard}>
        <AlertCircle size={20} color="#007AFF" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Real-time market data and advanced charting will be available in the next phase.
        </Text>
      </View>
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
});