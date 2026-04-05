import { computeReliabilityState } from '@/src/domain/reliability';

describe('computeReliabilityState', () => {
  it('returns high when everything is enabled', () => {
    const result = computeReliabilityState(
      {
        foregroundLocation: 'granted',
        backgroundLocation: 'granted',
        notifications: 'granted',
        exactAlarm: 'granted',
        preciseLocationAvailable: true,
      },
      {
        geofenceArmed: true,
        fallbackAlarmArmed: true,
        nativeRegistrationSucceeded: true,
      },
    );

    expect(result.level).toBe('high');
    expect(result.score).toBe(100);
  });

  it('returns low for major failures', () => {
    const result = computeReliabilityState(
      {
        foregroundLocation: 'denied',
        backgroundLocation: 'denied',
        notifications: 'denied',
        exactAlarm: 'denied',
        preciseLocationAvailable: false,
      },
      {
        geofenceArmed: false,
        fallbackAlarmArmed: false,
        nativeRegistrationSucceeded: false,
      },
    );

    expect(result.level).toBe('low');
    expect(result.score).toBeLessThan(50);
  });
});
