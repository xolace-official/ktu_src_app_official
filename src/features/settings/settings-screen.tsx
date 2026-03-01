import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Button, Dialog, useToast } from 'heroui-native';
import Constants from 'expo-constants';
import { settingSections } from '@/config/settings.config';
import { useSignOut } from '@/hooks/auth/use-signout';
import { useDeleteAccount } from '@/hooks/auth/use-delete-account';
import type { SettingItem } from '@/types/settings.types';
import {
  SettingsProfileHeader,
  SettingSectionGroup,
  ExternalServicesSection,
  DeveloperCreditsCard,
} from './components';

export const ScreenSettings = () => {
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const { toast } = useToast();
  const signOutMutation = useSignOut();
  const deleteAccountMutation = useDeleteAccount();

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
        } else if (item.action === 'deleteaccount') {
          setDeleteAccountDialogOpen(true);
        }
        break;
    }
  };

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSettled: () => setSignOutDialogOpen(false),
    });
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        setDeleteAccountDialogOpen(false);
      },
      onError: () => {
        toast.show({
          variant: 'danger',
          label: 'An error occurred while deleting your account. Please try again.',
          actionLabel: 'Close',
          onActionPress: ({ hide }) => hide(),
        });
      },
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
        <DeveloperCreditsCard />
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

      <Dialog isOpen={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <View className="mb-5 gap-2">
              <Dialog.Title className="text-danger">Delete Account</Dialog.Title>
              <Dialog.Description>
                This action is permanent and cannot be undone. All your data, including your
                profile, preferences, and activity history will be permanently removed.
              </Dialog.Description>
              <Text className="mt-1 text-sm text-muted">
                We strongly advise against deleting your account. If you&apos;re experiencing
                issues, please reach out to our support team first.
              </Text>
              <Link
                href="/settings/privacy-policy"
                className="mt-2 text-sm text-accent underline"
                onPress={() => {
                  setDeleteAccountDialogOpen(false);
                }}
              >
                Read our policy on account deletion
              </Link>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setDeleteAccountDialogOpen(false)}
              >
                <Button.Label>Cancel</Button.Label>
              </Button>
              <Button
                variant="danger"
                size="sm"
                onPress={handleDeleteAccount}
                isDisabled={deleteAccountMutation.isPending}
              >
                <Button.Label>
                  {deleteAccountMutation.isPending ? 'Deleting...' : 'Delete Account'}
                </Button.Label>
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};
