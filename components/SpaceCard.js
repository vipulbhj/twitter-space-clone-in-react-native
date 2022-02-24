import React from 'react';
import { Box, Text, HStack, Avatar, Pressable } from 'native-base';

export default function (props) {
  return (
    <Pressable
      w="full"
      bg="fuchsia.800"
      overflow="hidden"
      borderRadius="16"
      onPress={props.onPress}
    >
      <Text px="4" my="4" fontSize="md" color="white">
        Live
      </Text>
      <Text w="80%" pl="4" mb="4" fontSize="xl" color="white">
        Building a Twitter Space Clone in React Native using NativeBase and
        100ms
      </Text>
      <HStack p="4" bg="fuchsia.900" space="4">
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Avatar
            size="sm"
            alignSelf="center"
            bg="green.200"
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg',
            }}
          >
            VB
          </Avatar>
          <Box ml="4">
            <Text fontSize="sm" color="white">
              Vipul Bhardwaj
            </Text>
            <Text fontSize="sm" color="white">
              SSE @GeekyAnts
            </Text>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Avatar
            size="sm"
            alignSelf="center"
            bg="green.200"
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg',
            }}
          >
            HO
          </Avatar>
          <Box ml="4">
            <Text fontSize="sm" color="white">
              Host
            </Text>
            <Text fontSize="sm" color="white">
              SE @100ms
            </Text>
          </Box>
        </Box>
      </HStack>
    </Pressable>
  );
}
