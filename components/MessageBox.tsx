import { XStack, YStack } from 'tamagui'
import { AvatarUser } from './AvatarUser'

import Markdown from 'react-native-markdown-display';

interface MessageBoxProps {
    msg: {
        id?: string | number;
        from: string;
        text: string;
    };
}

export const MessageBox = ({ msg }: MessageBoxProps) => {
    const isUser = msg.from === 'user'
    const getAvatar = () => (isUser ? null : <AvatarUser />)
    return (
        <YStack
            key={msg.id}
            animation="quick"
            enterStyle={{ opacity: 0, scale: 0.95, y: 20 }}
            exitStyle={{ opacity: 0, scale: 0.95, y: 20 }}
            opacity={1}
            scale={1}
            y={0}
        >
            <XStack justify={isUser ? 'flex-end' : 'flex-start'} gap="$2">
                {getAvatar()}
                <YStack bg={isUser ? '$blue10' : '$green10'} px="$3" py="$2" maxW={"70%"} borderRadius="$4">
                    <Markdown
                        style={{
                            body: { color: "white", fontSize: 16 },
                            strong: { fontWeight: 'bold' },
                        }}
                    >
                        {msg.text}
                    </Markdown>
                </YStack>
            </XStack>
        </YStack >
    )
}