import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Skeleton } from 'heroui-native';
import { SectionHeader } from '@/components/ui/section-header';
import { ProjectCard } from '../cards/project-card';
import { useActiveProjects } from '@/hooks/home/use-active-projects';

export function ActiveProjectsSection() {
  const { data, isLoading } = useActiveProjects(5);

  if (isLoading) {
    return (
      <View className="px-4">
        <View className="rounded-xl bg-background p-4" style={styles.container}>
          <SectionHeader title="ACTIVE PROJECTS" showViewAll={false} />
          <View className="mt-4 gap-4">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-6 w-full rounded" />
          </View>
        </View>
      </View>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <View className="px-4">
      <View className="rounded-xl bg-background pb-6 pt-4 px-4" style={styles.container}>
        <SectionHeader
          title="ACTIVE PROJECTS"
          showViewAll={false}
        />
        <View className="mt-4 gap-4">
          {data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
