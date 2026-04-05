import { Trip } from '@/src/domain/models';
import { WakeEngine } from './wakeEngine';

export async function orchestrateWakeTrip(engine: WakeEngine, trip: Trip) {
  const registration = await engine.armTrip(trip);
  if (!registration.nativeRegistrationSucceeded) {
    return {
      ok: false,
      state: 'failed' as const,
      reason: registration.reason ?? 'Wake registration failed.',
      registration,
    };
  }

  return {
    ok: true,
    state: 'monitoring' as const,
    registration,
  };
}
