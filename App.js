import React, { useState, useEffect, useRef } from 'react';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HmsManager from '@100mslive/react-native-hms';

import { HMSProvider } from './components/HMSContext';

import HomeScreen, { HomeHeader } from './screens/HomeScreen';
import SpaceScreen from './screens/SpaceScreen';
import TestScreen from './screens/TestScreen';
import TestTwoScreen from './screens/TestScreen2';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  const hmsInstance = useRef(null);

  const [hmsInstanceLoaded, setHmsInstanceLoaded] = useState(false);

  useEffect(() => {
    HmsManager.build()
      .then((instance) => {
        hmsInstance.current = instance;
        setHmsInstanceLoaded(true);
      })
      .catch(console.error);
  }, []);

  if (!hmsInstanceLoaded) {
    return null;
  }

  return (
    <HMSProvider value={hmsInstance.current}>
      <NativeBaseProvider theme={theme}>
        {hmsInstanceLoaded ? (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Test">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: (props) => <HomeHeader {...props} /> }}
              />
              <Stack.Screen name="Space" component={SpaceScreen} />
              <Stack.Screen name="Test" component={TestScreen} />
              <Stack.Screen name="Test2" component={TestTwoScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <Text>Loading ...</Text>
        )}
      </NativeBaseProvider>
    </HMSProvider>
  );
}
