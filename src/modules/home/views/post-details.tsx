import {
  Comment,
  usePostById,
  usePostComments,
} from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { CommentItem } from '../components/comment-item'

export const PostDetails = () => {
  const route = useRoute()
  const { postId } = route.params as { postId: number }

  const { data: post, isLoading: isLoadingPost } = usePostById(postId)
  const { data: comments, isLoading: isLoadingComments } =
    usePostComments(postId)

  const renderItem: ListRenderItem<Comment> = useCallback(
    ({ item }) => <CommentItem key={item.id} item={item} />,
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

  const commentsCount = comments?.length || 0

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.postSection}>
          <View style={styles.postHeader}>
            <View style={styles.userIconContainer}>
              <Ionicons name='person' size={24} color='#007AFF' />
            </View>
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>
                User {post.userId}
              </ThemedText>
              <ThemedText style={styles.timeAgo}>2 hours ago</ThemedText>
            </View>
          </View>

          <View style={styles.postContent}>
            <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
            <ThemedText style={styles.postBody}>{post.body}</ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.commentCountContainer}>
            <Ionicons name='chatbubble-outline' size={16} color='#666' />
            <ThemedText style={styles.commentCountText}>
              {commentsCount} comments
            </ThemedText>
          </View>
        </View>

        <View>
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
        </View>
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
    backgroundColor: '#FFFFFF',
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
    color: '#999',
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
    color: '#333',
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
    color: '#666',
  },
  loader: {
    marginVertical: 20,
  },
})
