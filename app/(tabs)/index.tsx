import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  Eye,
  EyeOff,
  RefreshCw 
} from 'lucide-react-native';

interface ProfileData {
  account_number: string;
  balance: number;
  equity: number;
  margin: number;
  pl: number;
  account_type: string;
  base_currency: string;
  leverage: string;
  server: string;
}

export default function AccountScreen() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const fetchProfileData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfileData();

    // Set up real-time updates every 3 seconds
    const interval = setInterval(fetchProfileData, 3000);

    return () => clearInterval(interval);
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfileData();
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  const formatBalance = (amount: number) => {
    return balanceVisible ? formatCurrency(amount) : '₹••••••';
  };

  const handleDeposit = () => {
    router.push('/(tabs)/deposit');
  };

  const handleWithdraw = () => {
    // TODO: Implement withdraw functionality
    // router.push('/withdraw');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <RefreshCw size={24} color="#007AFF" />
        <Text style={styles.loadingText}>Loading account data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account Overview</Text>
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setBalanceVisible(!balanceVisible)}
        >
          {balanceVisible ? (
            <Eye size={20} color="#666" />
          ) : (
            <EyeOff size={20} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      {/* Account Card */}
      <View style={styles.accountCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <Wallet size={24} color="#007AFF" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.accountNumber}>
              {profileData?.account_number || 'Loading...'}
            </Text>
            <Text style={styles.accountType}>
              {profileData?.account_type || 'Standard'} Account
            </Text>
          </View>
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            {profileData ? formatBalance(profileData.balance) : '₹0.00'}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.serverInfo}>
            {profileData?.server || 'FXTrader-Live01'} • {profileData?.leverage || '1:2000'}
          </Text>
        </View>
      </View>

      {/* Account Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Equity</Text>
          <Text style={styles.metricValue}>
            {profileData ? formatBalance(profileData.equity) : '₹0.00'}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Margin</Text>
          <Text style={styles.metricValue}>
            {profileData ? formatBalance(profileData.margin) : '₹0.00'}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>P&L</Text>
          <Text style={[
            styles.metricValue,
            profileData?.pl && profileData.pl > 0 ? styles.positiveValue : styles.negativeValue
          ]}>
            {profileData ? formatBalance(profileData.pl) : '₹0.00'}
          {profileData?.pl && (
            profileData.pl > 0 ? (
              <TrendingUp size={16} color="#34C759" style={styles.trendIcon} />
            ) : (
              <TrendingDown size={16} color="#FF3B30" style={styles.trendIcon} />
            )
          )}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.depositButton]}
          onPress={handleDeposit}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.withdrawButton]}
          onPress={handleWithdraw}
        >
          <Minus size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  visibilityButton: {
    padding: 8,
  },
  accountCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  accountNumber: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  accountType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 2,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  cardFooter: {
    alignItems: 'center',
  },
  serverInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  metricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  positiveValue: {
    color: '#34C759',
  },
  negativeValue: {
    color: '#FF3B30',
  },
  trendIcon: {
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  depositButton: {
    backgroundColor: '#34C759',
  },
  withdrawButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});