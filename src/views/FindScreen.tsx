import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParamsList } from '@/types/types';
import { useAppContext } from '../context/AppContext';
import Config from 'react-native-config';
import { ADMIN_USER, USER, USER_TOKEN } from '../constants/index';
import _ from 'lodash'

interface FindScreenProps {
  navigation: StackNavigationProp<NavigationParamsList, 'FindScreen'>;
}

const FindScreen: FC<FindScreenProps> = ({ navigation }) => {
  const { chatClient, channel, setChannel } = useAppContext()
  const [channelName, setChannelName] = useState<string>("")
  const [channelID, setChannelID] = useState<string>("")
  const [newMessage, setNewMessage] = useState<string>("")

  const handleNewChannelCreation = async () => {
    if (chatClient && channelName !== '' && channelName) {
      const newChannelID = `${_.replace(channelName.toString(), /\s+/g, '-')}-${Date.now()}`;
      console.log("channelID: ", channelID);

      const newChannel = chatClient?.channel('messaging', `${newChannelID}-${Date.now()}`,
        {
          name: channelName,
          created_by_id: USER.id,
          members: [USER.id, ADMIN_USER.id],
          image: 'https://i1-vnexpress.vnecdn.net/2023/12/02/VF-7-VNE-TOP-1701485865.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=dy8s_-izNAGBRXMthDRBiw&t=image'
        }
      );

      await newChannel.create();
      // Set the user as an admin
      await newChannel.addMembers([USER.id], { role: 'admin' });
      setChannel(newChannel)
    }
  }

  const text = 'I’m mowing the air Randy, I’m mowing the air.';
  const handleSendMessage = async () => {
    if (channel) {
      await channel.sendMessage({
        text,
        customField: '123',
      });
    }
  }

  const handleAddMember = async () => {
    if (chatClient) {
      await chatClient.upsertUsers([
        { id: '1', role: 'admin', book: 'dune' },
        { id: '2', role: 'user', book: '1984' },
        { id: '3', role: 'admin', book: 'Fahrenheit 451' }
      ])
      // await channel.addMembers(['thierry', 'josh']);
    }
  }

  const handleRoleAssigning = async () => {
    if (channel) {
      await channel.assignRoles([{ user_id: "edward-user-01", channel_role: "channel_member" }])
    }
  }

  const handleChannelInputChange = (text: string) => {
    const newID = `${_.replace(text.toString(), /\s+/g, '-')}-${Date.now()}`;
    setChannelName(text)
    setChannelID(newID)
  }

  return (
    <View>
      <View style={{ padding: 10 }}>
        <Text>Create a new Channel</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput value={channelName.toString()} onChangeText={text => handleChannelInputChange(text)}
            style={{
              flex: 1,
              backgroundColor: 'pink',
              borderRadius: 10,
              padding: 10,
            }}
          />
          <Button title='Create' onPress={handleNewChannelCreation} />
        </View>
        {
          channelName !== '' && <Text style={{ color: 'black', fontWeight: '300', marginTop: 10 }}>ChannelID: {channelID}</Text>
        }

      </View>

      <View style={{ padding: 10 }}>
        <Text>Type your message</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput value={newMessage} onChangeText={setNewMessage}
            style={{
              flex: 1,
              backgroundColor: 'pink',
              borderRadius: 10,
              padding: 10,
            }}
          />
          <Button title='Send' onPress={handleSendMessage} />
        </View>
      </View>
      <Button title='Add more Members' onPress={handleAddMember} />
      <Button title='Assign Admin Role' onPress={handleRoleAssigning} />
    </View>
  )
}

export default FindScreen

const styles = StyleSheet.create({})