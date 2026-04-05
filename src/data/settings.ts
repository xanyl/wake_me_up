import * as SecureStore from 'expo-secure-store';

const PRIVACY_MODE_KEY = 'wakestop_privacy_mode';

export async function getPrivacyMode(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(PRIVACY_MODE_KEY);
  return value === 'true';
}

export async function setPrivacyMode(value: boolean): Promise<void> {
  await SecureStore.setItemAsync(PRIVACY_MODE_KEY, String(value));
}
