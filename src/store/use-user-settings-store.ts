import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import EStorageKeys from '@/constants/keys';
import { ECurrency } from '@/constants/misc';

interface IState {
  apiKey: string;
  currency: ECurrency;
}

interface IActions {
  setAPIKey: (apiKey: string) => void;
  setCurrency: (currency: ECurrency) => void;
}

const useUserSettingsStore = create(
  persist<IState & IActions>(
    (set) => ({
      apiKey: '',
      currency: ECurrency.EUR,
      setAPIKey: (apiKey: string) => set((state) => ({ ...state, apiKey })),
      setCurrency: (currency: ECurrency) => set((state) => ({ ...state, currency }))
    }),
    {
      name: EStorageKeys.apiKey
    }
  )
);

export default useUserSettingsStore;
