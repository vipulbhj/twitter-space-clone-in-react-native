import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Text,
  HStack,
  VStack,
  Button,
  IconButton,
  HamburgerIcon,
  FlatList,
  Image,
  Circle,
  Pressable,
} from 'native-base';
import {
  HMSUpdateListenerActions,
  HMSConfig,
} from '@100mslive/react-native-hms';
import HMSContext from '../components/HMSContext';

const fetchToken = async ({ roomID, userID, role }) => {
  const endPoint =
    'https://prod-in.100ms.live/hmsapi/geekyants.app.100ms.live/api/token';

  const body = {
    room_id: roomID,
    user_id: userID,
    role: role,
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(endPoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });

  const result = await response.json();
  return result;
};

async function joinRoom(hmsInstance, roomID, userID) {
  if (!hmsInstance) {
    console.error('HMS Instance not found');
    return;
  }

  const { token } = await fetchToken({
    roomID,
    userID,
    role: 'speaker',
  });

  const hmsConfig = new HMSConfig({ authToken: token, username: userID });

  hmsInstance.join(hmsConfig);
}

export default function Space({ navigation, route }) {
  const hmsInstance = useContext(HMSContext);
  const [isMute, setMute] = useState(false);
  const [participants, setParticipants] = useState([]);

  const userID = useRef('demouser').current;
  const roomID = useRef(route.params.roomID).current;

  useEffect(() => {
    if (hmsInstance) {
      hmsInstance.addEventListener(HMSUpdateListenerActions.ON_ERROR, (data) =>
        console.error('ON_ERROR_HANDLER', data)
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        ({ room, localPeer, remotePeers }) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map((remotePeer) => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        }
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_ROOM_UPDATE,
        (data) => console.log('ON ROOM UPDATE', data)
      );

      hmsInstance?.addEventListener(
        HMSUpdateListenerActions.ON_PEER_UPDATE,
        ({ localPeer, remotePeers }) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map((remotePeer) => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        }
      );

      hmsInstance?.addEventListener(
        HMSUpdateListenerActions.ON_TRACK_UPDATE,
        ({ localPeer, remotePeers }) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map((remotePeer) => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        }
      );
    }

    joinRoom(hmsInstance, roomID, userID);
  }, [hmsInstance, roomID, userID]);

  return (
    <>
      <VStack
        p="4"
        flex="1"
        space="4"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'darkBlue.900' }}
      >
        <HStack ml="auto" alignItems="center">
          <IconButton
            variant="unstyled"
            icon={<HamburgerIcon _dark={{ color: 'white' }} size="4" />}
          />
          <Button variant="unstyled">
            <Text fontSize="md" fontWeight="bold" color="red.600">
              Leave
            </Text>
          </Button>
        </HStack>
        <Text fontSize="xl" fontWeight="bold">
          Building a Twitter Space Clone in React Native using NativeBase and
          100ms
        </Text>
        <FlatList
          numColumns={4}
          ListEmptyComponent={<Text>Loading...</Text>}
          data={participants}
          renderItem={({ item }) => (
            <VStack w="25%" p="2" alignItems="center">
              {item.avatar}
              <Text numberOfLines={1} fontSize="xs">
                {item.name}
              </Text>
              <HStack alignItems="center" space="1">
                {item.isMute && (
                  <Image
                    size="3"
                    alt="Peer is mute"
                    source={require('../icons/mute.png')}
                  />
                )}
                <Text numberOfLines={1} fontSize="xs">
                  {item.role}
                </Text>
              </HStack>
            </VStack>
          )}
          keyExtractor={(item) => item.id}
        />
      </VStack>
      <HStack
        p="4"
        zIndex="1"
        safeAreaBottom
        borderTopWidth="1"
        alignItems="center"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'darkBlue.900' }}
      >
        <VStack space="2" justifyContent="center" alignItems="center">
          <Pressable
            onPress={() => {
              hmsInstance.localPeer.localAudioTrack().setMute(!isMute);
              setMute(!isMute);
            }}
          >
            <Circle p="2" borderWidth="1" borderColor="coolGray.400">
              {isMute ? (
                <Image
                  size="8"
                  key="mic-is-off"
                  alt="mic is off"
                  resizeMode={'contain'}
                  source={require('../icons/mic-mute.png')}
                />
              ) : (
                <Image
                  size="8"
                  key="mic-is-on"
                  alt="mic is on"
                  resizeMode={'contain'}
                  source={require('../icons/mic.png')}
                />
              )}
            </Circle>
          </Pressable>
          <Text fontSize="md">{isMute ? 'Mic is off' : 'Mic is on'}</Text>
        </VStack>
        <HStack ml="auto" mr="4" space="5">
          <Image
            size="7"
            alt="Participant Icon"
            source={require('../icons/users.png')}
          />
          <Image
            size="7"
            alt="Emojie Icon"
            source={require('../icons/heart.png')}
          />
          <Image
            size="7"
            alt="Share Icon"
            source={require('../icons/share.png')}
          />
          <Image
            size="7"
            alt="Tweet Icon"
            source={require('../icons/feather.png')}
          />
        </HStack>
      </HStack>
    </>
  );
}
