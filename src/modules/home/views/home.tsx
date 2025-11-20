import { HapticTab } from '@/src/components/haptic-tab'
import { Post, usePosts } from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'

export const Home = () => {
  const { data: posts, refetch: refetchPosts, isLoading, error } = usePosts()

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <HapticTab>
        <ThemedView>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>
            {item?.title}
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>{item?.body}</ThemedText>
        </ThemedView>
      </HapticTab>
    )
  }

  if (isLoading) return <ActivityIndicator />

  if (error) return <ThemedText>Error: {error.message}</ThemedText>

  return (
    <ThemedView style={{ flex: 1, paddingTop: 16 }}>
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchPosts} />
        }
        renderItem={renderItem}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      />
    </ThemedView>
  )
}
