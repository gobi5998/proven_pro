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
import OnboardingForm from '../../OnboardingScreen/Main/Onboarding1';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding1: undefined;
  // Add other routes here as you create them
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    
    <View style={styles.container}>
     <View style={styles.logoContainer} >
     <Image source={require('../../../assets/image/logo.png')} style={styles.logo} />
     </View>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
         placeholder='Password'
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <CheckBox
          value={remember}
          onValueChange={setRemember}
          tintColors={{ true: '#1D4ED8', false: '#666' }}
        />
        <Text style={styles.remember}>Remember for 30 days</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Text style={styles.link}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.loginButton}> */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Onboarding1')}>
        <Text style={styles.loginText}>Log in</Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
      <Image
        source={require('../../../assets/image/google.png')} // Replace with your actual path
        style={styles.googleImage}/>
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Not a member? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
  }
}); 