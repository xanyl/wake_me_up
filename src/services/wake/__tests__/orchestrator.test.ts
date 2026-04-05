import { WakeEngine } from '@/src/services/wake/wakeEngine';
import { orchestrateWakeTrip } from '@/src/services/wake/orchestrator';
import { Trip } from '@/src/domain/models';

const trip: Trip = {
  id: 'trip-1',
  destination: {
    id: 'd1',
    name: 'Central Station',
    latitude: 0,
    longitude: 0,
  },
  transportMode: 'train',
  wakeStrategy: { mode: 'near_destination', radiusMeters: 1000 },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  state: 'armed',
};

describe('orchestrateWakeTrip', () => {
  it('returns monitoring on success', async () => {
    const engine = new WakeEngine({
      registerWake: async () => ({
        geofenceArmed: true,
        fallbackAlarmArmed: true,
        nativeRegistrationSucceeded: true,
      }),
      cancelWake: async () => undefined,
      triggerTestAlarm: async () => undefined,
    });

    const result = await orchestrateWakeTrip(engine, trip);
    expect(result.ok).toBe(true);
    expect(result.state).toBe('monitoring');
  });

  it('returns failed on registration error', async () => {
    const engine = new WakeEngine({
      registerWake: async () => ({
        geofenceArmed: false,
        fallbackAlarmArmed: false,
        nativeRegistrationSucceeded: false,
        reason: 'failed',
      }),
      cancelWake: async () => undefined,
      triggerTestAlarm: async () => undefined,
    });

    const result = await orchestrateWakeTrip(engine, trip);
    expect(result.ok).toBe(false);
    expect(result.state).toBe('failed');
  });
});
