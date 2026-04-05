package expo.modules.wakestop

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class WakeStopWakeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("WakeStopWakeModule")

    AsyncFunction("registerWake") { payload: String ->
      // TODO: Parse payload and register Android geofence + alarm fallback.
      mapOf(
        "geofenceArmed" to false,
        "fallbackAlarmArmed" to false,
        "nativeRegistrationSucceeded" to false,
        "reason" to "Android native wake flow not wired yet."
      )
    }

    AsyncFunction("cancelWake") { tripId: String ->
      // TODO: Cancel geofence/alarm for trip.
      tripId
    }

    AsyncFunction("triggerTestAlarm") {
      // TODO: Trigger local test alert flow.
    }
  }
}
