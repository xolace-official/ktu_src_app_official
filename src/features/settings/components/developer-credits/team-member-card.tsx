import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Card } from 'heroui-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { TeamMember } from './team-data';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const CARD_HORIZONTAL_PADDING = 16;
export const CARD_GAP = 16;

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - CARD_HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

  return (
    <View style={{ width: cardWidth, aspectRatio: 3 / 4 }}>
      <Card className="flex-1 overflow-hidden p-0" style={{ borderCurve: 'continuous' }}>
        {/* Background: photo or per-member gradient */}
        {member.imageUrl ? (
          <Image
            source={{ uri: member.imageUrl }}
            style={StyleSheet.absoluteFillObject}
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

        {/* Bottom scrim for text legibility */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.72)']}
          style={[StyleSheet.absoluteFillObject, { top: '40%' }]}
        />

        {/* Large initials centered when no photo */}
        {!member.imageUrl && (
          <View
            style={[StyleSheet.absoluteFillObject, styles.initialsContainer]}
          >
            <Text style={styles.initials}>{member.initials}</Text>
          </View>
        )}

        {/* Name + role pinned to the bottom */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {member.name}
          </Text>
          <Text style={styles.position} numberOfLines={1}>
            {member.position}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  initials: {
    fontSize: 44,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 2,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  position: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.72)',
  },
});
