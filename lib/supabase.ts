import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Temporary hardcoded values for testing
const supabaseURL = 'https://octrmpemwlrctlchbalj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHJtcGVtd2xyY3RsY2hiYWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTU5NzgsImV4cCI6MjA2NjA3MTk3OH0.79P9rZiI58GRF2p7_WtHFxhgDshQBECCcVriEdGiGmU';

console.log('Supabase URL:', supabaseURL);
console.log('Supabase Key:', supabaseKey);
// Use AsyncStorage only on native platforms
const storage = Platform.OS === 'web' ? undefined : {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseURL, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const createTicket = async (amount:number,type:string) =>{
  const {data, error}  = await supabase
    .from("Tickets")
    .insert([
      amount,
      type,
    ])
  if(error) return error
  else return data
}