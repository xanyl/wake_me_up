import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { PermissionState } from '@/src/domain/models';

function normalize(
  status: Location.PermissionStatus | Notifications.PermissionStatus,
): 'granted' | 'denied' | 'undetermined' {
  if (status === 'granted') return 'granted';
  if (status === 'denied') return 'denied';
  return 'undetermined';
}

export async function readPermissionState(): Promise<PermissionState> {
  const fg = await Location.getForegroundPermissionsAsync();
  const bg = await Location.getBackgroundPermissionsAsync();
  const notifications = await Notifications.getPermissionsAsync();

  return {
    foregroundLocation: normalize(fg.status),
    backgroundLocation: normalize(bg.status),
    notifications: normalize(notifications.status),
    exactAlarm: Platform.OS === 'android' ? 'unknown' : 'not_applicable',
    preciseLocationAvailable: fg.accuracy === Location.Accuracy.Full,
  };
}

export async function requestCorePermissions() {
  const fg = await Location.requestForegroundPermissionsAsync();
  const bg = await Location.requestBackgroundPermissionsAsync();
  const notifications = await Notifications.requestPermissionsAsync();

  return {
    foregroundLocation: normalize(fg.status),
    backgroundLocation: normalize(bg.status),
    notifications: normalize(notifications.status),
  };
}
