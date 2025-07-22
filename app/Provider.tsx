import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { config } from '../tamagui.config'
import { ThemeProvider } from 'context/ThemeContext';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <ThemeProvider>
      <TamaguiProvider
        config={config}
        defaultTheme={"dark"}
        {...rest}
      >
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  );
}
