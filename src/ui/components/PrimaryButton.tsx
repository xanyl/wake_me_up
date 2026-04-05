import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '@/src/ui/theme';

export function PrimaryButton({
  label,
  onPress,
  destructive,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.button, destructive ? styles.danger : undefined]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
});
