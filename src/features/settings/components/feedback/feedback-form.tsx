import { useState, useCallback } from 'react';
import { View, Text, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {
  TextArea,
  TextField,
  Label,
  Description,
  FieldError,
  Switch,
  Button,
  Surface,
  Spinner,
  Dialog,
  useToast,
} from 'heroui-native';
import { Eye, EyeOff, Send, CheckCircle } from 'lucide-react-native';
import { FeedbackTypeSelector } from './feedback-type-selector';
import { FeedbackCategoryPicker } from './feedback-category-picker';
import { SatisfactionRating } from './satisfaction-rating';
import type { FeedbackCategory } from './feedback-data';
import { useTheme } from '@/hooks/use-theme';

const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 10;

export function FeedbackForm() {
  const theme = useTheme();
  const { toast } = useToast();

  // Form state
  const [feedbackType, setFeedbackType] = useState<string | null>(null);
  const [category, setCategory] = useState<FeedbackCategory | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const characterCount = message.length;
  const isOverLimit = characterCount > MAX_MESSAGE_LENGTH;
  const isUnderLimit = characterCount > 0 && characterCount < MIN_MESSAGE_LENGTH;

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!message.trim()) {
      newErrors.message = 'Please enter your feedback message';
    } else if (message.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [feedbackType, category, message]);

  const resetForm = useCallback(() => {
    setFeedbackType(null);
    setCategory(null);
    setRating(null);
    setMessage('');
    setIsAnonymous(false);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      toast.show({
        variant: 'danger',
        label: 'Missing Information',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccessDialog(true);
  }, [validateForm, toast]);

  const handleSuccessClose = useCallback(() => {
    setShowSuccessDialog(false);
    resetForm();
  }, [resetForm]);

  const isFormValid =
    feedbackType &&
    category &&
    message.trim().length >= MIN_MESSAGE_LENGTH &&
    message.length <= MAX_MESSAGE_LENGTH;

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="gap-6">
          {/* Feedback Type Selection */}
          <FeedbackTypeSelector
            selectedType={feedbackType}
            onSelectType={(type) => {
              setFeedbackType(type);
              if (errors.feedbackType) {
                setErrors((prev) => ({ ...prev, feedbackType: '' }));
              }
            }}
          />
          {errors.feedbackType && (
            <Text className="-mt-4 text-xs text-danger">{errors.feedbackType}</Text>
          )}

          {/* Category Picker */}
          <FeedbackCategoryPicker
            selectedCategory={category}
            onSelectCategory={(cat) => {
              setCategory(cat);
              if (errors.category) {
                setErrors((prev) => ({ ...prev, category: '' }));
              }
            }}
            isInvalid={!!errors.category}
          />
          {errors.category && (
            <Text className="-mt-4 text-xs text-danger">{errors.category}</Text>
          )}

          {/* Satisfaction Rating */}
          <SatisfactionRating
            selectedRating={rating}
            onSelectRating={setRating}
          />

          {/* Message TextField */}
          <TextField
            isInvalid={!!errors.message || isOverLimit}
          >
            <Label>Your Feedback</Label>
            <TextArea
              placeholder="Tell us what's on your mind... Be as detailed as possible to help us understand your feedback better."
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: '' }));
                }
              }}
              variant="secondary"
              className="min-h-[120px]"
            />
            <View className="flex-row items-center justify-between">
              {errors.message ? (
                <FieldError>{errors.message}</FieldError>
              ) : (
                <Description>
                  Share your thoughts, ideas, or concerns
                </Description>
              )}
              <Text
                className={`text-xs ${
                  isOverLimit
                    ? 'text-danger'
                    : isUnderLimit
                    ? 'text-warning'
                    : 'text-muted'
                }`}
              >
                {characterCount}/{MAX_MESSAGE_LENGTH}
              </Text>
            </View>
          </TextField>

          {/* Anonymous Toggle */}
          <Surface variant="secondary" className="rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center gap-3">
                <View className="size-10 items-center justify-center rounded-full bg-accent/10">
                  {isAnonymous ? (
                    <EyeOff size={20} color={theme.accent} />
                  ) : (
                    <Eye size={20} color={theme.accent} />
                  )}
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-[15px] font-medium text-foreground">
                    Submit Anonymously
                  </Text>
                  <Text className="text-xs text-muted">
                    {isAnonymous
                      ? 'Your identity will be hidden'
                      : 'Your name may be visible to SRC'}
                  </Text>
                </View>
              </View>
              <Switch
                isSelected={isAnonymous}
                onValueChange={setIsAnonymous}
              />
            </View>
          </Surface>

          {/* Submit Button */}
          <Button
            variant="primary"
            size="lg"
            onPress={handleSubmit}
            isDisabled={!isFormValid || isSubmitting}
            className="mt-2"
          >
            {isSubmitting ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Send size={18} color="#fff" />
            )}
            <Button.Label className="text-white">
              {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            </Button.Label>
          </Button>

          {/* Help Text */}
          <Text className="text-center text-xs text-muted">
            Your feedback helps us improve the KTU SRC App experience for all students
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* Success Dialog */}
      <Dialog isOpen={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <View className="items-center gap-4 py-2">
              <View className="size-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle size={32} color="#22C55E" />
              </View>
              <View className="items-center gap-1">
                <Dialog.Title className="text-center">
                  Thank You for Your Feedback!
                </Dialog.Title>
                <Dialog.Description className="text-center">
                  Your feedback has been received. The SRC team will review it and
                  take appropriate action.
                </Dialog.Description>
              </View>
              <Button
                variant="primary"
                className="w-full"
                onPress={handleSuccessClose}
              >
                <Button.Label>Done</Button.Label>
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
