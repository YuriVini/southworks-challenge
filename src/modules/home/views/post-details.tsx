import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { Comment, usePostById, usePostComments } from '@/src/services/posts'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Animated, { SlideInRight } from 'react-native-reanimated'
import { CommentItem } from '../components/comment-item'

export const PostDetails = () => {
  const iconColor = useThemeColor({ light: undefined, dark: undefined }, 'icon')
  const dividerColor = useThemeColor(
    { light: undefined, dark: undefined },
    'divider'
  )
  const route = useRoute()
  const { postId } = route.params as { postId: number }

  const { data: post, isLoading: isLoadingPost } = usePostById(postId)
  const { data: comments, isLoading: isLoadingComments } =
    usePostComments(postId)

  const renderItem: ListRenderItem<Comment> = useCallback(
    ({ item, index }) => (
      <Animated.View entering={SlideInRight.delay(index * 50).duration(800)}>
        <CommentItem key={item.id} item={item} />
      </Animated.View>
    ),
    []
  )

  const keyExtractor = useCallback((item: Comment) => item.id.toString(), [])

  if (isLoadingPost) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size='large' />
      </ThemedView>
    )
  }

  if (!post) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Post not found</ThemedText>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.postSection}>
          <ThemedView style={styles.postHeader}>
            <ThemedView style={styles.userIconContainer}>
              <Ionicons name='person' size={24} color='#007AFF' />
            </ThemedView>
            <ThemedView style={styles.userInfo}>
              <ThemedText style={styles.userName}>
                User {post.userId}
              </ThemedText>
              <ThemedText style={styles.timeAgo}>2 hours ago</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.postContent}>
            <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
            <ThemedText style={styles.postBody}>{post.body}</ThemedText>
          </ThemedView>

          <ThemedView
            style={[styles.divider, { backgroundColor: dividerColor }]}
          />

          <ThemedView style={styles.commentCountContainer}>
            <Ionicons name='chatbubble-outline' size={16} color={iconColor} />
            <ThemedText style={styles.commentCountText}>
              {comments?.length || 0} comments
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView>
          {isLoadingComments ? (
            <ActivityIndicator size='small' style={styles.loader} />
          ) : (
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              scrollEnabled={false}
              nestedScrollEnabled={true}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={50}
              initialNumToRender={5}
              windowSize={5}
            />
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  postSection: {
    borderRadius: 8,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeAgo: {
    fontSize: 12,
  },
  postContent: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  commentCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentCountText: {
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
  },
})
