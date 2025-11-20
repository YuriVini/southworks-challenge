import { HapticTab } from '@/src/components/haptic-tab'
import { Post } from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { memo, useCallback } from 'react'

export const PostItem = memo(
  ({ item, onPress }: { item: Post; onPress: (postId: number) => void }) => {
    const handlePress = useCallback(() => {
      onPress(item.id)
    }, [item.id, onPress])

    return (
      <HapticTab onPress={handlePress}>
        <ThemedView>
          <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>
            {item?.title}
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>{item?.body}</ThemedText>
        </ThemedView>
      </HapticTab>
    )
  }
)

PostItem.displayName = 'PostItem'
