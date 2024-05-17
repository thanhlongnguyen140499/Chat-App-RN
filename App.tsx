import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import HomeScreen from './src/views/HomeScreen';
import { useChatClient } from './src/hooks/useChatClient';
import { AppProvider } from './src/context/AppContext';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { chatApiKey, chatUserToken } from './chatConfig';
import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY, user } from './src/constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const NavigationStack = () => {
  const chatClient = useChatClient({
    apiKey: 'j5tf8d5swrf2',
    userData: {
      id: 'shrill-queen-1',
    },
    tokenOrProvider: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2hyaWxsLXF1ZWVuLTEifQ.KTPLdH_z3zkWXWgkMCgzvJBrseTj0f1eW7NJ55y_ZJw'
  });

  if (!chatClient) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
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
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};
