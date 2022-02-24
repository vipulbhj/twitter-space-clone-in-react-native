import React from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Avatar,
  Heading,
  ScrollView,
} from 'native-base';

import SpaceCard from '../components/SpaceCard';

export default function Home({ navigation }) {
  return (
    <Box flex="1" _light={{ bg: 'white' }} _dark={{ bg: 'darkBlue.900' }}>
      <VStack space="2" p="4">
        <Heading>Happening Now</Heading>
        <Text>Spaces going on right now</Text>
      </VStack>
      <ScrollView p="4">
        <VStack space="8">
          <SpaceCard
            onPress={() =>
              navigation.navigate('Space', {
                roomID: '',
              })
            }
          />
          <SpaceCard
            onPress={() =>
              navigation.navigate('Space', {
                roomID: '',
              })
            }
          />
          <SpaceCard
            onPress={() =>
              navigation.navigate('Space', {
                roomID: '',
              })
            }
          />
          <SpaceCard
            onPress={() =>
              navigation.navigate('Space', {
                roomID: '',
              })
            }
          />
        </VStack>
      </ScrollView>
    </Box>
  );
}

export function HomeHeader(props) {
  return (
    <HStack
      space="3"
      _dark={{ borderColor: 'coolGray.700' }}
      _light={{ borderColor: 'coolGray.200' }}
    >
      <Avatar
        size="xs"
        bg="green.500"
        alignSelf="center"
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg',
        }}
      >
        VB
      </Avatar>
      <Heading>Spaces</Heading>
    </HStack>
  );
}
