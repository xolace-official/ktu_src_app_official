import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { socialLinks } from './about-data';

export function SocialLinksSection() {
  const handlePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open the link');
    }
  };

  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          Connect With Us
        </Text>
        <Text className="text-sm text-muted">
          Follow KTU SRC on social media for updates
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-3 px-4">
        {socialLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Pressable
              key={link.id}
              onPress={() => handlePress(link.url)}
              className="flex-row items-center gap-2 rounded-full bg-foreground/5 px-4 py-2.5 active:opacity-70"
              style={{ borderCurve: 'continuous' }}
            >
              <IconComponent size={18} color={link.iconColor} />
              <Text className="text-sm font-medium text-foreground">
                {link.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
