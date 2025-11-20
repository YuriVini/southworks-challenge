import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import {
  Post,
  prefetchPost,
  prefetchPostComments,
  usePosts,
} from '@/src/services/posts'
import { useNavigation } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import {
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated'
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
    ({ item, index }) => (
      <Animated.View entering={SlideInLeft.delay(index * 50).duration(800)}>
        <PostItem key={item.id} item={item} onPress={handlePostPress} />
      </Animated.View>
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

  if (isLoading)
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator />
      </ThemedView>
    )

  if (error) return <ThemedText>Error: {error.message}</ThemedText>

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        data={posts}
        entering={FadeIn}
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
