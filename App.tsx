/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/components';
import { loginStart, loginSuccess, loginFailure } from './src/store/slices/loginSlice';

import LoginScreen from './src/auth/screens/Login';
import RegisterScreen from './src/auth/screens/Register';
import MyStatusBar from './src/components/Mystatusbar';
import Onboarding1Screen from './src/OnboardingScreen/Main/Onboarding1';
import Onboarding2Screen from './src/OnboardingScreen/Main/Onboarding2';
import PortfolioScreen from './src/OnboardingScreen/Main/Portfolio';
import ForgotPasswordScreen from './src/auth/screens/Forgotpassword';
import OtpScreen from './src/auth/screens/OtpScreen';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Portfolio: undefined;
  ForgotPassword: undefined;
  OtpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppContent(): React.JSX.Element {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <MyStatusBar backgroundColor='white'/>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding1" component={Onboarding1Screen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding2" component={Onboarding2Screen} options={{headerShown:false}}/>
          <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
