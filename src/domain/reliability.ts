import { PermissionState, ReliabilityState, WakeRegistrationResult } from './models';

export function computeReliabilityState(
  permissionState: PermissionState,
  wakeRegistration: WakeRegistrationResult,
): ReliabilityState {
  let score = 100;
  const reasons: string[] = [];

  if (permissionState.foregroundLocation !== 'granted') {
    score -= 50;
    reasons.push('Location access is required.');
  }

  if (permissionState.backgroundLocation !== 'granted') {
    score -= 20;
    reasons.push('Background location is off.');
  }

  if (permissionState.notifications !== 'granted') {
    score -= 30;
    reasons.push('Notifications are off.');
  }

  if (!permissionState.preciseLocationAvailable) {
    score -= 10;
    reasons.push('Precise location is unavailable.');
  }

  if (permissionState.exactAlarm === 'denied') {
    score -= 10;
    reasons.push('Exact alarms are unavailable on this device.');
  }

  if (!wakeRegistration.nativeRegistrationSucceeded) {
    score -= 30;
    reasons.push('Native wake registration failed.');
  }

  if (!wakeRegistration.geofenceArmed) {
    score -= 25;
    reasons.push('Destination proximity trigger is not armed.');
  }

  if (!wakeRegistration.fallbackAlarmArmed) {
    score -= 15;
    reasons.push('Time fallback trigger is not armed.');
  }

  score = Math.max(0, Math.min(100, score));

  const level = score >= 80 ? 'high' : score >= 50 ? 'medium' : 'low';
  const explanation =
    reasons.length > 0
      ? reasons.join(' ')
      : 'Wake reliability is strong. You are fully configured.';

  return { score, level, explanation };
}
