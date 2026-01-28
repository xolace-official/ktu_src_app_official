import { memo } from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { GradientProgress } from '@/components/ui/gradient-progress';
import type { Project } from '@/types/home';

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  const { title, progress, gradientColors } = project;

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <ThemedText className="text-sm font-medium">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {progress}%
        </ThemedText>
      </View>
      <GradientProgress progress={progress} gradientColors={gradientColors} />
    </View>
  );
});
