// #region Stream chat
type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

type ExtendableGenerics = {
    pollOptionType: any;
    pollType: any;
}

export type StreamChatGenerics = ExtendableGenerics & {
    attachmentType: LocalAttachmentType;
    channelType: LocalChannelType;
    commandType: LocalCommandType;
    eventType: LocalEventType;
    messageType: LocalMessageType;
    reactionType: LocalReactionType;
    userType: LocalUserType;
};

// #region Navigation
type RoomRoute = { Room: undefined };
type HomeScreenRoute = { Homescreen: undefined, FindScreen: undefined };
type ThreadRoute = { MessageThread: undefined };
export type NavigationParamsList = RoomRoute & HomeScreenRoute & ThreadRoute;