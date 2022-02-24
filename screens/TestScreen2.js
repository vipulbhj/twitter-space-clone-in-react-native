import React from 'react';
import { VStack, Button, Input, Select, CheckIcon } from 'native-base';

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
      <Select
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => console.log(itemValue)}
      >
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
      <Button onPress={() => navigation.navigate('Test')}>
        Go to Test Screen
      </Button>
    </VStack>
  );
}
