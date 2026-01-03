/**
 * GlobeTrotter - AI Itinerary Engine
 * Travel Planning Application
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import {COLORS} from './src/constants/theme';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
      <RootNavigator />
    </>
  );
}

export default App;
