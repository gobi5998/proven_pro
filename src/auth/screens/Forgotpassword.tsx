import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginEmail } from '../../store/slices/registerSlice';
import type { RootState } from '../../components';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  OtpScreen: undefined;
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const validation = useSelector((state: RootState) => state.validation);
  const { email, emailError } = validation.login;

  const handleResetPassword = () => {
    if (!emailError) {
      // Here you would typically make an API call to send reset password email
      console.log('Reset password email sent to:', email);
      // Navigate to OTP screen
      navigation.navigate('OtpScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/image/logo.png')} style={styles.logo} />
      </View>
      
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address to reset your password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={[styles.input, emailError && styles.inputError]}
        value={email}
        onChangeText={(text) => dispatch(validateLoginEmail(text))}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TouchableOpacity 
        style={[styles.resetButton, emailError && styles.resetButtonDisabled]} 
        onPress={handleResetPassword}
        disabled={!!emailError}
      >
        <Text style={styles.resetText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: '#3C5979',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  backButton: {
    paddingVertical: 14,
    alignItems: 'center'
  },
  backText: {
    color: '#3C5979',
    fontWeight: '500',
    fontSize: 16
  }
});
