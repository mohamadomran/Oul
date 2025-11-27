# Audio System Debugging Summary

## Problem
Audio files were not playing in the Oul app. Error: `Failed to load basic_needs/water.mp3`

## Root Cause
**Sound.MAIN_BUNDLE was being used incorrectly for Android assets folder**

### Technical Details
- `Sound.MAIN_BUNDLE` in react-native-sound is designed for Android's `res/raw/` folder
- Our audio files are in `android/app/src/main/assets/audio/` folder
- For Android assets folder, basePath should be an empty string `''`, NOT `Sound.MAIN_BUNDLE`

## Files Verified ✓

### Audio Files
- **Total audio files in assets:** 209 MP3 files
- **Files referenced in JSON:** 101 phrases
- **Missing files:** 0 (all present!)
- **Location:** `android/app/src/main/assets/audio/{category}/{file}.mp3`

### Categories
1. `basic_needs` - 17 phrases
2. `emotions` - 17 phrases
3. `conversation` - 46 phrases
4. `pain` - 12 phrases
5. `family` - 9 phrases

### Configuration Verified ✓
1. **react-native-sound** installed (v0.13.0)
2. **Android permissions** present (MODIFY_AUDIO_SETTINGS)
3. **Asset compression** disabled for MP3 (`noCompress 'mp3'` in build.gradle)
4. **Audio path utils** present and correct

## Fix Applied

### JsonAudioService.ts Changes

**Before:**
```typescript
const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error: any) => {
  // This looks in res/raw/ folder - WRONG for our setup!
});
```

**After:**
```typescript
// For Android assets folder, use empty string as basePath (not MAIN_BUNDLE)
// MAIN_BUNDLE is for res/raw folder, but our files are in assets/audio/
const basePath = Platform.OS === 'android' ? '' : Sound.MAIN_BUNDLE;

const sound = new Sound(audioPath, basePath, (error: any) => {
  // Now correctly loads from assets/audio/ folder
});
```

### Path Construction
- **Path format:** `audio/{category}/{audioFile}`
- **Example:** `audio/basic_needs/water.mp3`
- **Unified for both platforms** (no more Platform-specific logic in getAudioPath)

## Testing Steps

1. **Reload the app:**
   ```bash
   # In Metro bundler terminal, press 'r'
   # Or shake device and select "Reload"
   ```

2. **Full restart if needed:**
   ```bash
   yarn fresh:android
   ```

3. **Test audio playback:**
   - Navigate to Basic Needs screen
   - Tap on "Water" button
   - Bottom sheet should open
   - Tap "Play" button
   - Audio should play: "أَحْتَاجُ مَاء" (I need water)

## Expected Console Output (Success)

```
[JsonAudioService] Initializing...
[JsonAudioService] Initialized successfully
[JsonAudioService] Playing: أَحْتَاجُ مَاء (basic_needs/water.mp3)
[JsonAudioService] Loading: audio/basic_needs/water.mp3
[JsonAudioService] Successfully loaded: audio/basic_needs/water.mp3
[JsonAudioService] Playback successful: أَحْتَاجُ مَاء
```

## Additional Notes

### Why Not Move Files to res/raw/?
- `res/raw/` doesn't support subdirectories (flat structure only)
- We have 5 categories with 101 files - organization is important
- Assets folder allows proper categorization

### react-native-sound Asset Loading Patterns
1. **From res/raw:** Use `Sound.MAIN_BUNDLE` as basePath
2. **From assets folder:** Use empty string `''` as basePath (Android)
3. **From require():** Import file, no basePath needed (impractical for 100+ files)

## Files Modified
1. `src/services/JsonAudioService.ts` - Fixed basePath for Android assets

## Files Verified (No Changes Needed)
1. `android/app/build.gradle` - MP3 noCompress already configured
2. `android/app/src/main/AndroidManifest.xml` - Audio permissions present
3. `src/data/audioPhrases.json` - All file references correct
4. All audio files in assets folder - All present and correct

---

**Status:** ✅ FIXED - Ready for testing
**Date:** 2025-11-16
**Version:** v1.0
