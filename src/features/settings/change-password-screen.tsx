import { useRef, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import {
  TextField,
  Button,
  Spinner,
  Label,
  FieldError,
  InputGroup,
  useToast,
} from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Lock, Eye, EyeOff } from 'lucide-react-native';

import {
  ChangePasswordSchema,
  type ChangePasswordFormType,
} from '@/lib/schemas/auth';
import { useChangePassword } from '@/hooks/auth/use-change-password';

export const ChangePasswordScreen = () => {
  const newPasswordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { toast } = useToast();
  const changePasswordMutation = useChangePassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          toast.show({
            variant: 'success',
            label: 'Password updated successfully. Please sign in with your new password.',
            actionLabel: 'OK',
            onActionPress: ({ hide }) => hide(),
          });
        },
        onError: (error) => {
          toast.show({
            variant: 'danger',
            label: error.message || 'An error occurred while updating your password.',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          });
        },
      },
    );
  };

  const iconColor = '#888';

  return (
    <KeyboardAwareScrollView
      bottomOffset={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
    >
      <View className="gap-5">
        {/* Current Password */}
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.currentPassword} isRequired>
              <Label>Current Password</Label>
              <InputGroup>
                <InputGroup.Prefix isDecorative>
                  <Lock size={16} color={iconColor} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter current password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showCurrent}
                  textContentType="password"
                  autoComplete="current-password"
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <InputGroup.Suffix>
                  <Pressable onPress={() => setShowCurrent(!showCurrent)} hitSlop={20}>
                    {showCurrent ? (
                      <EyeOff size={16} color={iconColor} />
                    ) : (
                      <Eye size={16} color={iconColor} />
                    )}
                  </Pressable>
                </InputGroup.Suffix>
              </InputGroup>
              {errors.currentPassword && (
                <FieldError>{errors.currentPassword.message}</FieldError>
              )}
            </TextField>
          )}
        />

        {/* New Password */}
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.newPassword} isRequired>
              <Label>New Password</Label>
              <InputGroup>
                <InputGroup.Prefix isDecorative>
                  <Lock size={16} color={iconColor} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  ref={newPasswordRef}
                  placeholder="Enter new password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showNew}
                  textContentType="newPassword"
                  autoComplete="new-password"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <InputGroup.Suffix>
                  <Pressable onPress={() => setShowNew(!showNew)} hitSlop={20}>
                    {showNew ? (
                      <EyeOff size={16} color={iconColor} />
                    ) : (
                      <Eye size={16} color={iconColor} />
                    )}
                  </Pressable>
                </InputGroup.Suffix>
              </InputGroup>
              {errors.newPassword && (
                <FieldError>{errors.newPassword.message}</FieldError>
              )}
            </TextField>
          )}
        />

        {/* Confirm New Password */}
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField isInvalid={!!errors.confirmNewPassword} isRequired>
              <Label>Confirm New Password</Label>
              <InputGroup>
                <InputGroup.Prefix isDecorative>
                  <Lock size={16} color={iconColor} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  ref={confirmRef}
                  placeholder="Re-enter new password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showConfirm}
                  textContentType="newPassword"
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
                <InputGroup.Suffix>
                  <Pressable onPress={() => setShowConfirm(!showConfirm)} hitSlop={20}>
                    {showConfirm ? (
                      <EyeOff size={16} color={iconColor} />
                    ) : (
                      <Eye size={16} color={iconColor} />
                    )}
                  </Pressable>
                </InputGroup.Suffix>
              </InputGroup>
              {errors.confirmNewPassword && (
                <FieldError>{errors.confirmNewPassword.message}</FieldError>
              )}
            </TextField>
          )}
        />
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        isDisabled={!isValid || changePasswordMutation.isPending}
        className="mt-8 w-full"
        size="lg"
      >
        {changePasswordMutation.isPending ? (
          <Spinner size="md" color="#8B5CF6" />
        ) : (
          <Button.Label>Update Password</Button.Label>
        )}
      </Button>
    </KeyboardAwareScrollView>
  );
};
