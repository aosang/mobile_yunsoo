import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast, { ErrorToast, SuccessToast, ToastProps } from 'react-native-toast-message';

let text1 = {
  fontSize: 15,
  color: '#222',
  fontWeight: '500'
}

const toastConfig = {
  
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#fff',
        borderLeftColor: '#ff4d4f',
        height: 46,
      }}
      text1Style={text1 as any}
    />
  ),
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: '#fff',
        borderLeftColor: '#52c41a',
        height: 46,
      }}
      text1Style={text1 as any}
    />
  )
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark'? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false, 
            headerLeft: () => null }} 
          />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
