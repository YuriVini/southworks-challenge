import {
  Post,
  prefetchPost,
  prefetchPostComments,
  usePosts,
} from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { useNavigation } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import { PostItem } from '../components/post-item'
import { HomeRoutes, HomeStackNavigation } from '../types'

export const Home = () => {
  const navigation = useNavigation<HomeStackNavigation>()
  const queryClient = useQueryClient()

  const { data: posts, refetch: refetchPosts, isLoading, error } = usePosts()

  const handlePostPress = useCallback(
    async (postId: number) => {
      await Promise.all([
        prefetchPost(queryClient, postId),
        prefetchPostComments(queryClient, postId),
      ])
      navigation.navigate(HomeRoutes.POST_DETAILS, { postId })
    },
    [queryClient, navigation]
  )

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <PostItem key={item.id} item={item} onPress={handlePostPress} />
    ),
    [handlePostPress]
  )

  const keyExtractor = useCallback((item: Post) => item.id.toString(), [])

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={isLoading} onRefresh={refetchPosts} />,
    [isLoading, refetchPosts]
  )

  const itemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator} />,
    []
  )

  if (isLoading) return <ActivityIndicator />

  if (error) return <ThemedText>Error: {error.message}</ThemedText>

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={itemSeparatorComponent}
        refreshControl={refreshControl}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 16,
    backgroundColor: '#E0E0E0',
  },
})
