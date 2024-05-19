// AppContext.js

import React, {useState} from 'react';

export const AppContext = React.createContext({
  channel: null,
  setChannel: channel => {},
  thread: null,
  setThread: thread => {},
  chatClient: null,
  setChatClient: chatClient => {},
});

export const AppProvider = ({children}) => {
  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState();
  const [chatClient, setChatClient] = useState(null);

  return (
    <AppContext.Provider value={{channel, setChannel, thread, setThread, chatClient, setChatClient}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
