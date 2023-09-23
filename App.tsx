import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from '@navigation/index';
import {Colors} from '@theme/values/colors';

function App(): JSX.Element {
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Colors.transparent}
      />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
}

export default App;
