// RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
// Assuming you might need icons, keeping the import from Login.tsx
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation and NavigationProp

// Define the type for the navigation parameters
type RootStackParamList = {
  Login: undefined; // Define the Login route
  Register: undefined; // Define the Register route
  Onboarding1: undefined; // Add the Onboarding1 route
  // Add other routes here as you create them
};

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  // Password validation states
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Get navigation object with type safety

  // Password validation logic
  const validatePassword = (text: string) => {
    // Check length
    setIsLengthValid(text.length >= 8);

    // Check for special character (you can define your own regex)
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    setHasSpecialChar(specialCharRegex.test(text));

    // Check if passwords match
    setPasswordsMatch(text === confirmPassword && confirmPassword.length > 0);
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    // Check if passwords match
    setPasswordsMatch(password === text && text.length > 0);
  };

  // You would add your registration logic here
  const handleRegister = () => {
    console.log('Register button pressed');
    // Implement registration API call or logic
    // You might want to add a check here to ensure all validations pass before proceeding
    if (isLengthValid && hasSpecialChar && passwordsMatch) {
      console.log('Password meets requirements.');
      // Proceed with registration
    } else {
      console.log('Password does not meet requirements.');
      // Show an alert or error message to the user
    }
  };

  return (
    <View style={styles.container}>
      {/* You can add your logo here if needed */}
      {/* <Image source={require('../../../assets/image/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your free account</Text>

      {/* <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      /> */}

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry={hidePassword}
        style={styles.input}
        value={password}
        onChangeText={(text) => { setPassword(text); validatePassword(text); }}
      />

      {/* Password validation requirements */}
      <View style={styles.requirementsContainer}>
        <View style={styles.requirementItem}>
          <Text style={[styles.requirementText, isLengthValid && styles.validRequirement]}>
            {isLengthValid ? '✓' : '•'} Must be at least 8 characters
          </Text>
        </View>
        <View style={styles.requirementItem}>
          <Text style={[styles.requirementText, hasSpecialChar && styles.validRequirement]}>
            {hasSpecialChar ? '✓' : '•'} Must contain one special character
          </Text>
        </View>
        {confirmPassword.length > 0 && (
          <View style={styles.requirementItem}>
            <Text style={[styles.requirementText, passwordsMatch && styles.validRequirement]}>
              {passwordsMatch ? '✓' : '•'} Passwords must match
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={hideConfirmPassword}
        style={styles.input}
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
      />

      {/* Add a checkbox for terms if needed */}
      {/* <View style={styles.row}>
        <CheckBox value={agree} onValueChange={setAgree} />
        <Text style={styles.remember}>I agree to the terms and conditions</Text>
      </View> */}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Sign Up</Text>
      </TouchableOpacity>

      {/* You can add a Google sign-up button if needed */}
      <TouchableOpacity style={styles.googleButton}>
      <Image
        source={require('../../../assets/image/google.png')} // Replace with your actual path
        style={styles.googleImage}/>
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}> {/* Add onPress to navigate to Login */}
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
  }
}); 