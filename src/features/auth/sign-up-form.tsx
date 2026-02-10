import { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { TextField, Button, ControlField, Spinner, Label, Input, FieldError } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useToast } from 'heroui-native';
import Feather from '@expo/vector-icons/Feather';
import { withUniwind } from 'uniwind';

import { SignupSchema, type SignupFormType } from '@/lib/schemas/auth';
import { useSignUpWithEmail } from '@/hooks/auth/use-signup-with-email-password';

const StyledFeather = withUniwind(Feather);

export default function SignUpForm() {
  const {toast} = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

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

  const signUp = useSignUpWithEmail({ onError: (error) => {
    toast.show({
      variant: 'danger',
      label: 'Sign up failed',
      description: error.message,
      icon: (
              <StyledFeather
                name="hard-drive"
                size={16}
                className="text-danger mt-[3px]"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
    });
  } });

  const onSubmit = async (data: SignupFormType) => {
    try {
      const res = await signUp.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (signUp.isSuccess || res.user) {
        router.push({
          pathname: '/auth/verify-screen',
          params: { email: data.email },
        });
      }
    } catch (error) {
      console.log('Sign up error:', error);

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
                textContentType="emailAddress"
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
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
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
              <Label>Confirm Password</Label>
              <Input
                ref={confirmPasswordRef}
                placeholder="Repeat your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="done"
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </TextField>
          )}
        />
      </View>

      {/* Terms Checkbox & Submit */}
      <View className="gap-6">
        <ControlField
          isSelected={acceptedTerms}
          onSelectedChange={setAcceptedTerms}
          className="flex-row items-center gap-3"
        >
          <ControlField.Indicator variant="checkbox" />
          <Label>Accept terms and conditions</Label>
        </ControlField>

        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid || isSubmitting || !acceptedTerms}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <Spinner size="md" color="#8B5CF6" />
          ) : (
            <Button.Label>Sign up</Button.Label>
          )}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
