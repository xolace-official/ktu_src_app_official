// A small adapter for createJSONStorage that works on web and Expo (AsyncStorage).
import { Platform } from 'react-native';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const isWeb = typeof window !== 'undefined' && Platform.OS === 'web';

const appStorage = createAsyncStorage('app-state');

export const zustandJSONStorage = {
  getItem: async (name: string) => {
    if (isWeb) {
      const raw = window.localStorage.getItem(name);
      return raw;
    } else {
      return appStorage.getItem(name);
    }
  },
  setItem: async (name: string, value: string) => {
    if (isWeb) {
      window.localStorage.setItem(name, value);
    } else {
      await appStorage.setItem(name, value);
    }
  },
  removeItem: async (name: string) => {
    if (isWeb) {
      window.localStorage.removeItem(name);
    } else {
      await appStorage.removeItem(name);
    }
  },
};
