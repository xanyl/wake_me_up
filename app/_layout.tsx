import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/src/state/AppProvider';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0B0E13' },
          headerTintColor: '#F3F6FF',
          contentStyle: { backgroundColor: '#0B0E13' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'WakeStop' }} />
        <Stack.Screen name="create-trip" options={{ title: 'Create Trip' }} />
        <Stack.Screen name="active-trip" options={{ title: 'Active Trip' }} />
        <Stack.Screen name="saved-places" options={{ title: 'Saved Places' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </AppProvider>
  );
}
