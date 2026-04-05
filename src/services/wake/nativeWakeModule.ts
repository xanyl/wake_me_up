import { NativeModules, Platform } from 'react-native';
import { Trip, WakeRegistrationResult } from '@/src/domain/models';

interface NativeWakeModuleContract {
  registerWake(payload: string): Promise<WakeRegistrationResult>;
  cancelWake(tripId: string): Promise<void>;
  triggerTestAlarm(): Promise<void>;
}

const MODULE_NAME = Platform.OS === 'ios' ? 'WakeStopWakeModule' : 'WakeStopWakeModule';

function getModule(): NativeWakeModuleContract | null {
  return (NativeModules[MODULE_NAME] as NativeWakeModuleContract | undefined) ?? null;
}

export async function nativeRegisterWake(trip: Trip): Promise<WakeRegistrationResult> {
  const module = getModule();
  if (!module) {
    return {
      geofenceArmed: false,
      fallbackAlarmArmed: false,
      nativeRegistrationSucceeded: false,
      reason: 'Native wake module unavailable in current build.',
    };
  }
  return module.registerWake(JSON.stringify(trip));
}

export async function nativeCancelWake(tripId: string): Promise<void> {
  const module = getModule();
  if (!module) return;
  await module.cancelWake(tripId);
}

export async function nativeTriggerTestAlarm(): Promise<void> {
  const module = getModule();
  if (!module) return;
  await module.triggerTestAlarm();
}
