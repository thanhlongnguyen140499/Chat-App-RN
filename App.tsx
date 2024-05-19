import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text } from 'react-native';
import HomeScreen from './src/views/HomeScreen';
import { AppProvider, useAppContext } from './src/context/AppContext';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChatGenerics } from './src/types/types';
import Room from './src/views/Room';
import MessageThread from './src/views/MessageThread';
import Config from 'react-native-config'
import FindScreen from './src/views/FindScreen';
import { ADMIN_USER, ADMIN_USER_TOKEN, USER, USER_TOKEN } from './src/constants/index';

const Stack = createStackNavigator();

const NavigationStack = () => {
  const chatClient = StreamChat.getInstance<StreamChatGenerics>(Config.CHAT_API_KEY)
  const { setChatClient, setChannel } = useAppContext()

  const [clientReady, setClientReady] = useState(false);

  const filters = {
    members: { $in: [USER.id] },
    type: 'messaging',
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(USER, USER_TOKEN);
        const sort = [{ last_message_at: undefined }];
        const response = await chatClient.queryChannels(filters, sort, {
          watch: true,
          state: true,
        });
        console.log("response: ", response);

        setClientReady(true)
        setChatClient(chatClient)
      } catch (error) {
        console.log("error: ", error);
      }

    }

    setupClient();
  }, [])

  if (!clientReady) {
    return (<SafeAreaView style={{ flex: 1 }}>
      <Text>Loading chat ...</Text>
    </SafeAreaView>)
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="MessageThread" component={MessageThread} />
          <Stack.Screen name="FindScreen" component={FindScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <GestureHandlerRootView>
            <NavigationStack />
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};
