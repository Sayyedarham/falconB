import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, Mail, Lock, User,BookUser  } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [userNameFlag,setUserNameFlag] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [userName,setUserName] = useState<string>('');

  const { signUp } = useAuth();
    const isUsernameAvailable = async (username:string)=> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single()  // gets only one match, good for usernames

    if (error && error.code === 'PGRST116') {
      // No match found (PGRST116 = No rows returned)
      return true
    }

    if (error) {
      console.error('Supabase error:', error)
      return false
    }

    // A match was found
    return false
  }
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !phoneNumber || !userName) {
      setError('Please fill in all fields');
      return;
    }
    if(!(await isUsernameAvailable(userName))){
      setUserNameFlag(true);
      return;
    }
    if(!email.includes('@')){
      setError('Please enter valid mail address');
      return;
      
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await signUp(email, password,phoneNumber,userName);

    if (error) {
      setError(error.message);
    } else {
      router.replace('/(tabs)');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <TrendingUp size={40} color="#007AFF" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join TheFalconUniversity and start trading today</Text>
        </View>

        <View style={styles.form}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <BookUser size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={15}
              style={styles.input}
            />

          </View>
          <View style={styles.inputContainer}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Choose Username"
              style={styles.input}
            />

          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
          {userNameFlag && 
          <View>
            <Text style={styles.usernameFlag}>
              Usesname not available! choose another username and try again
            </Text>
          </View>
          }
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            {/* <Link href="/(auth)" asChild> */}
              <TouchableOpacity onPress={()=>router.push("/(auth)")}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            {/* </Link> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  usernameFlag: {
    textAlign:'center',
    color: '#FF3B30',
    backgroundColor: '#fff',
    fontSize:12,
    marginVertical:5
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE6E6',
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
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#007AFF',
  },
});

