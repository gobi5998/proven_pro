// RegisterScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
// Assuming you might need icons, keeping the import from Login.tsx
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation and NavigationProp
import { useDispatch, useSelector } from 'react-redux';
import { 
  validateRegisterEmail, 
  validateRegisterPassword, 
  validateRegisterUsername,
  registerUser,
  verifyOTP,
  resendOTP
} from '../../store/slices/registerSlice';
import type { RootState, AppDispatch } from '../../components';

// Define the type for the navigation parameters
type RootStackParamList = {
  Login: undefined; // Define the Login route
  Register: undefined; // Define the Register route
  Onboarding1: undefined; // Add the Onboarding1 route
  // Add other routes here as you create them
};

const RegisterScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { 
    username,
    email, 
    password,
    emailError, 
    passwordError,
    usernameError,
    loading,
    error,
    otpSent,
    otpVerified
  } = useSelector((state: RootState) => state.validation.register);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setResendTimer(60); // 60 seconds cooldown
      await dispatch(resendOTP(email)).unwrap();
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  const handleRegister = async () => {
    if (!usernameError &&!emailError && !passwordError ) {
      try {
        if (!otpSent) {
          const result = await dispatch(registerUser({ email, password, username })).unwrap();
          console.log('Registration successful:', result);
        } else if (!otpVerified) {
          const result = await dispatch(verifyOTP({ email, otp })).unwrap();
          console.log('OTP verification successful:', result);
          navigation.navigate('Login');
        }
      } catch (err: any) {
        console.error('Registration process failed:', err);
        // Check for network errors
        if (!err.response) {
          // Network error (no response from server)
          Alert.alert(
            'Network Error',
            'Please check your internet connection and try again.',
            [
              {
                text: 'Try Again',
                onPress: () => handleRegister()
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* You can add your logo here if needed */}
      {/* <Image source={require('../../../assets/image/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your free account</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {!otpSent && (
            <Text style={styles.errorSubtext}>
              {error.includes('Network Error') 
                ? 'Please check your internet connection and try again.'
                : 'Please check your details and try again.'}
            </Text>
          )}
          {!otpSent && (
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRegister}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {!otpSent ? (
        <>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter your username"
            style={[styles.input, usernameError && styles.inputError]}
            value={username}
            onChangeText={(text) => dispatch(validateRegisterUsername(text))}
            editable={!loading}
          />
          {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={[styles.input, emailError && styles.inputError]}
            value={email}
            onChangeText={(text) => dispatch(validateRegisterEmail(text))}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={hidePassword}
            style={[styles.input, passwordError && styles.inputError]}
            value={password}
            onChangeText={(text) => dispatch(validateRegisterPassword(text))}
            editable={!loading}
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        </>
      ) : !otpVerified ? (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <Text style={styles.subtitle}>Please enter the OTP sent to your email</Text>
          <TextInput
            placeholder="Enter the OTP"
            style={[styles.input]}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            editable={!loading}
          />
          <TouchableOpacity 
            style={[styles.resendButton, resendDisabled && styles.resendButtonDisabled]}
            onPress={handleResendOTP}
            disabled={resendDisabled || loading}
          >
            <Text style={styles.resendText}>
              {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      <TouchableOpacity 
        style={[
          styles.registerButton, 
          (emailError || passwordError || usernameError || loading) && styles.registerButtonDisabled
        ]} 
        onPress={handleRegister}
        disabled={!!emailError || !!passwordError || !!usernameError || loading}
      >
        <Text style={styles.registerText}>
          {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Register & Send OTP'}
        </Text>
      </TouchableOpacity>

      {!otpSent && (
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
      )}

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center'
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 24,
    alignSelf: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom:10,
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
  registerButton: {
    backgroundColor: '#3C5979',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  registerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  link: {
    color: '#5B5BD0',
    fontWeight: '500'
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  requirementsContainer: {
    marginTop: -10, // Adjust margin to position below password input
    marginBottom: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementText: {
    fontSize: 12,
    color: '#666', // Default color for requirements
  },
  validRequirement: {
    color: '#3C5979', // Color for valid requirements
  },
  // You can add specific styles for Google button if you include it
  googleButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1
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
  inputError: {
    borderColor: '#FF3B30',
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
  errorSubtext: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  resendButton: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: '#3C5979',
    fontSize: 14,
  },
  retryButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    alignItems: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 