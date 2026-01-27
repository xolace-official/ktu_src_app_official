import { Button } from 'heroui-native';
import { View } from 'react-native';
import { router } from 'expo-router';

export function ExampleHeroComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Button onPress={() => router.push('/auth/auth-content')}>Get Started</Button>
    </View>
  );
}