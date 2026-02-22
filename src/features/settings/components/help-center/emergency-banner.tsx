import { View, Text, Linking } from 'react-native';
import { Button, Surface } from 'heroui-native';
import { ShieldAlert, Phone } from 'lucide-react-native';

export function EmergencyBanner() {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:+233243178396');
  };

  const handleCampusSecurity = () => {
    Linking.openURL('tel:+233243178396');
  };

  return (
    <View className="px-4">
      <Surface className="overflow-hidden rounded-xl border border-danger/20 bg-danger/5 p-4">
        <View className="flex-row items-center gap-3">
          <View className="size-10 items-center justify-center rounded-full bg-danger/10">
            <ShieldAlert size={20} color="#EF4444" />
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-[15px] font-semibold text-foreground">
              Emergency?
            </Text>
            <Text className="text-xs text-muted">
              For urgent safety concerns, contact security immediately
            </Text>
          </View>
        </View>
        <View className="mt-3 flex-row gap-2">
          <Button
            variant="danger"
            size="sm"
            className=""
            onPress={handleEmergencyCall}
          >
              <Phone size={14} color="#FFF" />
            <Button.Label>Emergency</Button.Label>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-accent/10"
            onPress={handleCampusSecurity}
          >
              <Phone size={14} color="#3B82F6" />
            <Button.Label className="text-accent">Campus Security</Button.Label>
          </Button>
        </View>
      </Surface>
    </View>
  );
}
