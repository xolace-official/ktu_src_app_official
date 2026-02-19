import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Button, InputOTP, Spinner } from 'heroui-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

import { useResendOtp } from '@/hooks/auth/use-resend-otp';
import { useVerifyOtp } from '@/hooks/auth/use-verify-otp';
import { OTPSchema, type OTPFormType } from '@/lib/schemas/auth';

/**
 * Render an email OTP verification form with a countdown, validation, resend, and verify actions.
 *
 * Displays the email extracted from local search params, accepts a 6-digit code, enforces schema validation,
 * disables actions when the timer expires or email is missing, and surfaces API errors inline.
 *
 * @returns The component's JSX element for the OTP verification UI
 */
export default function VerifyOtpForm() {
  const { email: rawEmail } = useLocalSearchParams<{ email: string }>();
  const email = typeof rawEmail === 'string' && rawEmail.length > 0 ? rawEmail : undefined;
  const [timer, setTimer] = useState(180); // 3 minutes

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<OTPFormType>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otpCode: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onSubmit = async (data: OTPFormType) => {
    if (!email) {
      setError('otpCode', { message: 'Email address is missing. Please go back and try again.' });
      return;
    }
    try {
      Keyboard.dismiss();

      await verifyOtp.mutateAsync({
        email,
        token: data.otpCode,
        type: 'email', // important
      });

      // Navigate to complete profile or home
      // router.replace('/(protected)/complete-profile');
    } catch (err: any) {
      const message = err?.message
        ? `${err.message}. Please try again or wait to resend new code`
        : 'OTP verification failed. Please wait to resend code or contact support.';
      setError('otpCode', { message });
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('otpCode', { message: 'Email address is missing. Please go back and try again.' });
      return;
    }
    try {
      await resendOtp.mutateAsync(email);
      setTimer(180);
      reset({ otpCode: '' });
    } catch (err: any) {
      setError('otpCode', {
        message: err?.message || 'Failed to resend code',
      });
    }
  };

  const handleComplete = (code: string) => {
    if (code.length === 6) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <View className="flex-1 items-center gap-12 pt-16">
      <View className="w-full items-center">
        <Text className="text-center text-2xl font-bold text-white">Check your email</Text>
        <Text className="mt-2 text-center text-base text-white/80">
          We&apos;ve sent a verification code to
        </Text>
        <Text className="mt-1 text-center text-base font-medium text-white">{email}</Text>
      </View>

      <Controller
        control={control}
        name="otpCode"
        render={({ field: { onChange, value } }) => (
          <InputOTP
            maxLength={6}
            value={value}
            onChange={onChange}
            onComplete={handleComplete}
            isInvalid={!!errors.otpCode}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} className="bg-white/10 border-white/30" />
              <InputOTP.Slot index={1} className="bg-white/10 border-white/30" />
              <InputOTP.Slot index={2} className="bg-white/10 border-white/30" />
            </InputOTP.Group>
            <InputOTP.Separator className="text-white" />
            <InputOTP.Group>
              <InputOTP.Slot index={3} className="bg-white/10 border-white/30" />
              <InputOTP.Slot index={4} className="bg-white/10 border-white/30" />
              <InputOTP.Slot index={5} className="bg-white/10 border-white/30" />
            </InputOTP.Group>
          </InputOTP>
        )}
      />

      <View className="w-full items-center gap-4 px-4">
        {errors.otpCode ? (
          <Text className="text-center text-danger">{errors.otpCode.message}</Text>
        ) : (
          <Text className={`text-center ${timer < 30 ? 'text-danger' : 'text-white/80'}`}>
            Code expires in {formatTime(timer)}
          </Text>
        )}

        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={!email || !isValid || timer === 0 || verifyOtp.isPending || resendOtp.isPending}
          className="w-full"
          size="lg"
        >
          {verifyOtp.isPending ? (
            <Spinner size="md" color="#8B5CF6" />
          ) : timer === 0 ? (
            <Button.Label>Code expired</Button.Label>
          ) : (
            <Button.Label>Verify</Button.Label>
          )}
        </Button>

        <Button
          onPress={handleResend}
          variant='tertiary'
          isDisabled={!email || timer > 0 || resendOtp.isPending || verifyOtp.isPending}
          className="w-full border-white/30"
          size="lg"
        >
          {resendOtp.isPending ? (
            <Spinner size="md" color="#8B5CF6" />
          ) : timer > 0 ? (
            <Button.Label className="text-foreground">Wait to Resend {errors.otpCode && formatTime(timer)}</Button.Label>
          ) : (
            <Button.Label className="text-white">Resend code</Button.Label>
          )}
        </Button>
      </View>
    </View>
  );
}