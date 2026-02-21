import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { PressableFeedback } from 'heroui-native';
import { Image } from 'expo-image';
import { ShoppingBag } from 'lucide-react-native';

export function MarketCTA() {
  const handlePress = () => {
    router.push('/(protected)/(tabs)/marketplace-screen');
  };

  return (
    <View className="px-4">
      <PressableFeedback onPress={handlePress}>
        <View className="relative overflow-hidden rounded-2xl">
            <Image
          source={require('@/assets/images/Enter-student-market-1.png')}
          style={styles.image}
        />

          {/* Decorative Icon */}
          <View className="absolute -right-4 -top-4 opacity-10">
            <ShoppingBag size={100} color="white" />
          </View>
        </View>
      </PressableFeedback>
    </View>
  );
}


const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 4 / 3, borderRadius: 15 },
});