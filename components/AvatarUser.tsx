import { Avatar, XStack } from 'tamagui'

interface AvatarUserProps {}

export const AvatarUser = ({}: AvatarUserProps) => {
    return (
        <XStack>
            <Avatar circular size="$6">
            <Avatar.Image
                src={require('../assets/images/bot.png')}
            />
                <Avatar.Fallback backgroundColor={"$blue10"} delayMs={100} />
            </Avatar>
        </XStack>
    )
}