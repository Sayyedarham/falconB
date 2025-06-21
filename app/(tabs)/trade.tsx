import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function TradeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trading</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Clock size={32} color="#FF9500" />
        </View>
        <Text style={styles.statusTitle}>Market Closed</Text>
        <Text style={styles.statusMessage}>
          Trading is currently unavailable. Markets will reopen during trading hours.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <AlertCircle size={20} color="#007AFF" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Trading features are currently unavailable.
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
  statusCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
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
  infoCard: {
    backgroundColor: '#F0F8FF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6F3FF',
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