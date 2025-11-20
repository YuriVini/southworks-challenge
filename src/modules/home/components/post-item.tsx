import { HapticTab } from '@/src/components/haptic-tab'
import { Post } from '@/src/components/services/posts'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { IconSymbol } from '@/src/components/ui/icon-symbol.ios'
import { memo } from 'react'
import { StyleSheet } from 'react-native'

export const PostItem = memo(
  ({ item, onPress }: { item: Post; onPress: (postId: number) => void }) => {
    const handlePress = () => {
      onPress(item.id)
    }

    return (
      <HapticTab onPress={handlePress}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>{item?.title}</ThemedText>
          <IconSymbol name='chevron.forward' size={16} color='#007AFF' />
        </ThemedView>
        <ThemedText numberOfLines={2} ellipsizeMode='tail' style={styles.body}>
          {item?.body}
        </ThemedText>
      </HapticTab>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '85%',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
  },
})

PostItem.displayName = 'PostItem'
