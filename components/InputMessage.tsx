import { Input } from 'tamagui';

interface InputMessageProps {
  value: string;
  onChangeText: (text: string) => void;
  onKeyPress?: (e: any) => void;
  placeholder?: string;
}

export function InputMessage({ value, onChangeText, onKeyPress, placeholder }: InputMessageProps) {
  return (
    <Input
      flex={1}
      value={value}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      size="$5"
      fontSize={18}
      px={18}
      py={14}
      multiline
      numberOfLines={3}
      style={{ textAlignVertical: 'top' }}
    />
  );
}
