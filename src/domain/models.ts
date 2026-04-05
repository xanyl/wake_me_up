export type TransportMode = 'bus' | 'metro' | 'train' | 'car_passenger';

export type WakeModeType = 'near_destination' | 'minutes_before_arrival';

export interface Destination {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export interface WakeStrategy {
  mode: WakeModeType;
  radiusMeters?: number;
  leadMinutes?: number;
  failSafeLatestWakeAt?: string;
}

export interface AlarmPolicy {
  sound: string;
  vibrationEnabled: boolean;
  escalationSeconds: number[];
}

export interface PermissionState {
  foregroundLocation: 'granted' | 'denied' | 'undetermined';
  backgroundLocation: 'granted' | 'denied' | 'undetermined';
  notifications: 'granted' | 'denied' | 'undetermined';
  exactAlarm: 'granted' | 'denied' | 'not_applicable' | 'unknown';
  preciseLocationAvailable: boolean;
}

export type ReliabilityLevel = 'high' | 'medium' | 'low';

export interface ReliabilityState {
  score: number;
  level: ReliabilityLevel;
  explanation: string;
}

export interface SavedPlace {
  id: string;
  label: string;
  destination: Destination;
  isFavorite: boolean;
  isPreset: boolean;
}

export type TripLifecycleState =
  | 'idle'
  | 'drafting'
  | 'armed'
  | 'monitoring'
  | 'alerting'
  | 'completed'
  | 'failed';

export interface Trip {
  id: string;
  destination: Destination;
  transportMode: TransportMode;
  wakeStrategy: WakeStrategy;
  estimatedArrivalAt?: string;
  createdAt: string;
  updatedAt: string;
  state: TripLifecycleState;
}

export interface WakeRegistrationResult {
  geofenceArmed: boolean;
  fallbackAlarmArmed: boolean;
  nativeRegistrationSucceeded: boolean;
  reason?: string;
}
