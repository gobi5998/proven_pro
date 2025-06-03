// /screens/OTPVerificationScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { authService } from '../../api/authService';

export default function OTPVerificationScreen({ route }: any) {
  const [otp, setOtp] = useState('');
  const { email } = route.params;

  const handleVerify = async () => {
    try {
      await authService.verifyOTP(email, otp);
      Alert.alert('OTP Verified!');
    } catch (error: any) {
      Alert.alert('Invalid OTP', error.response?.data?.message || 'Try again.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter OTP" onChangeText={setOtp} />
      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}
