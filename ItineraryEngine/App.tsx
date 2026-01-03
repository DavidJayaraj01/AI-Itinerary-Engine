/**
 * GlobeTrotter - AI Itinerary Engine
 * Travel Planning Application
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {COLORS} from './src/constants/theme';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <RootNavigator />
    </>
  );
}

export default App;
