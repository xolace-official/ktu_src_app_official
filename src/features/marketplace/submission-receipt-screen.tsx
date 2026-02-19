import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Chip, Separator } from 'heroui-native';
import { CheckCircle, Copy } from 'lucide-react-native';
import { Pressable, ScrollView, Share, View } from 'react-native';

type ReceiptParams = {
  reference_code: string;
  title: string;
  price: string;
  placement_type: string;
  fee_amount: string;
  currency: string;
};

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-1.5">
      <ThemedText themeColor="textSecondary" className="text-sm">
        {label}
      </ThemedText>
      <ThemedText className="text-sm font-medium">{value}</ThemedText>
    </View>
  );
}

/**
 * Displays a submission receipt after a student lists a product.
 *
 * Shows the submission reference number, product details, listing fee breakdown,
 * current approval status, and a placeholder payment section (coming soon).
 */
export default function SubmissionReceiptScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<ReceiptParams>();

  const { reference_code, title, price, placement_type, fee_amount, currency } = params;

  const referenceCode = reference_code ?? '--------';
  const productPrice = parseFloat(price ?? '0');
  const feeAmount = parseFloat(fee_amount ?? '0');
  const isFeatured = placement_type === 'featured';
  const submittedAt = new Date().toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  async function copyReference() {
    await Share.share({ message: `KTU Marketplace Submission Ref: #${referenceCode}` });
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Success Header */}
      <View className="mb-6 items-center pt-4">
        <View
          className="mb-4 items-center justify-center rounded-full"
          style={{ width: 72, height: 72, backgroundColor: '#22c55e1a' }}
        >
          <CheckCircle size={40} color="#22c55e" />
        </View>
        <ThemedText className="mb-1 text-2xl font-bold">Submission Received!</ThemedText>
        <ThemedText themeColor="textSecondary" className="text-center text-sm">
          Your product is under review. You will be notified once approved.
        </ThemedText>
      </View>

      {/* Reference Card */}
      <View
        className="mb-4 overflow-hidden rounded-2xl bg-surface p-4"
        style={{ borderCurve: 'continuous' }}
      >
        <ThemedText themeColor="textSecondary" className="mb-1 text-xs uppercase tracking-wider">
          Reference Number
        </ThemedText>
        <View className="flex-row items-center justify-between">
          <ThemedText className="font-mono text-2xl font-bold tracking-widest" selectable>
            #{referenceCode}
          </ThemedText>
          <Pressable
            onPress={copyReference}
            className="flex-row items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2"
          >
            <Copy size={14} color={theme.accent} />
            <ThemedText className="text-xs font-medium text-accent">Share</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Product Details */}
      <View
        className="mb-4 overflow-hidden rounded-2xl bg-surface p-4"
        style={{ borderCurve: 'continuous' }}
      >
        <ThemedText className="mb-3 font-semibold">Product Details</ThemedText>
        <ReceiptRow label="Product" value={title ?? ''} />
        <ReceiptRow label="Price" value={`GH₵ ${productPrice.toFixed(2)}`} />
        <ReceiptRow label="Placement" value={isFeatured ? '⭐ Featured' : 'Normal'} />
        <ReceiptRow label="Submitted" value={submittedAt} />
      </View>

      {/* Fee Breakdown */}
      <View
        className="mb-4 overflow-hidden rounded-2xl bg-surface p-4"
        style={{ borderCurve: 'continuous' }}
      >
        <ThemedText className="mb-3 font-semibold">Fee Breakdown</ThemedText>
        <ReceiptRow
          label={`${isFeatured ? 'Featured' : 'Standard'} listing fee`}
          value={`${currency} ${feeAmount.toFixed(2)}`}
        />
        <Separator className="my-2" />
        <View className="flex-row items-center justify-between py-1">
          <ThemedText className="font-semibold">Total Due</ThemedText>
          <ThemedText className="font-bold text-accent">
            {currency} {feeAmount.toFixed(2)}
          </ThemedText>
        </View>
      </View>

      {/* Status */}
      <View className="mb-4 flex-row items-center justify-between rounded-2xl bg-surface p-4"
        style={{ borderCurve: 'continuous' }}
      >
        <ThemedText className="font-medium">Approval Status</ThemedText>
        <Chip color="warning" variant="soft" size="sm">
          <Chip.Label>Pending Approval</Chip.Label>
        </Chip>
      </View>

      {/* Payment Section */}
      <View
        className="mb-8 overflow-hidden rounded-2xl bg-surface p-4"
        style={{
          borderCurve: 'continuous',
          borderWidth: 1.5,
          borderStyle: 'dashed',
          borderColor: theme.cardBorder,
        }}
      >
        <ThemedText className="mb-1 font-semibold">Payment</ThemedText>
        <ThemedText themeColor="textSecondary" className="mb-4 text-sm">
          Secure in-app payment is coming soon. Your submission is reserved and will be processed once payment is available.
        </ThemedText>
        <Button isDisabled className="w-full" variant="tertiary" size="md">
          <Button.Label>Pay Now (Coming Soon)</Button.Label>
        </Button>
      </View>

      {/* Action */}
      <Button
        onPress={() => router.replace('/marketplace-screen')}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <Button.Label>Back to Marketplace</Button.Label>
      </Button>
    </ScrollView>
  );
}
