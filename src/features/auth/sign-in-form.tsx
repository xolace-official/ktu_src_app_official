import { useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TextField, Button, Spinner, Label, Input, FieldError } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SigninSchema, type SigninFormType } from '@/lib/schemas/auth';
import { useSignInWithEmailPassword } from '@/hooks/auth/use-signin-with-email-password';

export default function SignInForm() {
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

    // 🟢 Initialize mutation
  const { mutateAsync: signIn, isPending, error } = useSignInWithEmailPassword();

  const onSubmit = async (data: SigninFormType) => {
    try {
      await signIn(data);
      // Navigate on success:
      // router.replace("/(app)/home");
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

      {/* Backend Error */}
      {error && (
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
          <Spinner size="sm" className="text-primary-foreground" />
        ) : (
          <Button.Label>Sign in</Button.Label>
        )}
      </Button>
    </KeyboardAwareScrollView>
  );
}
