import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Button, Dialog } from 'heroui-native';
import Constants from 'expo-constants';
import { settingSections } from '@/config/settings.config';
import { useSignOut } from '@/hooks/auth/use-signout';
import type { SettingItem } from '@/types/settings.types';
import {
  SettingsProfileHeader,
  SettingSectionGroup,
  ExternalServicesSection,
  DeveloperCredits,
} from './components';

export const ScreenSettings = () => {
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const signOutMutation = useSignOut();

  const handleItemPress = async (item: SettingItem) => {
    switch (item.type) {
      case 'navigate':
        if (item.route) {
          router.push(item.route as never);
        }
        break;
      case 'external':
        if (item.externalUrl) {
          await openBrowserAsync(item.externalUrl, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
        break;
      case 'action':
        if (item.action === 'signout') {
          setSignOutDialogOpen(true);
        }
        break;
    }
  };

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSettled: () => setSignOutDialogOpen(false),
    });
  };

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-6 pb-10 pt-4 bg-background"
      >
        <SettingsProfileHeader />
        <View className="gap-6 px-4">
          {settingSections.map((section) => (
              <SettingSectionGroup
              key={section.id}
              section={section}
              onItemPress={handleItemPress}
              />
            ))}
        </View>
        <ExternalServicesSection />
        <DeveloperCredits />
        <Text className="text-center text-xs text-muted">Version {appVersion}</Text>
      </ScrollView>

      <Dialog isOpen={signOutDialogOpen} onOpenChange={setSignOutDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Sign Out</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to sign out? You&apos;ll need to sign in again to access your
                account.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setSignOutDialogOpen(false)}
              >
                <Button.Label>Cancel</Button.Label>
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-danger"
                onPress={handleSignOut}
                isDisabled={signOutMutation.isPending}
              >
                <Button.Label className="text-white">
                  {signOutMutation.isPending ? 'Signing Out...' : 'Sign Out'}
                </Button.Label>
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};
