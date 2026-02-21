import { useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TextField, Button, Spinner, Label, Input, FieldError } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';

import { SigninSchema, type SigninFormType } from '@/lib/schemas/auth';
import { useSignInWithEmailPassword } from '@/hooks/auth/use-signin-with-email-password';
import { useResendOtp } from '@/hooks/auth/use-resend-otp';

function EmailNotConfirmedBanner({ email }: { email: string }) {
  const router = useRouter();
  const { mutate: resend, isPending, error: resendError } = useResendOtp();

  const handleResend = () => {
    resend(email, {
      onSuccess: () => {
        router.push({ pathname: '/auth/verify-screen', params: { email } });
      },
    });
  };

  return (
    <View style={styles.banner} className="mb-4 rounded-2xl p-4 gap-2.5">
      <View className="flex-row items-center gap-2">
        <Mail size={15} color="#d97706" />
        <Text className="text-sm font-semibold text-foreground">Email not verified</Text>
      </View>

      <Text className="text-xs text-foreground leading-relaxed">
        Your account email hasn&apos;t been confirmed yet. Tap below to receive a verification code.
      </Text>

      <Button
        variant="tertiary"
        size="sm"
        onPress={handleResend}
        isDisabled={isPending}
        className="self-start mt-1"
      >
        {isPending ? (
          <Spinner size="sm" />
        ) : (
          <Button.Label>Resend confirmation email</Button.Label>
        )}
      </Button>

      {resendError && (
        <Text className="text-xs text-danger">{resendError.message}</Text>
      )}
    </View>
  );
}

export default function SignInForm() {
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<SigninFormType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: signIn, isPending, error } = useSignInWithEmailPassword();

  const isEmailNotConfirmed = error?.message === 'Email not confirmed';

  const onSubmit = async (data: SigninFormType) => {
    try {
      await signIn(data);
    } catch (err) {
      console.log('Sign in failed:', err);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 32 }}
    >
      <View className="mb-8 gap-5">
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.email} isRequired>
              <Label>Institution Email</Label>
              <Input
                placeholder="example234d@ktu.edu.gh"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.email && (
                <FieldError>{errors.email.message}</FieldError>
              )}
            </TextField>
          )}
        />

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.password} isRequired>
              <Label>Password</Label>
              <Input
                ref={passwordRef}
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </TextField>
          )}
        />
      </View>

      {/* Email not confirmed — actionable recovery banner */}
      {isEmailNotConfirmed && (
        <EmailNotConfirmedBanner email={getValues('email')} />
      )}

      {/* Other backend errors */}
      {error && !isEmailNotConfirmed && (
        <Text className="mb-4 text-danger text-sm">
          {error.message || 'Failed to sign in.'}
        </Text>
      )}

      {/* Submit Button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        isDisabled={!isValid || isPending}
        className="w-full"
        size="lg"
      >
        {isPending ? (
          <Spinner size="md" color="#8B5CF6" />
        ) : (
          <Button.Label>Sign in</Button.Label>
        )}
      </Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
});
