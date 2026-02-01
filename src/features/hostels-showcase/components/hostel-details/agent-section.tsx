import { View } from 'react-native';
import { Image } from 'expo-image';
import { PressableFeedback } from 'heroui-native';
import { MessageCircle, Phone, User } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';
import type { HostelAgent } from '@/types/hostels';

interface AgentSectionProps {
  agent: HostelAgent;
  onMessage: () => void;
  onCall: () => void;
}

/**
 * Simple avatar component without Reanimated
 */
function AgentAvatar({
  uri,
  fallback,
}: {
  uri: string | null;
  fallback: string;
}) {
  const theme = useTheme();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: theme.accentSubtle,
        }}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      className="size-12 items-center justify-center rounded-full"
      style={{ backgroundColor: theme.accentSubtle }}
    >
      {fallback ? (
        <ThemedText className="text-lg font-bold" themeColor="accent">
          {fallback}
        </ThemedText>
      ) : (
        <User size={24} color={theme.accent} />
      )}
    </View>
  );
}

/**
 * Agent section with contact buttons
 * Only renders when agent has name and email
 */
export function AgentSection({ agent, onMessage, onCall }: AgentSectionProps) {
  const theme = useTheme();

  // Only show agent section if name and email are present
  if (!agent.name || !agent.email) {
    return null;
  }

  const agentInitial = agent.name.charAt(0).toUpperCase();

  return (
    <View
      className="mt-5 w-full pt-7"
      style={{ borderTopWidth: 1, borderTopColor: theme.cardBorder }}
    >
      <ThemedText className="text-xl font-bold">Agent</ThemedText>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <AgentAvatar uri={agent.avatar} fallback={agentInitial} />

          <View className="ml-3 flex-1">
            <ThemedText className="text-lg font-bold" numberOfLines={1}>
              {agent.name}
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              numberOfLines={1}
            >
              {agent.email}
            </ThemedText>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <PressableFeedback
            onPress={onMessage}
            className="size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.accentSubtle }}
          >
            <MessageCircle size={20} color={theme.accent} />
          </PressableFeedback>
          <PressableFeedback
            onPress={onCall}
            className="size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.accentSubtle }}
          >
            <Phone size={20} color={theme.accent} />
          </PressableFeedback>
        </View>
      </View>
    </View>
  );
}
