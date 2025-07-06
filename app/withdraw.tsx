import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { X, CircleCheck as CheckCircle, IndianRupee } from 'lucide-react-native';


export default function Withdraw() {
  const [amount,setAmount] = useState('');
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [accountNumber,setAccountNumber] = useState<string>("");
  const [accountName,setAccountName] = useState<string>("");
  const [IFSCcode,setIFSCcode] = useState<string>("");

  const handlePaymentMade = async () => {
  if (!user || !amount || !IFSCcode || !accountNumber || !accountName) return;

  setProcessing(true);

  try {
    const depositAmount = parseFloat(amount);
    const { error: ticketError } = await supabase
    .from('tickets') 
    .insert([
      {
        amount: depositAmount,
        type: 'Withdraw',
        ticket_status: 'pending',
        account_name:accountName,
        account_number:accountNumber,
        ifsc_code:IFSCcode,
        is_upi:false
      }
    ]);
    console.log(depositAmount);

    if (ticketError) throw ticketError;

    Alert.alert(
      'Request Sent!',
      `₹${depositAmount.toLocaleString('en-IN')} withdraw request has been submitted. It will be deducted from your balance after verification.`,
      [
        {
          text: 'OK',
          onPress: () => {
            router.dismissAll();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  } catch (error) {
    console.error('Ticket creation error:', error);
    Alert.alert(
      'Error',
      'There was a problem submitting your request. Please try again.',
      [{ text: 'OK' }]
    );
  } finally {
    setProcessing(false);
  }
};

  const handleUPIpayment = ()=>{
    router.push({
          pathname: '/upi'
    });
  }
  const handleClose = () => {
    router.push({
      pathname:'/(tabs)'
    });
  };
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Withdraw</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to Withdraw</Text>
          <View style={styles.amountRow}>
            <IndianRupee size={24} color="#007AFF" />
            <TextInput
            style={styles.input}
            placeholder="Withdraw Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
          />
          </View>
        </View>
        <View style={styles.accountCont}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber  }
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="IFSC Code"
              value={IFSCcode}
              onChangeText={setIFSCcode}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Account Holder's Name"
              value={accountName}
              onChangeText={setAccountName}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.navigateBtn, processing && styles.paymentButtonDisabled]}
          onPress={handleUPIpayment}
        >
          <Text style={styles.paymentButtonText}>
            Use UPI instead
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, processing && styles.paymentButtonDisabled]}
          onPress={handlePaymentMade}
          disabled={processing}
        >
          <CheckCircle size={20} color="#fff" />
          <Text style={styles.paymentButtonText}>
            {processing ? 'Processing...' : 'Withdraw'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  navigateBtn:{
    backgroundColor: '#212121',
    marginVertical:10,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  accountCont:{
    borderColor:'#E5E5E7',
    marginVertical:20, 
    borderWidth:1,
    borderRadius:10,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    margin:5,
    fontFamily: 'Inter-Regular',
    color: '#1a1a1a',
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
  amountCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#007AFF',
    marginLeft: 4,
  },
  qrSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  qrSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  qrImage: {
    width: 180,
    height: 180,
  },
  instructionsCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E6F3FF',
  },
  instructionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#007AFF',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    marginBottom: 4,
    lineHeight: 16,
  },
  paymentButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  paymentButtonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  }
});
