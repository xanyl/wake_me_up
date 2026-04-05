import { useRouter } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { Screen } from '@/src/ui/components/Screen';
import { Card } from '@/src/ui/components/Card';
import { PrimaryButton } from '@/src/ui/components/PrimaryButton';
import { colors } from '@/src/ui/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Text style={styles.title}>Wake up near your stop, reliably.</Text>
      <Card>
        <Text style={styles.body}>
          WakeStop keeps your trip local on your phone and uses battery-friendly native wake triggers.
        </Text>
      </Card>
      <PrimaryButton label="Create Trip" onPress={() => router.push('/create-trip')} />
      <PrimaryButton label="Saved Places" onPress={() => router.push('/saved-places')} />
      <PrimaryButton label="Settings" onPress={() => router.push('/settings')} />
      <PrimaryButton label="Test wake flow" onPress={() => router.push('/active-trip')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  body: {
    color: colors.subtext,
    fontSize: 16,
  },
});
