import { useEffect, useRef } from 'react';
import * as Updates from 'expo-updates';
import { Alert, AppState } from 'react-native';

/**
 * Checks for OTA updates on mount and whenever the app comes to the foreground.
 * When an update is found it downloads silently, then shows an alert giving the
 * user the choice to reload immediately or dismiss for later.
 *
 * All network calls are no-ops in development mode.
 */
export function useOtaUpdate() {
  const appState = useRef(AppState.currentState);
  const alertActiveRef = useRef(false);
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  // Silently download the update once it's detected
  useEffect(() => {
    if (__DEV__ || !isUpdateAvailable) return;
    Updates.fetchUpdateAsync().catch(() => {});
  }, [isUpdateAvailable]);

  // When download completes, prompt the user
  useEffect(() => {
    if (__DEV__ || !isUpdatePending || alertActiveRef.current) return;

    alertActiveRef.current = true;
    Alert.alert(
      'Update available',
      'A new update is ready. Refresh now to get the latest improvements.',
      [
        {
          text: 'Later',
          onPress: () => {
            alertActiveRef.current = false;
          },
        },
        {
          text: 'Refresh',
          isPreferred: true,
          onPress: () => Updates.reloadAsync(),
        },
      ]
    );
  }, [isUpdatePending]);

  // Re-check for updates each time the app returns to the foreground
  useEffect(() => {
    if (__DEV__) return;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        Updates.checkForUpdateAsync().catch(() => {});
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);
}
