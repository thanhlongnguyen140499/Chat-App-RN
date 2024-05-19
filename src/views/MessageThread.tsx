import { View, Text, Platform, SafeAreaView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigationParamsList } from '../types/types'
import { Channel, Thread, useOverlayContext } from 'stream-chat-react-native'
import { useAppContext } from '../context/AppContext'

interface MessageThreadProps {
  navigation: StackNavigationProp<NavigationParamsList, 'MessageThread'>
}

const MessageThread: FC<MessageThreadProps> = ({ navigation }) => {

  const { channel, thread, setThread } = useAppContext()
  const { overlay } = useOverlayContext()

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: Platform.OS === 'ios' && overlay === 'none',
    })
  }, [])

  if (!channel) {
    return null
  }

  return (
    <SafeAreaView>
      <Channel channel={channel} thread={thread} threadList>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <Thread onThreadDismount={() => setThread(null)} />
        </View>


      </Channel>
    </SafeAreaView>
  )
}

export default MessageThread