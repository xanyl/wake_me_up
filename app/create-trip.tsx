import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from '@/src/ui/components/Field';
import { PrimaryButton } from '@/src/ui/components/PrimaryButton';
import { Screen } from '@/src/ui/components/Screen';
import { colors } from '@/src/ui/theme';
import { MockMapSearchProvider } from '@/src/services/maps/provider';
import { useAppStore } from '@/src/state/AppProvider';
import { TransportMode, WakeStrategy } from '@/src/domain/models';

export default function CreateTripScreen() {
  const router = useRouter();
  const { createTrip } = useAppStore();
  const mapProvider = useMemo(() => new MockMapSearchProvider(), []);

  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<TransportMode>('train');
  const [wakeMode, setWakeMode] = useState<WakeStrategy['mode']>('near_destination');
  const [leadMinutes, setLeadMinutes] = useState('8');
  const [radius, setRadius] = useState('1000');

  async function onCreateTrip() {
    const result = await mapProvider.search(query || 'Destination');
    const destination = result[0];
    const strategy: WakeStrategy =
      wakeMode === 'near_destination'
        ? { mode: wakeMode, radiusMeters: Number(radius) || 1000 }
        : { mode: wakeMode, leadMinutes: Number(leadMinutes) || 8 };

    await createTrip(destination, mode, strategy);
    router.push('/active-trip');
  }

  return (
    <Screen>
      <Text style={styles.title}>Trip Setup</Text>
      <Field label="Destination" value={query} onChangeText={setQuery} placeholder="Search destination" />
      <Field label="Transport (bus | metro | train | car_passenger)" value={mode} onChangeText={(v) => setMode(v as TransportMode)} />
      <Field
        label="Wake mode (near_destination | minutes_before_arrival)"
        value={wakeMode}
        onChangeText={(v) => setWakeMode(v as WakeStrategy['mode'])}
      />
      {wakeMode === 'near_destination' ? (
        <Field label="Wake radius meters" value={radius} onChangeText={setRadius} />
      ) : (
        <Field label="Lead minutes" value={leadMinutes} onChangeText={setLeadMinutes} />
      )}
      <View style={{ height: 8 }} />
      <PrimaryButton label="Arm Trip" onPress={onCreateTrip} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
});
