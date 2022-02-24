import React from 'react';
import { VStack, Button, Input } from 'native-base';

export default function TestTwo({ navigation, route }) {
  return (
    <VStack>
      <Input
        mx="3"
        w="75%"
        color="black"
        maxWidth="300px"
        placeholder="Input"
      />
      <Button onPress={() => navigation.navigate('Test')}>
        Go to Test Screen
      </Button>
    </VStack>
  );
}
