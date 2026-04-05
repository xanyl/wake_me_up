import { StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/src/ui/components/Card';
import { PrimaryButton } from '@/src/ui/components/PrimaryButton';
import { ReliabilityBadge } from '@/src/ui/components/ReliabilityBadge';
import { Screen } from '@/src/ui/components/Screen';
import { useAppStore } from '@/src/state/AppProvider';
import { colors } from '@/src/ui/theme';

export default function ActiveTripScreen() {
  const router = useRouter();
  const { activeTrip, reliability, stopTrip, testAlarm } = useAppStore();

  return (
    <Screen>
      <Text style={styles.title}>Active Trip</Text>
      {!activeTrip ? (
        <Card>
          <Text style={styles.body}>No active trip yet. Create one first.</Text>
          <PrimaryButton label="Create Trip" onPress={() => router.push('/create-trip')} />
        </Card>
      ) : (
        <>
          <Card>
            <Text style={styles.body}>Destination: {activeTrip.destination.name}</Text>
            <Text style={styles.body}>State: {activeTrip.state}</Text>
            <Text style={styles.body}>Wake mode: {activeTrip.wakeStrategy.mode}</Text>
            <Text style={styles.body}>Battery status: optimized monitoring enabled.</Text>
          </Card>
          <ReliabilityBadge reliability={reliability} />
          <PrimaryButton label="Test Alarm" onPress={() => void testAlarm()} />
          <PrimaryButton
            label="Stop Trip"
            destructive
            onPress={() => {
              void stopTrip().then(() => router.push('/'));
            }}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  body: { color: colors.subtext, fontSize: 16 },
});
