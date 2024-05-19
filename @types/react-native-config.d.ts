declare module 'react-native-config' {
    export interface NativeConfig {
        CHAT_API_KEY: string
        USER_TOKEN: string
        ADMIN_USER_TOKEN: string
    }

    export const Config: NativeConfig;
    export default Config;
}
