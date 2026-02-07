# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KTU SRC App - An Expo universal app (iOS, Android, Web) using React Native with file-based routing.
An App for the students of Koforidua Technical University.

## Commands

```bash
# Development
bun start              # Start Expo dev server
bun run ios            # Run on iOS (requires native build)
bun run android        # Run on Android (requires native build)
bun run web            # Start web version

# Code quality
bun run lint           # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Expo v55 (preview) with Expo Router v55 (beta) for file-based routing
- **React**: React 19 with React Compiler enabled
- **Styling**: Tailwind CSS v4 + Uniwind for universal styling, HeroUI Native components
- **UI Components**: Use HeroUI Native documentation from https://v3.heroui.com/native/llms.txt
- **State**: Zustand (client state), React Query (server state)
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase

Auth flow uses `Stack.Protected` guards - routes render based on `isAuthenticated` state.

### State Management
- **Zustand** (`store/store.ts`): Single store with slices for auth, theme, profile draft, preferences
- **React Query**: Server state, caching, mutations
- Auth state is NOT persisted; only theme and toggles are persisted via AsyncStorage

### Project Structure
```
src/
├── app/           # Expo Router file-based routes (_layout.tsx defines navigation)
├── components/    # Reusable UI components (platform variants use .native/.web/.ios extensions)
├── hooks/         # Custom React hooks
├── providers/     # Context providers (root-provider.tsx wraps app)
├── constants/     # Theme colors, fonts, spacing
└── global.css     # Tailwind + Uniwind + HeroUI imports
```

### Key Patterns

**Routing**: Routes defined by file structure in `src/app/`. Layout files (`_layout.tsx`) define navigation hierarchy.

**Theming**: Uses `@react-navigation/native` ThemeProvider with automatic dark/light mode via `useColorScheme()`. use uniwind/heroui-native theming - [llms.txt](https://docs.uniwind.dev/llms.txt) .

**Styling**: Three layers work together:
1. Tailwind/Uniwind utility classes in JSX (`className="flex-1 justify-center"`)
2. React Native `StyleSheet.create()` for performance-critical styles
3. Centralized theme constants for colors/spacing

**Platform-specific code**: Use file extensions for platform variants:
- `.native.tsx` - iOS and Android
- `.web.tsx` - Web only
- `.ios.tsx` - iOS only

**Provider hierarchy**: `RootProvider` wraps the app with GestureHandlerRootView > ThemeProvider > HeroUINativeProvider.

### Path Aliases
- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Configuration

- **TypeScript**: Strict mode enabled
- **Typed routes**: Enabled in app.json (`experiments.typedRoutes`)
- **Metro**: Configured with Uniwind CSS support (metro.config.js)
- **CSS entry**: `src/global.css` - imported in root layout
