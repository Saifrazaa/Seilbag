import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import BluetoothCircleIcon from '@assets/media/bluetooth-circle.svg';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <>
        <Text>Hello World</Text>
      </>
    </NavigationContainer>
  );
}

export default App;
