/**
 * GlobeTrotter - AI Itinerary Engine
 * Travel Planning Application
 *
 * @format
 */

import React, { useEffect } from 'react';
import {StatusBar} from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import {COLORS} from './src/constants/theme';
import {AuthProvider} from './src/contexts/AuthContext';
import axios from 'axios';
import { Platform } from 'react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    // Test API connection on app load
    const testApiConnection = async () => {
      try {
        const apiUrl = Platform.OS === 'web' 
          ? 'http://localhost:3000/api' 
          : Platform.OS === 'android'
          ? 'http://10.0.2.2:3000/api'
          : 'http://localhost:3000/api';
        
        console.log('🔍 Testing API connection to:', apiUrl);
        const response = await axios.get(`${apiUrl}/health`);
        console.log('✅ Backend API is connected!', response.data);
      } catch (error: any) {
        console.error('❌ Backend API connection failed:', error.message);
        console.error('Make sure backend is running on http://localhost:3000');
      }
    };
    
    testApiConnection();
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
