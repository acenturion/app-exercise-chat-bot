import { Text, View, YStack, Button, Avatar } from 'tamagui'
import { getFirstLetter } from 'constants/utils';
import { useThemeContext } from '../../context/ThemeContext';

export default function TabTwoScreen() {
  const { colorScheme, toggleTheme } = useThemeContext();

  const user = {
    name: 'Juan Pérez',
    role: 'Estudiante',
  };

  const handleToggleTheme = () => {
    toggleTheme();
  }

  return (
    <View flex={1} items="center" justify="center" bg="$background" gap="$6">
      <YStack items="center" gap="$3">
        <Avatar circular size="$8">
          <Avatar.Fallback bg="$blue10" justify={"center"} alignItems={"center"} >
            <Text color="white" fontWeight="bold" fontSize={22}>{getFirstLetter(user.name)}</Text>
          </Avatar.Fallback>
        </Avatar>
        <Text fontSize={22} fontWeight="bold">{user.name}</Text>
        <Text fontSize={16} color="$accent1">{user.role}</Text>
      </YStack>
      <YStack gap="$3" width={250}>
        <Button
          size="$4"
          onPress={handleToggleTheme}
          iconAfter={<Text fontSize={14}>{colorScheme === 'light' ? '🌞' : '🌙'}</Text>}
          themeInverse={colorScheme === 'dark'}
        >
          Cambiar tema ({colorScheme})
        </Button>
        <Button size="$4" disabled>
          Iniciar sesión
        </Button>
      </YStack>
    </View>
  )
}
