import { Text, StyleSheet, View } from 'react-native';
import { ReliabilityState } from '@/src/domain/models';
import { colors, spacing } from '@/src/ui/theme';

function levelColor(level: ReliabilityState['level']) {
  if (level === 'high') return colors.success;
  if (level === 'medium') return colors.warn;
  return colors.danger;
}

export function ReliabilityBadge({ reliability }: { reliability: ReliabilityState }) {
  return (
    <View style={[styles.badge, { borderColor: levelColor(reliability.level) }]}> 
      <Text style={styles.label}>Reliability: {reliability.level.toUpperCase()}</Text>
      <Text style={styles.sub}>{reliability.explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.sm,
    gap: 4,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
  },
  sub: {
    color: colors.subtext,
    fontSize: 13,
  },
});
