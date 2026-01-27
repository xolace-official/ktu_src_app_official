import { useEffect, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { InputOTP, Button, Spinner } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';

import { OTPSchema, type OTPFormType } from '@/lib/schemas/auth';
// import { useVerifyOtp } from '@/hooks/auth/use-verify-otp';
// import { useResendOtp } from '@/hooks/auth/use-resend-otp';

export default function VerifyOtpForm() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [timer, setTimer] = useState(180); // 3 minutes

  // const verifyOtp = useVerifyOtp();
  // const resendOtp = useResendOtp();

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
    try {
      Keyboard.dismiss();

      // await verifyOtp.mutateAsync({
      //   email: email as string,
      //   token: data.otpCode,
      //   type: 'email',
      // });

      // Navigate to complete profile or home
      // router.replace('/(protected)/complete-profile');
    } catch (err: any) {
      setError('otpCode', {
        message: err?.message || 'OTP verification failed',
      });
    }
  };

  const handleResend = async () => {
    try {
      // await resendOtp.mutateAsync(email as string);
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
          isDisabled={!isValid || timer === 0}
          className="w-full"
          size="lg"
        >
          {timer === 0 ? (
            <Spinner size="sm" className="text-primary-foreground" />
          ) : (
            <Button.Label>Verify</Button.Label>
          )}
        </Button>

        <Button
          onPress={handleResend}
          variant='tertiary'
          isDisabled={timer > 0}
          className="w-full border-white/30"
          size="lg"
        >
          {timer > 0 ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <Button.Label className="text-white">Resend code</Button.Label>
          )}
        </Button>
      </View>
    </View>
  );
}
