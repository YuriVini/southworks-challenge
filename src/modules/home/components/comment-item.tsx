import { Comment } from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

export const CommentItem = memo(({ item }: { item: Comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={styles.commentIconContainer}>
          <Ionicons name='mail' size={20} color='#9B59B6' />
        </View>
        <View style={styles.commentInfo}>
          <ThemedText style={styles.commentName}>{item.name}</ThemedText>
          <ThemedText style={styles.commentEmail}>{item.email}</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.commentBody}>{item.body}</ThemedText>
    </View>
  )
})
CommentItem.displayName = 'CommentItem'

const styles = StyleSheet.create({
  commentCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentInfo: {
    flex: 1,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentEmail: {
    fontSize: 12,
    color: '#666',
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginLeft: 44,
  },
})
