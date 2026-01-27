import { View, Text } from 'react-native';
import { TextField, Button, Spinner } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SigninSchema, type SigninFormType } from '@/lib/schemas/auth';
import { useSignInWithEmailPassword } from '@/hooks/auth/use-signin-with-email-password';

export default function SignInForm() {
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
    <View className="px-5 py-8">
      <View className="mb-8 gap-5">
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.email} isRequired>
              <TextField.Label>Institution Email</TextField.Label>
              <TextField.Input
                placeholder="example234d@ktu.edu.gh"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />
              {errors.email && (
                <TextField.ErrorMessage>{errors.email.message}</TextField.ErrorMessage>
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
              <TextField.Label>Password</TextField.Label>
              <TextField.Input
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="password"
              />
              {errors.password && (
                <TextField.ErrorMessage>{errors.password.message}</TextField.ErrorMessage>
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
    </View>
  );
}
