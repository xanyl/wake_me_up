import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { initializeDatabase } from '@/src/data/db';
import { useTripStore } from './useTripStore';
import { readPermissionState } from '@/src/services/permissions';

const AppContext = createContext<ReturnType<typeof useTripStore> | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const store = useTripStore();
  const { setPermissionState } = store;

  useEffect(() => {
    initializeDatabase();
    readPermissionState().then(setPermissionState).catch(() => undefined);
  }, [setPermissionState]);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('useAppStore must be used inside AppProvider');
  }
  return value;
}
