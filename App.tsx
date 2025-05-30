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


import LoginScreen from './src/auth/screens/Login';
import RegisterScreen from './src/auth/screens/Register';
import MyStatusBar from './src/components/Mystatusbar';
import Onboarding1Screen from './src/OnboardingScreen/Main/Onboarding1';
import Onboarding2Screen from './src/OnboardingScreen/Main/Onboarding2';
import PortfolioScreen from './src/OnboardingScreen/Main/Portfolio';


type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Portfolio: undefined;
  // Add other routes here as you create them
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <MyStatusBar backgroundColor='white'/>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding1" component={Onboarding1Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding2" component={Onboarding2Screen} options ={{headerShown:false}}/>
        <Stack.Screen name="Portfolio" component={PortfolioScreen} options ={{headerShown:false}}/>

      </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
