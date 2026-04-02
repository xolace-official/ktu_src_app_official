import { View, Text, StyleSheet, Linking } from 'react-native';
import { BottomSheet, PressableFeedback, Surface } from 'heroui-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Linkedin, Twitter, Mail, Github, Instagram } from 'lucide-react-native';
import type { TeamMember } from './team-data';

interface MemberSheetContentProps {
  member: TeamMember;
}

const SOCIAL_CONFIG = [
  { key: 'linkedin' as const, icon: Linkedin, label: 'LinkedIn' },
  { key: 'x' as const, icon: Twitter, label: 'X' },
  { key: 'github' as const, icon: Github, label: 'GitHub' },
  { key: 'email' as const, icon: Mail, label: 'Email' },
   { key: 'instagram' as const, icon: Instagram, label: 'Instagram' },
] as const;

function openSocial(key: string, value: string) {
  const url = key === 'email' ? `mailto:${value}` : value;
  Linking.openURL(url);
}

export function MemberSheetContent({ member }: MemberSheetContentProps) {
  const availableSocials = SOCIAL_CONFIG.filter(
    (s) => member.socials?.[s.key],
  );

  return (
    <BottomSheet.Content>
      <BottomSheet.Close />

      {/* Avatar */}
      <View className="items-center mb-4">
        <View style={[styles.avatar, { borderCurve: 'continuous' }]}>
          {member.imageUrl ? (
            <Image
              source={{ uri: member.imageUrl }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <LinearGradient
              colors={member.gradientColors ?? ['#3c87f7', '#6366f1']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          )}
          {!member.imageUrl && (
            <View style={[StyleSheet.absoluteFill, styles.initialsContainer]}>
              <Text style={styles.initials}>{member.initials}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Name & Role */}
      <View className="items-center gap-1 mb-5">
        <BottomSheet.Title className="text-center">
          {member.name}
        </BottomSheet.Title>
        <BottomSheet.Description className="text-center">
          {member.position}
        </BottomSheet.Description>
      </View>

      {/* Bio (ready for future use) */}
      {member.bio && (
        <Text className="text-sm text-muted text-center mb-5 px-4">
          {member.bio}
        </Text>
      )}

      {/* Social Links */}
      {availableSocials.length > 0 && (
        <View className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-wide text-muted text-center">
            Connect
          </Text>
          <View className="flex-row justify-center gap-3">
            {availableSocials.map((social) => {
              const Icon = social.icon;
              return (
                <PressableFeedback
                  key={social.key}
                  onPress={() =>
                    openSocial(social.key, member.socials![social.key]!)
                  }
                >
                  <Surface
                    variant="secondary"
                    className="size-12 items-center justify-center rounded-full"
                  >
                    <Icon size={20} className="text-foreground" />
                  </Surface>
                </PressableFeedback>
              );
            })}
          </View>
        </View>
      )}
    </BottomSheet.Content>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
  },
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 32,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 2,
  },
});
