import { Destination } from '@/src/domain/models';

export interface MapSearchProvider {
  search(query: string): Promise<Destination[]>;
}

export class MockMapSearchProvider implements MapSearchProvider {
  async search(query: string): Promise<Destination[]> {
    if (!query.trim()) return [];
    return [
      {
        id: `dest-${query.toLowerCase()}`,
        name: query,
        latitude: 40.7128,
        longitude: -74.006,
        address: 'Mock destination',
      },
    ];
  }
}
