import { useCallback } from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import { PressableFeedback, Surface } from 'heroui-native';
import { router } from 'expo-router';
import {
  User,
  Phone,
  CreditCard,
  School,
  BookOpen,
  GraduationCap,
  Calendar,
  Mail,
  Clock,
  Lock,
  ChevronRight,
} from 'lucide-react-native';
import { useAppStore } from '@/store/store';
import { useTheme } from '@/hooks/use-theme';
import { useProfile } from '@/hooks/profile/use-profile';
import { formatPhoneNumber } from '@/utils/profile.utils';
import {
  ProfileHeader,
  ProfileInfoSection,
  ProfileInfoRow,
  ProfileLoadingSkeleton,
} from './components/profile';

export const ProfileAccountScreen = () => {
  const theme = useTheme();
  const userId = useAppStore((s) => s.userId);
  const storeEmail = useAppStore((s) => s.email);

  const {
    data: profile,
    isLoading,
    isRefetching,
    refetch,
  } = useProfile(userId);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  const displayEmail = profile?.email ?? storeEmail;
  const levelDisplay = profile?.level ? `Level ${profile.level}` : null;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="pb-10 bg-background"
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor={theme.accent}
        />
      }
    >
      <ProfileHeader
        fullName={profile?.full_name ?? null}
        email={displayEmail ?? null}
        username={profile?.username ?? null}
        avatarUrl={profile?.avatar_url ?? null}
      />

      <View className="gap-6 px-4">
        {/* Personal Information */}
        <ProfileInfoSection title="Personal Information">
          <ProfileInfoRow
            icon={User}
            iconBgClass="bg-accent/10"
            iconColor="#3B82F6"
            label="Full Name"
            value={profile?.full_name ?? null}
          />
          <ProfileInfoRow
            icon={Phone}
            iconBgClass="bg-success/10"
            iconColor="#22C55E"
            label="Phone Number"
            value={profile?.phone ? formatPhoneNumber(profile.phone) : null}
            selectable
          />
          <ProfileInfoRow
            icon={CreditCard}
            iconBgClass="bg-purple-500/10"
            iconColor="#A855F7"
            label="Index Number"
            value={profile?.index_number ?? null}
            selectable
          />
        </ProfileInfoSection>

        {/* Academic Information */}
        <ProfileInfoSection title="Academic Information">
          <ProfileInfoRow
            icon={School}
            iconBgClass="bg-orange-500/10"
            iconColor="#F97316"
            label="Faculty"
            value={profile?.faculty_name ?? null}
          />
          <ProfileInfoRow
            icon={BookOpen}
            iconBgClass="bg-teal-500/10"
            iconColor="#14B8A6"
            label="Department"
            value={profile?.department_name ?? null}
          />
          <ProfileInfoRow
            icon={GraduationCap}
            iconBgClass="bg-indigo-500/10"
            iconColor="#6366F1"
            label="Program"
            value={profile?.program_name ?? null}
          />
          <ProfileInfoRow
            icon={Calendar}
            iconBgClass="bg-amber-500/10"
            iconColor="#F59E0B"
            label="Level"
            value={levelDisplay}
          />
        </ProfileInfoSection>

        {/* Account */}
        <ProfileInfoSection title="Account">
          <ProfileInfoRow
            icon={Mail}
            iconBgClass="bg-danger/10"
            iconColor="#EF4444"
            label="Email"
            value={displayEmail ?? null}
            selectable
          />
          <ProfileInfoRow
            icon={Clock}
            iconBgClass="bg-default"
            iconColor={theme.textSecondary}
            label="Member Since"
            value={memberSince}
          />
        </ProfileInfoSection>

        {/* Security */}
        <View>
          <Text className="mb-1.5 px-4 text-xs font-medium uppercase tracking-wide text-muted">
            Security
          </Text>
          <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
            <PressableFeedback
              onPress={() => router.push('/settings/change-password' as never)}
            >
              <View className="min-h-[48px] flex-row items-center px-4 py-3">
                <View className="size-[30px] items-center justify-center rounded-lg bg-accent/10">
                  <Lock size={16} color="#3B82F6" />
                </View>
                <Text className="ml-3 flex-1 text-[15px] text-foreground">
                  Change Password
                </Text>
                <ChevronRight size={18} color={theme.textSecondary} />
              </View>
            </PressableFeedback>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
};
