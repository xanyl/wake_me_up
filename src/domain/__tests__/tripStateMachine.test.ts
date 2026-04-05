import { transitionTripState } from '@/src/domain/tripStateMachine';

describe('tripStateMachine', () => {
  it('follows happy path', () => {
    let state = transitionTripState('idle', 'START_DRAFT');
    state = transitionTripState(state, 'ARM_TRIP');
    state = transitionTripState(state, 'BEGIN_MONITORING');
    state = transitionTripState(state, 'TRIGGER_ALERT');
    state = transitionTripState(state, 'COMPLETE');

    expect(state).toBe('completed');
  });

  it('ignores invalid transition', () => {
    const state = transitionTripState('idle', 'COMPLETE');
    expect(state).toBe('idle');
  });
});
