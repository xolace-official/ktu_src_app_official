import { useState } from 'react';
import { View } from 'react-native';
import { TextField, Button, FormField, Spinner } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';

import { SignupSchema, type SignupFormType } from '@/lib/schemas/auth';
import { useSignUpWithEmail } from '@/hooks/auth/use-signup-with-email-password';

export default function SignUpForm() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const signUp = useSignUpWithEmail({ onError: () => {} });

  const onSubmit = async (data: SignupFormType) => {
    try {
      const res = await signUp.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (signUp.isSuccess || res.user) {
        router.push({
          pathname: '/',
          params: { email: data.email },
        });
      }
    } catch (error) {
      console.log('Sign up error:', error);
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
                textContentType="emailAddress"
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
                textContentType="newPassword"
              />
              {errors.password && (
                <TextField.ErrorMessage>{errors.password.message}</TextField.ErrorMessage>
              )}
            </TextField>
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.confirmPassword} isRequired>
              <TextField.Label>Confirm Password</TextField.Label>
              <TextField.Input
                placeholder="Repeat your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="newPassword"
              />
              {errors.confirmPassword && (
                <TextField.ErrorMessage>{errors.confirmPassword.message}</TextField.ErrorMessage>
              )}
            </TextField>
          )}
        />
      </View>

      {/* Terms Checkbox & Submit */}
      <View className="gap-6">
        <FormField
          isSelected={acceptedTerms}
          onSelectedChange={setAcceptedTerms}
          className="flex-row items-center gap-3"
        >
          <FormField.Indicator variant="checkbox" />
          <FormField.Label>Accept terms and conditions</FormField.Label>
        </FormField>

        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid || isSubmitting || !acceptedTerms}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <Spinner size="sm" className="text-primary-foreground" />
          ) : (
            <Button.Label>Sign up</Button.Label>
          )}
        </Button>
      </View>
    </View>
  );
}
