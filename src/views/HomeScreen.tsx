import { View, Text, Button } from 'react-native';
import React, { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParamsList } from '../types/types';
import { AppContext, useAppContext } from '../context/AppContext';
import { ChannelList } from 'stream-chat-react-native';
import { ADMIN_USER, USER } from '../constants/index';

interface HomeScreenProps {
  navigation: StackNavigationProp<NavigationParamsList, 'Homescreen'>;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { chatClient, setChannel } = useAppContext()

  const filters = {
    members: { $in: [USER.id] },
    type: 'messaging',
  };

  const memoizedFilters = useMemo(() => filters, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Stream Chat App',
      headerRight: () => <Button title='Add' onPress={() => navigation.navigate('FindScreen')} />
    })
  }, [])

  useEffect(() => {
    const fetchChannels = async () => {
      if (chatClient) {
        const sort = [{ last_message_at: -1 }];
        const response = await chatClient.queryChannels(filters, sort, {
          watch: true, // this is the default
          state: true,
        });

        console.log("response: ", response);

      }
    }
    fetchChannels()
  }, [])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ChannelList
        filters={memoizedFilters}
        onSelect={(room) => {
          setChannel(room)
          navigation.navigate('Room')
        }} />
    </GestureHandlerRootView>

  );
};

export default HomeScreen;
