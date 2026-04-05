import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/src/ui/components/Screen';
import { Card } from '@/src/ui/components/Card';
import { Field } from '@/src/ui/components/Field';
import { PrimaryButton } from '@/src/ui/components/PrimaryButton';
import { colors } from '@/src/ui/theme';
import { listSavedPlaces, saveSavedPlace } from '@/src/data/db';
import { SavedPlace } from '@/src/domain/models';

export default function SavedPlacesScreen() {
  const [label, setLabel] = useState('');
  const [places, setPlaces] = useState<SavedPlace[]>([]);

  function refresh() {
    setPlaces(listSavedPlaces());
  }

  useEffect(() => {
    refresh();
  }, []);

  function onSave() {
    const safeLabel = label.trim() || 'Favorite Place';
    saveSavedPlace({
      id: `place-${Date.now()}`,
      label: safeLabel,
      isFavorite: true,
      isPreset: false,
      destination: {
        id: `dest-${Date.now()}`,
        name: safeLabel,
        latitude: 40.7128,
        longitude: -74.006,
      },
    });
    setLabel('');
    refresh();
  }

  return (
    <Screen>
      <Text style={styles.title}>Saved Places</Text>
      <Field label="Place label" value={label} onChangeText={setLabel} placeholder="Home, Work, etc." />
      <PrimaryButton label="Save Place" onPress={onSave} />
      {places.map((place) => (
        <Card key={place.id}>
          <Text style={styles.body}>{place.label}</Text>
          <Text style={styles.sub}>{place.destination.name}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  body: { color: colors.text, fontSize: 16, fontWeight: '600' },
  sub: { color: colors.subtext, fontSize: 14 },
});
