import { useRef, useMemo } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { TextField, Select, Button, Spinner, Label, Input, FieldError, ControlField } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  CompleteProfileSchema,
  LEVEL_OPTIONS,
  type CompleteProfileFormType,
} from '@/lib/schemas/profile';
import { useFaculties } from '@/hooks/profile/use-faculties';
import { useDepartments } from '@/hooks/profile/use-departments';
import { usePrograms } from '@/hooks/profile/use-programs';
import { AnimatedSelectTrigger } from '@/components/ui/animated-select-trigger';

// SelectOption type as defined by HeroUI Native
type SelectOption = {
  value: string;
  label: string;
};

// Helper to convert API data to SelectOption format
function toSelectOption(id: string | number, name: string): SelectOption {
  return { value: String(id), label: name };
}

// Helper to find SelectOption from ID
function findSelectOption(
  options: SelectOption[] | undefined,
  id: string
): SelectOption | undefined {
  return options?.find((opt) => opt.value === id);
}

interface CompleteProfileFormProps {
  onSubmit: (data: CompleteProfileFormType) => void;
  isSubmitting: boolean;
}

export default function CompleteProfileForm({ onSubmit, isSubmitting }: CompleteProfileFormProps) {
  const indexNumberRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CompleteProfileFormType>({
    resolver: zodResolver(CompleteProfileSchema),
    defaultValues: {
      fullName: '',
      indexNumber: '',
      phoneNumber: '',
      faculty: '',
      department: '',
      program: '',
      level: '',
    },
    mode: 'onChange',
  });

  const selectedFaculty = watch('faculty');
  const selectedDepartment = watch('department');

  const { data: faculties, isLoading: isLoadingFaculties } = useFaculties();
  const { data: departments, isLoading: isLoadingDepartments } = useDepartments(selectedFaculty);
  const { data: programs, isLoading: isLoadingPrograms } = usePrograms(selectedDepartment);

  // Convert API data to SelectOption arrays
  const facultyOptions = useMemo(
    () => faculties?.map((f) => toSelectOption(f.id, f.name)),
    [faculties]
  );

  const departmentOptions = useMemo(
    () => departments?.map((d) => toSelectOption(d.id, d.name)),
    [departments]
  );

  const programOptions = useMemo(
    () => programs?.map((p) => toSelectOption(p.id, p.name)),
    [programs]
  );

  const levelOptions = useMemo(
    () => LEVEL_OPTIONS.map((l) => toSelectOption(l.value, l.label)),
    []
  );

  const handleFacultyChange = (option: SelectOption | undefined) => {
    setValue('faculty', option?.value ?? '');
    setValue('department', '');
    setValue('program', '');
  };

  const handleDepartmentChange = (option: SelectOption | undefined) => {
    setValue('department', option?.value ?? '');
    setValue('program', '');
  };

  return (
    <View>
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground">Complete Your Profile</Text>
          <Text className="mt-2 text-base text-foreground">
            Please fill in your student details to finish registration.
          </Text>
        </View>

        {/* Form Fields */}
        <View className="gap-5">
          {/* Full Name */}
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.fullName} isRequired>
                <Label>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  textContentType="name"
                  autoComplete="name"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => indexNumberRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.fullName && (
                  <FieldError>{errors.fullName.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Index Number */}
          <Controller
            control={control}
            name="indexNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.indexNumber} isRequired>
                <Label>Index Number</Label>
                <Input
                  ref={indexNumberRef}
                  placeholder="B202210330"
                  value={value}
                  onChangeText={(text) => onChange(text.toUpperCase())}
                  onBlur={onBlur}
                  autoCapitalize="characters"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneNumberRef.current?.focus()}
                />
                {errors.indexNumber && (
                  <FieldError>{errors.indexNumber.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.phoneNumber} isRequired>
                <Label>Phone Number</Label>
                <Input
                  ref={phoneNumberRef}
                  placeholder="0241234567"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {errors.phoneNumber && (
                  <FieldError>{errors.phoneNumber.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Faculty Select */}
          <Controller
            control={control}
            name="faculty"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Faculty <Text className="text-danger">*</Text>
                </Text>
                <Select
                  value={findSelectOption(facultyOptions, value)}
                  onValueChange={handleFacultyChange}
                  isDisabled={isLoadingFaculties}
                  presentation='bottom-sheet'
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder="Select your faculty"
                      isInvalid={!!errors.faculty}
                      isDisabled={isLoadingFaculties}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {facultyOptions?.map((option) => (
                        <Select.Item key={option.value} value={option.value} label={option.label} />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.faculty && (
                  <Text className="text-sm text-danger">{errors.faculty.message}</Text>
                )}
              </View>
            )}
          />

          {/* Department Select */}
          <Controller
            control={control}
            name="department"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Department <Text className="text-danger">*</Text>
                </Text>
                <Select
                  value={findSelectOption(departmentOptions, value)}
                  onValueChange={handleDepartmentChange}
                  isDisabled={!selectedFaculty || isLoadingDepartments}
                  presentation='bottom-sheet'
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder={
                        !selectedFaculty ? 'Select a faculty first' : 'Select your department'
                      }
                      isInvalid={!!errors.department}
                      isDisabled={!selectedFaculty || isLoadingDepartments}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {departmentOptions?.map((option) => (
                        <Select.Item key={option.value} value={option.value} label={option.label} />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.department && (
                  <Text className="text-sm text-danger">{errors.department.message}</Text>
                )}
              </View>
            )}
          />

          {/* Program Select */}
          <Controller
            control={control}
            name="program"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Program of Study <Text className="text-danger">*</Text>
                </Text>
                <Select
                  value={findSelectOption(programOptions, value)}
                  onValueChange={(option) => setValue('program', option?.value ?? '')}
                  isDisabled={!selectedDepartment || isLoadingPrograms}
                  presentation='bottom-sheet'
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder={
                        !selectedDepartment ? 'Select a department first' : 'Select your program'
                      }
                      isInvalid={!!errors.program}
                      isDisabled={!selectedDepartment || isLoadingPrograms}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {programOptions?.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.program && (
                  <Text className="text-sm text-danger">{errors.program.message}</Text>
                )}
              </View>
            )}
          />

          {/* Level Select */}
          <Controller
            control={control}
            name="level"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Level <Text className="text-danger">*</Text>
                </Text>
                <Select
                  value={findSelectOption(levelOptions, value)}
                  onValueChange={(option) => setValue('level', option?.value ?? '')}
                  presentation='bottom-sheet'
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder="Select your level"
                      isInvalid={!!errors.level}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {levelOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value} label={option.label} />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.level && (
                  <Text className="text-sm text-danger">{errors.level.message}</Text>
                )}
              </View>
            )}
          />
        </View>

        {/* Submit Button */}
        <View className="pb-6 pt-8">
          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid || isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <Spinner size="sm" className="text-primary-foreground" />
            ) : (
              <Button.Label>Continue</Button.Label>
            )}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
