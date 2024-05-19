import { View, Text, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { Channel, MessageInput, MessageList } from 'stream-chat-react-native'
import { useAppContext } from '../context/AppContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigationParamsList } from '../types/types'

interface RoomProps {
  navigation: StackNavigationProp<NavigationParamsList, 'Room'>
}

const Room: FC<RoomProps> = ({ navigation }) => {
  const { channel, setThread } = useAppContext()

  if (!channel) {
    return <View>
      <Text>No Channels Found</Text>
    </View>
  }

  return (
    <SafeAreaView>
      <Channel
        channel={channel}
      >
        {/* <View style={{ flex: 1 }}> */}
          <MessageList
            onThreadSelect={(selectedThread) => {
              setThread(selectedThread)
              if (channel?.id) {
                navigation.navigate('MessageThread')
              }
            }
            }
          />
          <MessageInput />
        {/* </View> */}
      </Channel>
    </SafeAreaView>
  )
}

export default Room