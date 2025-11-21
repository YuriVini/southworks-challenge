# Southworks Challenge - Posts Feed App

A React Native mobile application built with Expo that displays a feed of posts with detailed views and comments. The app demonstrates modern React Native patterns including data fetching, caching, performance optimization, and navigation.

## Features

- 📱 **Posts Feed**: Browse a list of posts with pull-to-refresh functionality
- 📄 **Post Details**: View detailed post information with user information
- 💬 **Comments**: View and toggle comments for each post
- ⚡ **Performance Optimized**: Memoized components and optimized FlatList rendering
- 🔄 **Smart Caching**: Intelligent cache management with prefetching
- 🎨 **Modern UI**: Clean, themed interface with proper navigation

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Native Stack)
- **Data Fetching**: TanStack React Query (v5)
- **Language**: TypeScript
- **State Management**: React Query for server state

## Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or bun package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (for macOS) or Android Emulator
- Or Expo Go app on your physical device

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd southworks-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

## Running the App

### Start the development server

```bash
npm start
# or
yarn start
# or
bun start
```

This will start the Expo development server and display a QR code.

### Run on different platforms

**iOS Simulator (macOS only):**

```bash
npm run ios
# or press 'i' in the Expo CLI
```

**Android Emulator:**

```bash
npm run android
# or press 'a' in the Expo CLI
```

**Physical Device:**

1. Install the Expo Go app from the App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

## Testing the App

### Manual Testing Steps

1. **Posts Feed Screen:**
   - Verify posts are loaded and displayed
   - Test pull-to-refresh functionality
   - Tap on a post to navigate to details

2. **Post Details Screen:**
   - Verify post content is displayed correctly
   - Check user information display
   - Test comments loading
   - Toggle comments visibility (if implemented)

3. **Performance Testing:**
   - Scroll through the posts list rapidly
   - Navigate between posts quickly
   - Test with slow network connection (use network throttling in dev tools)

4. **Cache Testing:**
   - Navigate to a post, go back, and navigate to the same post again
   - Verify instant loading (data should be cached)
   - Test offline behavior (disable network after initial load)

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

The test suite includes:

- **Home Screen Tests**: Loading states, error handling, posts rendering, empty states
- **Post Details Screen Tests**: Post loading, comment loading, data display, edge cases

### Linting

Run the linter to check code quality:

```bash
npm run lint
```

## Project Structure

```text
src/
├── App.tsx                 # Root component with QueryClient setup
├── components/
│   ├── ui/
│   │   ├── icon-symbol.tsx       # Icon component
│   │   └── icon-symbol.ios.tsx  # iOS-specific icon component
│   ├── haptic-tab.tsx      # Haptic feedback tab component
│   ├── themed-text.tsx    # Themed text component
│   └── themed-view.tsx    # Themed view component
├── constants/
│   └── theme.ts           # Theme configuration
├── hooks/
│   ├── use-color-scheme.ts  # Color scheme hook
│   └── use-theme-color.ts   # Theme color hook
├── modules/
│   └── home/
│       ├── components/
│       │   ├── comment-item.tsx  # Comment list item component
│       │   └── post-item.tsx     # Post list item component
│       ├── index.routes.tsx      # Navigation setup
│       ├── types.ts              # TypeScript types
│       └── views/
│           ├── home.tsx          # Posts feed screen
│           └── post-details.tsx  # Post details screen
├── navigation/
│   ├── consts.ts          # Navigation constants
│   ├── index.tsx          # Navigation container
│   └── root-navigation.ts # Root navigation configuration
└── services/
    ├── config.ts          # API configuration and cache constants
    └── posts.ts           # Data fetching hooks and types
```

## API

The app uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com) for demo data:

- Posts: `GET /posts`
- Post by ID: `GET /posts/:id`
- Comments: `GET /posts/:id/comments`

## Development Notes

- The app uses TanStack React Query for data fetching and caching
- Cache time is set to 5 minutes (configurable in `src/services/config.ts`)
- Posts list has extended cache time (10 minutes) as it changes less frequently
- Prefetching is implemented for smooth navigation experience
- All FlatList components are optimized for performance

## Troubleshooting

**Metro bundler issues:**

```bash
npm start -- --reset-cache
```

**iOS Simulator not opening:**

- Ensure Xcode is installed (macOS only)
- Run `xcode-select --install` if needed

**Android Emulator not found:**

- Ensure Android Studio is installed
- Start an emulator from Android Studio first

**Port already in use:**

- Change the port: `npm start -- --port 8082`

## License

This project is part of a coding challenge.
