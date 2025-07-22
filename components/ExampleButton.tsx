
import { Button } from "tamagui"

interface ExampleButtonProps {
    example: string;
    onPress: () => void;
}

export const ExampleButton = ({ example, onPress }: ExampleButtonProps) => {
    return (
        <Button
            size="$4"
            variant="outlined"
            onPress={onPress}
            mb="$2"
        >
            {example}
        </Button>
    )
}