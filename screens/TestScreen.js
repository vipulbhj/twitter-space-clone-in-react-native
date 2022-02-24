import React from 'react';
import { VStack, Button, Input } from 'native-base';

export default function Test({ navigation, route }) {
  return (
    <VStack>
      <Input
        mx="3"
        w="75%"
        color="black"
        maxWidth="300px"
        placeholder="Input"
      />
      <Button onPress={() => navigation.navigate('Test2')}>
        Go to Test2 Screen
      </Button>
    </VStack>
  );
}
