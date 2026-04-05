# WakeStop

WakeStop is a privacy-first destination wake timer for travelers who want reliable wake-up alerts near their stop.

## Stack

- React Native + Expo (development build)
- TypeScript
- Expo Router
- expo-sqlite (local persistence)
- expo-secure-store (sensitive settings)
- Native wake module stubs (Swift/Kotlin via Expo Modules API)

## MVP included

- Onboarding and privacy-first messaging
- Create Trip flow (destination query, transport mode, wake mode)
- Active Trip screen with reliability badge and test alarm action
- Saved Places flow backed by SQLite
- Settings for privacy mode and permission status/actions
- Domain model set (`Destination`, `Trip`, `WakeStrategy`, `AlarmPolicy`, `PermissionState`, `ReliabilityState`, `SavedPlace`)
- Trip state machine (`idle`, `drafting`, `armed`, `monitoring`, `alerting`, `completed`, `failed`)
- Wake engine abstraction + native module bridge stubs

## Project structure

- `app/` route screens
- `src/domain/` business entities + state/reliability logic
- `src/data/` SQLite + secure store access
- `src/services/` permissions, map provider abstraction, wake engine
- `src/state/` app provider + trip store
- `src/ui/` theme and reusable UI components
- `modules/wake-stop-module/` native module stubs (iOS/Android)

## Run locally

```bash
npm install
npm run lint
npm test
npm run start
```

Use Expo development builds (not Expo Go) for native wake functionality.

## Build with EAS

`eas.json` is included with `development`, `preview`, and `production` profiles.

Example:

```bash
eas build --platform ios --profile development
eas build --platform android --profile development
```

## Reliability model

Wake reliability score is computed from:

- location permission level
- background location status
- notification permission
- exact alarm status (Android)
- precise location availability
- native wake registration success
- geofence trigger armed
- fallback alarm armed

UI labels map score to **High / Medium / Low** with plain-language explanation.

## Native wake module notes

Current native modules are stubs and define clear extension points:

- iOS: connect Core Location region monitoring + local notifications
- Android: connect Geofencing API + AlarmManager fallback/exact alarm handling

This is intentional so shared domain logic stays in TypeScript while native-critical flows remain platform-specific.

## App-store readiness notes

- iOS location purpose strings are configured in `app.json` and must match final behavior in release.
- Android background location and exact alarm are requested because core wake behavior depends on them.
- Permission UX clearly communicates reduced reliability when permissions are missing.
- Privacy mode is local-first; no backend is required for MVP.

## Future-ready architecture

The codebase is structured to allow future additions without major rewrites:

- one-stop-before wake strategies
- recurring commute automations
- map-share route import
- wearable integrations
- optional sync adapter (e.g., Supabase)
- adaptive wake radius based on mode/speed
- missed-stop recovery

## What remains for full production release

- Implement native wake registration/cancellation logic in Swift and Kotlin modules
- Wire real map/search provider and map selection UI
- Add richer alarm escalation (audio volume patterns, vibration/haptics per policy)
- Add robust integration/e2e coverage for permission and background scenarios on devices
- Complete store listing artifacts (privacy policy, screenshots, review notes)
