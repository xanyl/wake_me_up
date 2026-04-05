import { Trip, WakeRegistrationResult } from '@/src/domain/models';
import { nativeCancelWake, nativeRegisterWake, nativeTriggerTestAlarm } from './nativeWakeModule';
import { WakePlatformAdapter } from './types';

export class NativeWakeAdapter implements WakePlatformAdapter {
  registerWake(trip: Trip): Promise<WakeRegistrationResult> {
    return nativeRegisterWake(trip);
  }

  cancelWake(tripId: string): Promise<void> {
    return nativeCancelWake(tripId);
  }

  triggerTestAlarm(): Promise<void> {
    return nativeTriggerTestAlarm();
  }
}

export class WakeEngine {
  constructor(private readonly adapter: WakePlatformAdapter) {}

  async armTrip(trip: Trip): Promise<WakeRegistrationResult> {
    return this.adapter.registerWake(trip);
  }

  async stopTrip(tripId: string): Promise<void> {
    await this.adapter.cancelWake(tripId);
  }

  async testAlarm() {
    await this.adapter.triggerTestAlarm();
  }
}
