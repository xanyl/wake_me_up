import { useMemo, useState } from 'react';
import {
  Destination,
  PermissionState,
  ReliabilityState,
  Trip,
  TripLifecycleState,
  WakeStrategy,
  WakeRegistrationResult,
} from '@/src/domain/models';
import { computeReliabilityState } from '@/src/domain/reliability';
import { transitionTripState } from '@/src/domain/tripStateMachine';
import { clearActiveTrip, getActiveTrip, saveActiveTrip } from '@/src/data/db';
import { NativeWakeAdapter, WakeEngine } from '@/src/services/wake/wakeEngine';

const defaultWakeRegistration: WakeRegistrationResult = {
  geofenceArmed: false,
  fallbackAlarmArmed: false,
  nativeRegistrationSucceeded: false,
};

const defaultPermissions: PermissionState = {
  foregroundLocation: 'undetermined',
  backgroundLocation: 'undetermined',
  notifications: 'undetermined',
  exactAlarm: 'unknown',
  preciseLocationAvailable: false,
};

export function useTripStore() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(getActiveTrip());
  const [permissionState, setPermissionState] = useState<PermissionState>(defaultPermissions);
  const [wakeRegistration, setWakeRegistration] = useState<WakeRegistrationResult>(defaultWakeRegistration);
  const engine = useMemo(() => new WakeEngine(new NativeWakeAdapter()), []);

  const reliability: ReliabilityState = computeReliabilityState(permissionState, wakeRegistration);

  function updateTripState(state: TripLifecycleState) {
    if (!activeTrip) return;
    const next = { ...activeTrip, state, updatedAt: new Date().toISOString() };
    setActiveTrip(next);
    saveActiveTrip(next);
  }

  async function createTrip(
    destination: Destination,
    transportMode: Trip['transportMode'],
    wakeStrategy: WakeStrategy,
  ) {
    const now = new Date().toISOString();
    const trip: Trip = {
      id: `trip-${Date.now()}`,
      destination,
      transportMode,
      wakeStrategy,
      createdAt: now,
      updatedAt: now,
      state: 'armed',
    };

    setActiveTrip(trip);
    saveActiveTrip(trip);
    const registration = await engine.armTrip(trip);
    setWakeRegistration(registration);

    const state = registration.nativeRegistrationSucceeded
      ? transitionTripState('armed', 'BEGIN_MONITORING')
      : transitionTripState('armed', 'FAIL');

    updateTripState(state);
  }

  async function stopTrip() {
    if (!activeTrip) return;
    await engine.stopTrip(activeTrip.id);
    clearActiveTrip();
    setActiveTrip(null);
    setWakeRegistration(defaultWakeRegistration);
  }

  async function testAlarm() {
    await engine.testAlarm();
  }

  return {
    activeTrip,
    reliability,
    permissionState,
    setPermissionState,
    wakeRegistration,
    createTrip,
    stopTrip,
    testAlarm,
  };
}
