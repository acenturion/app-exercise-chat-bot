
import { XStack, YStack, ScrollView, Paragraph, AnimatePresence } from 'tamagui'
import { InputMessage } from 'components/InputMessage';
import { SendButton } from 'components/SendButton';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { TypingIndicator } from 'components/TypingIndicator'
import { MessageBox } from 'components/MessageBox'
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl, InitialExamples } from 'constants/utils'
import { ExampleButton } from 'components/ExampleButton';


export default function TabOneScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const { messages, error, handleInputChange, input, handleSubmit, status, setMessages } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: error => console.log(error),
  });

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { id: "1", role: 'assistant', content: '¡Hola! Voy a ser tu guia virtual. ¿En qué puedo ayudarte hoy?' }
      ]);
    }
  }, [messages, setMessages]);

  const handleOnChange = e => {
    if (typeof e === "string") {
      handleInputChange({
        target: { value: e }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }

  const handleInputKeyPress = (e) => {
    if (e?.nativeEvent?.key === 'Enter' || e?.key === 'Enter') {
      handleSend(e);
    }
  }

  const handleSend = e => {
    e.preventDefault();
    handleSubmit(e);
    Keyboard.dismiss();
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
    >
      <YStack flex={1} bg="$background" px="$2" py="$4" gap="$4">
        <ScrollView
          ref={scrollViewRef}
          flex={1}
          p="$3"
          keyboardShouldPersistTaps="handled"
        >
          <YStack mb="$4" gap="$2">
            <Paragraph fontWeight={"bold"} fontSize="$5" text="center">
              Rompe el hielo con estas preguntas
            </Paragraph>
          </YStack>
          <XStack gap="$2" mb="$2" flexWrap="wrap" justify="center">
            {InitialExamples.map((example) => (
              <ExampleButton
                key={example}
                example={example}
                onPress={() => handleOnChange(example)}
              />
            ))}
          </XStack>
          <YStack gap="$4">
            <AnimatePresence>
              {messages.map(m => (
                <MessageBox key={m.id} msg={{ from: m.role, text: m.content }} />
              ))}
              {error && (
                <MessageBox key="error" msg={{ from: 'assistant', text: 'Ocurrió un error. Intenta nuevamente.' }} />
              )}
            </AnimatePresence>
            {(status === 'submitted' || status === 'streaming') && (
              <TypingIndicator />
            )}
          </YStack>
        </ScrollView>
        <XStack gap="$2" justify="center" items={"center"}>
          <InputMessage
            value={input}
            onChangeText={handleOnChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Escribe tu mensaje..."
          />
          <SendButton onPress={handleSend} disabled={!input.trim()} />
        </XStack>
      </YStack>
    </KeyboardAvoidingView>
  )
}
