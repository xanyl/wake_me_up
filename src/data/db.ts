import * as SQLite from 'expo-sqlite';
import { SavedPlace, Trip } from '@/src/domain/models';

const db = SQLite.openDatabaseSync('wakestop.db');

export function initializeDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS active_trip (
      id TEXT PRIMARY KEY NOT NULL,
      json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS saved_places (
      id TEXT PRIMARY KEY NOT NULL,
      json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

export function saveActiveTrip(trip: Trip) {
  const now = new Date().toISOString();
  db.runSync(
    'INSERT OR REPLACE INTO active_trip (id, json, updated_at) VALUES (?, ?, ?)',
    trip.id,
    JSON.stringify(trip),
    now,
  );
}

export function getActiveTrip(): Trip | null {
  const row = db.getFirstSync<{ json: string }>('SELECT json FROM active_trip LIMIT 1');
  return row ? (JSON.parse(row.json) as Trip) : null;
}

export function clearActiveTrip() {
  db.runSync('DELETE FROM active_trip');
}

export function saveSavedPlace(place: SavedPlace) {
  const now = new Date().toISOString();
  db.runSync(
    'INSERT OR REPLACE INTO saved_places (id, json, updated_at) VALUES (?, ?, ?)',
    place.id,
    JSON.stringify(place),
    now,
  );
}

export function listSavedPlaces(): SavedPlace[] {
  const rows = db.getAllSync<{ json: string }>('SELECT json FROM saved_places ORDER BY updated_at DESC');
  return rows.map((r) => JSON.parse(r.json) as SavedPlace);
}
