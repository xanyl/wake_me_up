import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Screen } from '@/src/ui/components/Screen';
import { Card } from '@/src/ui/components/Card';
import { PrimaryButton } from '@/src/ui/components/PrimaryButton';
import { colors } from '@/src/ui/theme';
import { getPrivacyMode, setPrivacyMode } from '@/src/data/settings';
import { readPermissionState, requestCorePermissions } from '@/src/services/permissions';
import { useAppStore } from '@/src/state/AppProvider';

export default function SettingsScreen() {
  const { permissionState, setPermissionState } = useAppStore();
  const [privacyMode, setPrivacyModeState] = useState(true);

  useEffect(() => {
    getPrivacyMode().then(setPrivacyModeState).catch(() => undefined);
  }, []);

  async function togglePrivacyMode(value: boolean) {
    setPrivacyModeState(value);
    await setPrivacyMode(value);
  }

  async function refreshPermissions() {
    const state = await readPermissionState();
    setPermissionState(state);
  }

  async function askPermissions() {
    await requestCorePermissions();
    await refreshPermissions();
  }

  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <Card>
        <View style={styles.row}>
          <Text style={styles.body}>Privacy mode</Text>
          <Switch value={privacyMode} onValueChange={(v) => void togglePrivacyMode(v)} />
        </View>
        <Text style={styles.sub}>Store only essential trip data on-device.</Text>
      </Card>
      <Card>
        <Text style={styles.body}>Permissions</Text>
        <Text style={styles.sub}>Foreground Location: {permissionState.foregroundLocation}</Text>
        <Text style={styles.sub}>Background Location: {permissionState.backgroundLocation}</Text>
        <Text style={styles.sub}>Notifications: {permissionState.notifications}</Text>
        <Text style={styles.sub}>Exact Alarm: {permissionState.exactAlarm}</Text>
        <PrimaryButton label="Request Permissions" onPress={() => void askPermissions()} />
        <PrimaryButton label="Refresh Status" onPress={() => void refreshPermissions()} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  body: { color: colors.text, fontSize: 16, fontWeight: '600' },
  sub: { color: colors.subtext, fontSize: 14 },
});
