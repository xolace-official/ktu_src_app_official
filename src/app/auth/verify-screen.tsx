import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TextField, Button } from 'heroui-native';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <View className="flex-1 justify-center px-5 bg-background">
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-foreground mb-2">Verify your email</Text>
        <Text className="text-muted-foreground text-center">
          We sent a verification code to{'\n'}
          <Text className="font-medium text-foreground">{email}</Text>
        </Text>
      </View>

      <View className="gap-6">
        {/* TODO: Add InputOTP component here for OTP verification */}
        <TextField>
          <TextField.Label>Verification Code</TextField.Label>
          <TextField.Input
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            maxLength={6}
          />
        </TextField>

        <Button size="lg" className="w-full">
          <Button.Label>Verify</Button.Label>
        </Button>
      </View>
    </View>
  );
}
