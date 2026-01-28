import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import VerifyOtpForm from './verify-otp-form';

export function VerifyScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#043270]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 32, paddingTop: 64 }}
          keyboardShouldPersistTaps="handled"
        >
          <VerifyOtpForm />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
