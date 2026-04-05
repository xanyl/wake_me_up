import { Trip, WakeRegistrationResult } from '@/src/domain/models';

export interface WakePlatformAdapter {
  registerWake(trip: Trip): Promise<WakeRegistrationResult>;
  cancelWake(tripId: string): Promise<void>;
  triggerTestAlarm(): Promise<void>;
}
