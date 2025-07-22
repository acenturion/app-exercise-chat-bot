import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { useThemeContext } from '../../context/ThemeContext';
import { useMemo } from 'react';
import { Atom, Cog } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const { colorScheme } = useThemeContext();
  const theme = useTheme();

  const tabStyles = useMemo(() => ({
    tabBarActiveTintColor: theme.red10.val,
    tabBarStyle: {
      backgroundColor: theme.background.val,
      borderTopColor: theme.borderColor.val,
    },
    headerStyle: {
      backgroundColor: theme.background.val,
      borderBottomColor: theme.borderColor.val,
    },
    headerTintColor: theme.color.val,
  }), [colorScheme]);

  return (
    <Tabs
      screenOptions={tabStyles}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scientific IA chat',
          tabBarIcon: ({ color }) => <Atom color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configuration',
          tabBarIcon: ({ color }) => <Cog color={color as any} />,
        }}
      />
    </Tabs>
  )
}
