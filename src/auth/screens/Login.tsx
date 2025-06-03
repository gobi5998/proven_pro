// LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginEmail, validateLoginPassword, loginUser } from '../../store/slices/registerSlice';
import type { RootState, AppDispatch } from '../../components';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding1: undefined;
  ForgotPassword: undefined;
  // Add other routes here as you create them
};

const LoginScreen = () => {
  const [remember, setRemember] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  
  const validation = useSelector((state: RootState) => state.validation);
  const { email, password, emailError, passwordError, loading, error } = validation.login;

  const handleLogin = async () => {
    if (!emailError && !passwordError) {
      try {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        if (result) {
          navigation.navigate('Onboarding1');
        }
      } catch (err) {
        // Error is handled by the reducer
        console.error('Login failed:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/image/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={[styles.input, emailError && styles.inputError]}
        value={email}
        onChangeText={(text) => dispatch(validateLoginEmail(text))}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder='Password'
        secureTextEntry
        style={[styles.input, passwordError && styles.inputError]}
        value={password}
        onChangeText={(text) => dispatch(validateLoginPassword(text))}
        editable={!loading}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <View style={styles.row}>
        <CheckBox
          value={remember}
          onValueChange={setRemember}
          tintColors={{ true: '#1D4ED8', false: '#666' }}
          disabled={loading}
        />
        <Text style={styles.remember}>Remember for 30 days</Text>
        <TouchableOpacity 
          style={{ marginLeft: 'auto' }}
          onPress={() => navigation.navigate('ForgotPassword')}
          disabled={loading}
        >
          <Text style={styles.link}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[
          styles.loginButton, 
          (emailError || passwordError || loading) && styles.loginButtonDisabled
        ]} 
        onPress={handleLogin}
        disabled={!!emailError || !!passwordError || loading}
      >
        <Text style={styles.loginText}>
          {loading ? 'Logging in...' : 'Log in'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.googleButton}
        disabled={loading}
      >
        <Image
          source={require('../../../assets/image/google.png')}
          style={styles.googleImage}
        />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Not a member? </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')}
          disabled={loading}
        >
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems:'center',
    justifyContent:'center', 
    padding: 16,
  },
  logo: {
    width: 350,
    height: 70,
    marginBottom: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666'
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '500'
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  remember: {
    marginLeft: 8,
    color: '#333'
  },
  link: {
    color: '#4F46E5',
    fontWeight: '500'
  },
  loginButton: {
    backgroundColor: '#3C5979',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  googleButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2
  },
  googleText: {
    marginLeft: 8,
    fontWeight: '600',
    color:'#616161'
  },
  googleImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
}); 