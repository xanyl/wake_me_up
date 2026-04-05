import { TripLifecycleState } from './models';

export type TripEvent =
  | 'START_DRAFT'
  | 'ARM_TRIP'
  | 'BEGIN_MONITORING'
  | 'TRIGGER_ALERT'
  | 'COMPLETE'
  | 'FAIL'
  | 'RESET';

const transitions: Record<TripLifecycleState, Partial<Record<TripEvent, TripLifecycleState>>> = {
  idle: {
    START_DRAFT: 'drafting',
  },
  drafting: {
    ARM_TRIP: 'armed',
    RESET: 'idle',
  },
  armed: {
    BEGIN_MONITORING: 'monitoring',
    FAIL: 'failed',
    RESET: 'idle',
  },
  monitoring: {
    TRIGGER_ALERT: 'alerting',
    FAIL: 'failed',
    COMPLETE: 'completed',
  },
  alerting: {
    COMPLETE: 'completed',
    FAIL: 'failed',
  },
  completed: {
    RESET: 'idle',
  },
  failed: {
    RESET: 'idle',
    START_DRAFT: 'drafting',
  },
};

export function transitionTripState(
  current: TripLifecycleState,
  event: TripEvent,
): TripLifecycleState {
  return transitions[current][event] ?? current;
}
