import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { X, IndianRupee } from 'lucide-react-native';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    const depositAmount = parseFloat(amount);
    
    if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (depositAmount < 100) {
      Alert.alert('Minimum Deposit', 'Minimum deposit amount is ₹100');
      return;
    }

    // Navigate to QR payment screen with the amount
    router.push({
      pathname: '/qr-payment',
      params: { amount: depositAmount.toString() }
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deposit Funds</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.amountSection}>
          <Text style={styles.label}>Enter Amount</Text>
          <View style={styles.inputContainer}>
            <IndianRupee size={20} color="#666" style={styles.currencyIcon} />
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#999"
              autoFocus
            />
          </View>
          <Text style={styles.minAmountText}>Minimum deposit: ₹100</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Deposit Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Processing Time:</Text>
            <Text style={styles.infoValue}>Instant</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Transaction Fee:</Text>
            <Text style={styles.infoValue}>Free</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Payment Method:</Text>
            <Text style={styles.infoValue}>UPI/QR Code</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !amount && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!amount || loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Processing...' : 'Continue to Payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  amountSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E5E7',
    marginBottom: 8,
  },
  currencyIcon: {
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: 56,
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  minAmountText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});