import ExpoModulesCore

public class WakeStopWakeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WakeStopWakeModule")

    AsyncFunction("registerWake") { (payload: String) async throws -> [String: Any] in
      // TODO: Parse trip payload and register Core Location geofence + notification fallback.
      return [
        "geofenceArmed": false,
        "fallbackAlarmArmed": false,
        "nativeRegistrationSucceeded": false,
        "reason": "iOS native wake flow not wired yet."
      ]
    }

    AsyncFunction("cancelWake") { (tripId: String) async in
      _ = tripId
      // TODO: Stop region monitoring and pending notifications for trip.
    }

    AsyncFunction("triggerTestAlarm") {
      // TODO: Trigger local test notification/haptic sequence.
    }
  }
}
