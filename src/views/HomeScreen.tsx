import { View, Text } from 'react-native';
import React from 'react';
import { useChatClient } from '../hooks/useChatClient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>HomeScreen</Text>
      </View>
    </GestureHandlerRootView>

  );
};

export default HomeScreen;
