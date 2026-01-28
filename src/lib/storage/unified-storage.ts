// A small adapter for createJSONStorage that works on web and Expo (AsyncStorage).
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = typeof window !== 'undefined' && Platform.OS === 'web';

export const zustandJSONStorage = {
  getItem: async (name: string) => {
    if (isWeb) {
      const raw = window.localStorage.getItem(name);
      return raw;
    } else {
      return AsyncStorage.getItem(name);
    }
  },
  setItem: async (name: string, value: string) => {
    if (isWeb) {
      window.localStorage.setItem(name, value);
    } else {
      await AsyncStorage.setItem(name, value);
    }
  },
  removeItem: async (name: string) => {
    if (isWeb) {
      window.localStorage.removeItem(name);
    } else {
      await AsyncStorage.removeItem(name);
    }
  },
};
