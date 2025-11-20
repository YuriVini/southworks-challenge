import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { Comment } from '@/src/services/posts'
import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { StyleSheet } from 'react-native'

export const CommentItem = memo(({ item }: { item: Comment }) => {
  const cardBackgroundColor = useThemeColor(
    { light: undefined, dark: undefined },
    'cardBackground'
  )
  const borderColor = useThemeColor(
    { light: undefined, dark: undefined },
    'divider'
  )

  return (
    <ThemedView
      style={[
        styles.commentCard,
        { backgroundColor: cardBackgroundColor, borderColor: borderColor },
      ]}
    >
      <ThemedView style={styles.commentHeader}>
        <ThemedView style={styles.commentIconContainer}>
          <Ionicons name='mail' size={20} color='#9B59B6' />
        </ThemedView>
        <ThemedView style={styles.commentInfo}>
          <ThemedText style={styles.commentName}>{item.name}</ThemedText>
          <ThemedText style={styles.commentEmail}>{item.email}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedText style={styles.commentBody}>{item.body}</ThemedText>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  commentCard: {
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
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentEmail: {
    fontSize: 12,
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 44,
  },
})

CommentItem.displayName = 'CommentItem'
