import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { Tabs, PressableFeedback } from 'heroui-native';
import { Image } from 'expo-image';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import { Phone } from 'lucide-react-native';

import SignUpForm from './sign-up-form';
import SignInForm from './sign-in-form';

const SUPPORT_NUMBERS = [
  { label: '0558 218 741', value: '0558218741' },
  { label: '0547 103 309', value: '0547103309' },
] as const;

function SupportFooter() {
  return (
    <View className="items-center py-8 px-6 gap-2">
      <View className="flex-row items-center gap-1.5">
        <Phone size={12} color="#9ca3af" />
        <Text className="text-xs text-foreground">Facing issues? Contact support</Text>
      </View>
      <View className="flex-row items-center gap-3">
        {SUPPORT_NUMBERS.map((num, i) => (
          <View key={num.value} className="flex-row items-center gap-3">
            {i > 0 && <Text className="text-foreground text-xs">·</Text>}
            <PressableFeedback onPress={async () => {
              const url = `tel:${num.value}`;
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                await Linking.openURL(url);
              }
            }}>
              <Text className="text-xs font-semibold text-accent">{num.label}</Text>
            </PressableFeedback>
          </View>
        ))}
      </View>
    </View>
  );
}

const HEADER_HEIGHT = 350;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function AuthScreen() {
  const [activeTab, setActiveTab] = useState('signup');
  const scrollY = useSharedValue(0);
  const { width } = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // For pull-down (overscroll): scale up and translate
    // For scroll up: move header up with parallax effect
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, -HEADER_HEIGHT / 3],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0],
      [2, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 2],
      [1, 0.6],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  return (
    <View style={styles.container} className='bg-background'>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Parallax Header Image */}
        <Animated.View style={[styles.headerImageContainer, headerAnimatedStyle]}>
          <Image
            source={require('@/assets/images/ktu-image.png')}
            placeholder={{ blurhash }}
            style={styles.headerImage}
            contentFit="cover"
          />
        </Animated.View>

        {/* Header Overlay with Content */}
        <Animated.View style={[styles.headerOverlay, overlayAnimatedStyle]}>
          <View style={styles.headerContent}>
            <View className="flex-row items-end h-full w-full pt-10" style={{ width: width - 40 }}>
              <Image
                source={require('@/assets/images/sign-up-image.png')}
                placeholder={{ blurhash }}
                style={styles.logoImage}
              />

              <View className="flex-1 ml-4">
                <Text style={styles.welcomeTitle}>Welcome.</Text>
                <Text style={styles.welcomeSubtitle}>To your S.R.C App</Text>
                <Text style={styles.welcomeSubtitle}>Sign up to get</Text>
                <Text style={styles.welcomeSubtitle}>started on your campus journey</Text>

                <Text className="mt-4 text-lg font-medium text-white">
                  Your <Text className="text-[#F5882B]">campus</Text>, your{' '}
                  <Text className="text-[#F5882B]">voice</Text>
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Tab Content */}
        <View className='bg-background flex-1'>
          <Tabs variant='secondary' value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="mx-5 mt-4">
              <Tabs.Trigger value="signup" className="flex-1">
                <Tabs.Label>Sign Up</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="signin" className="flex-1">
                <Tabs.Label>Sign In</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>

            <Tabs.Content value="signup">
              <SignUpForm />
            </Tabs.Content>

            <Tabs.Content value="signin">
              <SignInForm />
            </Tabs.Content>
          </Tabs>

          <SupportFooter />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImageContainer: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: HEADER_HEIGHT,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    experimental_backgroundImage:
      'linear-gradient(to bottom, rgba(10, 76, 163, 0.7) 0%, rgba(10, 76, 163, 0.9) 100%)',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoImage: {
    width: "45%",
    objectFit: 'contain',
    height: '100%',
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '500',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    minHeight: 500,
  },
});
