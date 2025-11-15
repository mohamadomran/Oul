# IBM Plex Sans Arabic Font Setup Instructions

The code is now configured to use the **IBM Plex Sans Arabic font** - a professional, modern font with excellent Arabic and English support. Follow these steps to complete the setup:

## Step 1: Locate Your Downloaded Font

You mentioned you've already downloaded IBM Plex Sans Arabic. If you need to download it again:
1. Visit **Google Fonts**: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
2. Click the **"Download family"** button (top right)
3. Extract the downloaded ZIP file

## Step 2: Install Fonts for Android

1. Navigate to your IBM Plex Sans Arabic font folder
2. Locate these 4 files (they should be .ttf files):
   - `IBMPlexSansArabic-Regular.ttf`
   - `IBMPlexSansArabic-Medium.ttf`
   - `IBMPlexSansArabic-SemiBold.ttf`
   - `IBMPlexSansArabic-Bold.ttf`

3. Copy all 4 files into: `/android/app/src/main/assets/fonts/`
   (This directory has already been created for you)

## Step 3: Install Fonts for iOS (if building for iOS)

### Option A: Using Xcode (Recommended)

1. Open your project in Xcode:
   ```bash
   open ios/Oul.xcworkspace
   ```

2. In Xcode, right-click on your project folder and select **"Add Files to..."**

3. Navigate to and select all 4 IBM Plex Sans Arabic font files (.ttf)

4. Make sure **"Copy items if needed"** is checked

5. Open `Info.plist` and add a new key:
   - Key: `UIAppFonts` (or "Fonts provided by application")
   - Type: Array
   - Add these 4 strings as items:
     ```
     IBMPlexSansArabic-Regular.ttf
     IBMPlexSansArabic-Medium.ttf
     IBMPlexSansArabic-SemiBold.ttf
     IBMPlexSansArabic-Bold.ttf
     ```

### Option B: Manual Method

1. Copy the 4 font files to `/ios/Oul/` directory

2. Edit `/ios/Oul/Info.plist` and add:
   ```xml
   <key>UIAppFonts</key>
   <array>
     <string>IBMPlexSansArabic-Regular.ttf</string>
     <string>IBMPlexSansArabic-Medium.ttf</string>
     <string>IBMPlexSansArabic-SemiBold.ttf</string>
     <string>IBMPlexSansArabic-Bold.ttf</string>
   </array>
   ```

3. In Xcode, add these files to the project (drag and drop into project navigator)

## Step 4: Rebuild the Apps

After adding the font files, you **must rebuild** the native apps:

### For Android:
```bash
npx react-native run-android
```

### For iOS:
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

Or build from Xcode directly.

## Step 5: Verify Installation

The IBM Plex Sans Arabic font is now applied to:
- ✓ Header titles (Arabic "قول" and English "Oul") - **Bold weight**
- ✓ Tagline "Say what you need" - **Regular weight**

If you see the text but it doesn't look different, the fonts may not have loaded. Check:
1. Font files are in the correct directories
2. File names match exactly (case-sensitive)
3. App was rebuilt after adding fonts
4. No errors in Metro bundler console

## Troubleshooting

**Fonts not appearing?**
- Verify file names match exactly: `IBMPlexSansArabic-Regular.ttf`, `IBMPlexSansArabic-Medium.ttf`, etc.
- Make sure you rebuilt the app (not just refreshed)
- Check Metro bundler for font-related errors
- On iOS, verify Info.plist entries are correct

**Still using system font?**
- Clear cache: `npx react-native start --reset-cache`
- Rebuild: `npx react-native run-android` or `run-ios`

## What's Configured

The following files have been updated to use IBM Plex Sans Arabic font:

1. **`/src/constants/fonts.ts`** - Font family constants
2. **`/src/constants/index.ts`** - Exports fonts
3. **`/src/components/layout/HomeHeader.tsx`** - Uses IBM Plex Sans Arabic Bold for titles, Regular for tagline

You can now use IBM Plex Sans Arabic font in other components by importing:
```typescript
import { FONTS } from '../constants';

// Then in your styles:
{
  fontFamily: FONTS.bold,  // or FONTS.regular, FONTS.medium, FONTS.semiBold
}
```

## About IBM Plex Sans Arabic Font

- **Design**: Professional, modern sans-serif with corporate feel
- **Designer**: IBM (part of IBM Plex type family)
- **Language Support**: Arabic, Latin (English), and more
- **Weights Available**: Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Perfect for**: Professional apps requiring bilingual Arabic/English text
- **License**: SIL Open Font License (free for commercial use)
- **Features**: Excellent readability, consistent spacing, professional appearance

Enjoy your new font! 🎨
