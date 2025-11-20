# Technical Implementation Report

• **Data Layer - TanStack React Query (v5)**: Chosen for robust server state management, built-in caching, background refetching, and excellent TypeScript support. Eliminates manual loading/error states and provides automatic cache invalidation, ideal for a data-driven feed application.

• **Retry & Backoff**: Set `retry: 1` in QueryClient defaults - single retry balances UX with network efficiency. Relied on React Query's default exponential backoff (1s, 2s, 4s) rather than custom implementation, sufficient for this use case.

• **Cache Strategy - Stale Time**: 5 minutes for posts/comments (data considered fresh), 10 minutes for posts list (changes less frequently). Prevents unnecessary refetches while ensuring reasonable data freshness for a social feed.

• **Cache Strategy - Garbage Collection**: 10 minutes (2x staleTime) - unused cached data persists before GC, allowing instant navigation when returning to previously viewed posts without additional API calls.

• **Performance - FlatList Props**: Configured `maxToRenderPerBatch: 10`, `initialNumToRender: 10`, `windowSize: 10`, and `updateCellsBatchingPeriod: 50ms` to optimize rendering performance and memory usage for long lists.

• **Performance - Memoization**: Used `React.memo` for `PostItem` and `CommentItem` components, plus `useCallback` for `renderItem` and `keyExtractor` functions. Prevents unnecessary re-renders when parent components update, significantly improving scroll performance.

• **Performance - Prefetching**: Implemented parallel prefetching of post details and comments on press, making navigation feel instant by warming the cache before user navigates to detail screen.

• **AI Tool**: Cursor IDE with AI code completion and chat assistance used throughout development. And the Figma Maker to create a simple design.

• **AI Prompts**: "create a simple design" (home and post-details screen)

• **AI Usage - Kept vs Changed**: Kept core architecture (React Query, component structure), all performance optimizations, cache strategy, and prefetching logic. Changed/refactored: centralized cache constants in config, improved TypeScript types, added display names for linting compliance, adjusted code formatting.
