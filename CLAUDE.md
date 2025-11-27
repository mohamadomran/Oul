# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## About Oul (قول)

Oul is an Android communication app designed for individuals with speech difficulties (post-stroke, ALS, etc.). It enables users to express needs through large, accessible buttons that play pre-recorded audio phrases.

**Target User:** Elderly individual recovering from speech loss
**Platform:** Android only (React Native 0.82.1)
**Voice:** Daniel (ElevenLabs) - 188 pre-recorded audio files
**Language:** Lebanese Arabic with English/French support

---

## Essential Commands

### Development
```bash
# Most common - clean start (recommended)
yarn fresh:android

# Standard development (2 terminals)
yarn start                  # Terminal 1: Metro bundler
yarn android                # Terminal 2: Run app

# Testing & linting
yarn test
yarn lint
```

### Troubleshooting
```bash
# Quick cache clean (~5s)
yarn clean:cache

# Full clean + reinstall (~3min)
yarn clean:all

# Nuclear option - complete reset (~4min)
yarn reset
```

### Production Build
```bash
cd android
./gradlew clean
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

**Important:** Release builds require the keystore at `android/app/oul-release.keystore` (password: `oul2024`). Never commit keystore to version control. See PRODUCTION_BUILD_INFO.md for full details.

---

## Architecture Overview

### Service Layer Pattern
The app uses a centralized service layer for all business logic:

**Core Services** (`src/services/`):
- `AudioService` - Manages audio playback with in-memory caching
- `SettingsService` - Persists user preferences to AsyncStorage
- `HapticService` - Provides haptic feedback for accessibility
- `ShareService` - Handles WhatsApp message sharing
- `StorageService` - Generic AsyncStorage wrapper

**Key Pattern:** Services are singleton classes that must be initialized before use. AudioService uses an in-memory cache (via `audioCacheUtils`) to avoid reloading audio files.

### Navigation Structure
React Navigation 7 with stack navigator (`src/navigation/RootNavigator.tsx`):

**Main Screens:**
- `HomeScreen` - 4 category tiles (Basic Needs, Pain Location, Emotions, Conversation)
- Category screens - Display phrase buttons that play audio on tap
- `CustomPhrasesScreen` - User can add custom phrases
- `SettingsScreen` - Font size, button size, haptic feedback, high contrast mode
- `FavoritesScreen` - Quick access to favorited phrases

**Navigation Flow:** Home → Category → Play Audio → Back to Category

### State Management
Uses Context API for global settings (`src/contexts/SettingsContext.tsx`):
- Wraps entire app in `SettingsProvider`
- Settings persist to AsyncStorage automatically
- Custom hooks: `useSettings()`, `useFontSize()`, `useButtonSize()`, etc.

### Audio System
**Critical Implementation Details:**
- All audio files are bundled in `android/app/src/main/assets/audio/`
- Audio paths use Unix-style forward slashes (see `audioPathUtils.ts`)
- `AudioService` uses in-memory cache to prevent reloading
- Pre-recorded phrases use `react-native-sound`
- Custom phrases would use `react-native-tts` (not yet implemented)

**Audio File Structure:**
```
assets/audio/
├── basic-needs/     # 16 phrases
├── pain-location/   # 22 phrases
├── emotions/        # 18 phrases
└── conversation/    # 42 phrases
```

### Data Layer
Static phrase data in `src/data/`:
- `basicNeedsData.ts` - 16 pre-recorded phrases
- `painLocationData.ts` - 22 body part phrases
- `emotionsData.ts` - 18 emotion phrases
- `conversationData.ts` - 42 conversation phrases

Each phrase object includes:
- `id`: Unique identifier
- `arabic`: Arabic text (Lebanese dialect)
- `english`: English translation
- `audioFile`: Path to pre-recorded audio
- `category`: Grouping identifier

### Component Architecture
**Reusable UI Components** (`src/components/ui/`):
- `BigButton` - Main category navigation buttons
- `PhraseButton` - Phrase buttons that play audio on tap
- `PainIntensitySelector` - Slider for pain level (used with pain location)
- `CustomPhraseModal` - Bottom sheet for adding custom phrases

**Accessibility Features:**
- Large touch targets (120x120px minimum)
- High contrast mode toggle
- Adjustable font sizes (small/medium/large)
- Adjustable button sizes
- Haptic feedback on interactions
- WCAG 2.1 AA compliance

---

## TypeScript Types

All types are centralized in `src/types/`:
- `phrase.types.ts` - Phrase data structures
- `navigation.types.ts` - React Navigation stack params
- `settings.types.ts` - User settings interface
- `service.types.ts` - Service interfaces
- `ui.types.ts` - UI component props

**Pattern:** Export all types from `src/types/index.ts` for clean imports.

---

## Design System

**Colors** (`src/constants/colors.ts`):
- Primary: #2E7D32 (green)
- Background: #F5F5F5
- High contrast mode variants available

**Sizes** (`src/constants/sizes.ts`):
- Button sizes: small (80px), medium (100px), large (120px)
- Font sizes: small (18px), medium (22px), large (26px)
- Spacing: 8px base unit

**Fonts** (`src/constants/fonts.ts`):
- Arabic: 'Cairo' (Google Fonts)
- English: System default
- Bundled in `android/app/src/main/assets/fonts/`

---

## Key Implementation Patterns

### Audio Playback
```typescript
// Always initialize AudioService first
await AudioService.initialize();

// Play pre-recorded phrase
await AudioService.play('basic-needs/hungry.mp3');

// Cache is automatic via audioCache utility
```

### Settings Updates
```typescript
// Use SettingsContext hook
const { settings, updateSetting } = useSettings();

// Update persists to AsyncStorage automatically
await updateSetting('fontSize', 'large');
```

### Adding New Phrases
1. Record audio file with Daniel voice (ElevenLabs)
2. Place in `android/app/src/main/assets/audio/{category}/`
3. Add entry to corresponding data file in `src/data/`
4. Audio path must use forward slashes: `category/filename.mp3`

---

## Testing Strategy

### Unit Testing (Jest)
**Current State:** Basic test setup with Jest, but no comprehensive tests written.

**Test Files:** All tests should go in `__tests__/` directory.

**Running Tests:**
```bash
yarn test
```

### UI Testing (Maestro)
**Current State:** ✅ Comprehensive UI test suite with 9 test flows

**Test Files:** All Maestro tests in `.maestro/` directory.

**Features:**
- All 5 category flows (Basic Needs, Emotions, Conversation, Pain, Family)
- Complete user journey simulation
- Settings and accessibility testing
- No code required - tests written in YAML

**Running UI Tests:**
```bash
# Install Maestro first (one-time)
curl -Ls "https://get.maestro.mobile.dev" | bash

# Run tests
yarn maestro                 # All tests (~2-3 min)
yarn maestro:quick          # Quick smoke test (~5 sec)
yarn maestro:flows          # All category flows (~1 min)
yarn maestro:journey        # Complete user journey (~45 sec)
```

**Documentation:**
- [Full Maestro Guide](.maestro/README.md) - Complete testing documentation
- [Quick Start](.maestro/QUICKSTART.md) - Quick reference guide
- [Setup Summary](MAESTRO_TESTING_SETUP.md) - What was added

**Test Coverage:** App launch, navigation, all categories, phrase interactions, bottom sheets, settings, accessibility features

---

## Known Constraints

1. **Android Only** - iOS support planned but not implemented
2. **Pre-recorded Audio** - All phrases use Daniel voice from ElevenLabs
3. **Offline Only** - No network functionality (intentional for privacy)
4. **No Backend** - All data stored locally with AsyncStorage
5. **Custom Phrases** - UI exists but TTS integration not implemented

---

## Build Configuration

**Version Management** (`android/app/build.gradle`):
```gradle
versionCode 1        // Increment for each Play Store release
versionName "1.0"    // User-facing version string
```

**Release Build Features:**
- ProGuard minification enabled
- Resource shrinking enabled
- Hermes JavaScript engine
- Signed with release keystore

**Build Output:** 65MB APK (includes all 188 audio files)

---

## Voice Generation Scripts

**Located in project root:**
- `generate-all-voices.js` - Regenerates all audio files
- `generate-missing-voices.js` - Generates only missing audio files

**Configuration:** Requires `.env` file with `ELEVENLABS_API_KEY`

**Usage:**
```bash
# Generate missing audio files
node generate-missing-voices.js

# Regenerate all audio files (caution: overwrites existing)
node generate-all-voices.js
```

See VOICE_GENERATION_SUMMARY.md for details on Daniel voice configuration.

---

## Documentation Files

- **PRD.md** - Complete product requirements and user stories
- **VOICE_CONFIG_SUMMARY.md** - Daniel voice settings and rationale
- **VOICE_GENERATION_SUMMARY.md** - Audio generation process
- **PRODUCTION_BUILD_INFO.md** - Release build and keystore details
- **BUTTON_VOICE_ANALYSIS.md** - Voice selection analysis
- **FONT_SETUP_INSTRUCTIONS.md** - Cairo font integration

---

## Development Workflow

1. **Start Development:** `yarn fresh:android` (most reliable)
2. **Make Changes:** Edit code with TypeScript strict mode
3. **Test on Device:** Changes hot-reload automatically
4. **Lint Before Commit:** `yarn lint`
5. **Build for Release:** `cd android && ./gradlew assembleRelease`

**Metro Bundler Issues?** Run `yarn clean:cache` then restart Metro.

**Build Failures?** Run `yarn clean:all` for complete clean reinstall.

---

## Critical Files - Never Delete

- `android/app/oul-release.keystore` - Required for all app updates
- `android/app/src/main/assets/audio/*` - All pre-recorded phrases
- `android/app/src/main/assets/fonts/*` - Cairo Arabic font files
- `ICON FOLDER/` - App icons and Play Store assets
- `.env` - ElevenLabs API key for voice generation

---

## Common Pitfalls

1. **Audio Path Format:** Must use forward slashes, not backslashes
2. **AudioService Initialization:** Must call `initialize()` before `play()`
3. **Settings Context:** Must wrap app in `SettingsProvider`
4. **Keystore Loss:** Cannot update app on Play Store without original keystore
5. **Cache Issues:** Always try `yarn fresh:android` first for weird issues

---

## Project Status

**Completed:**
- ✅ All core features implemented
- ✅ All 188 audio files generated with Daniel voice
- ✅ Production APK built and signed
- ✅ Accessibility features (WCAG 2.1 AA)

**Pending:**
- ⏳ Device testing with target user
- ⏳ Custom phrases TTS integration
- ⏳ Play Store submission
- ⏳ iOS version (future)
