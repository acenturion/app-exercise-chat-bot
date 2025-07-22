import { Button, Text } from 'tamagui';
import { MoveRight } from '@tamagui/lucide-icons'
interface SendButtonProps {
    onPress: (e?: any) => void;
    disabled?: boolean;
}

export function SendButton({ onPress, disabled }: SendButtonProps) {
    return (
        <Button
            size="$4"
            px={"$4"}
            py={"$2"}
            onPress={onPress}
            disabled={disabled}
            style={{ elevation: 2 }}
            bg={"$black5"}
        >
            <MoveRight size={16} color="white" />
        </Button>
    );
}
