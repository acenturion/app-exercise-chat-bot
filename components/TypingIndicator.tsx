import { XStack, YStack } from 'tamagui'
import { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'

interface TypingIndicatorProps {}

export function TypingIndicator({}: TypingIndicatorProps) {
    const dot1 = useState(new Animated.Value(0))[0]
    const dot2 = useState(new Animated.Value(0))[0]
    const dot3 = useState(new Animated.Value(0))[0]

    useEffect(() => {
        const createAnim = (dot, delay) =>
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, { toValue: 1, duration: 350, delay, useNativeDriver: true, easing: Easing.linear }),
                    Animated.timing(dot, { toValue: 0, duration: 350, useNativeDriver: true, easing: Easing.linear })
                ])
            )
        const a1 = createAnim(dot1, 0)
        const a2 = createAnim(dot2, 200)
        const a3 = createAnim(dot3, 400)
        a1.start(); a2.start(); a3.start()
        return () => { a1.stop(); a2.stop(); a3.stop() }
    }, [])

    return (
        <XStack justify="flex-start">
            <YStack bg="$green5" px="$3" py="$2" borderRadius="$4" >
                <XStack flex={1} justify={"center"} items="center" gap={2} height={22}>
                    <Animated.View style={{ opacity: dot1, width: 8, height: 8, borderRadius: 4, backgroundColor: '#888' }} />
                    <Animated.View style={{ opacity: dot2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#888' }} />
                    <Animated.View style={{ opacity: dot3, width: 8, height: 8, borderRadius: 4, backgroundColor: '#888' }} />
                </XStack>
            </YStack>
        </XStack>
    )
}