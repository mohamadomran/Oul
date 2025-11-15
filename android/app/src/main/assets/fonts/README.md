# Fonts Directory

This directory contains custom fonts for the Oul app.

## IBM Plex Sans Arabic Font

IBM Plex Sans Arabic - Professional, modern font with excellent Arabic and Latin support.
Download from Google Fonts: https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic

### Required Font Files:

Place the following font files in this directory:

1. **IBMPlexSansArabic-Regular.ttf** (400 weight)
2. **IBMPlexSansArabic-Medium.ttf** (500 weight)
3. **IBMPlexSansArabic-SemiBold.ttf** (600 weight)
4. **IBMPlexSansArabic-Bold.ttf** (700 weight)

### Installation Instructions:

1. Locate your downloaded IBM Plex Sans Arabic font files
2. Copy the `.ttf` files to this directory (`/android/app/src/main/assets/fonts/`)
3. Make sure file names match exactly as listed above (case-sensitive)
4. Rebuild the Android app: `npx react-native run-android`

### iOS Setup:

For iOS, you'll also need to:
1. Copy the same font files to your iOS project folder
2. Add them to Xcode project (drag and drop into project navigator)
3. Update Info.plist with font file names under `UIAppFonts` key
4. Rebuild: `npx react-native run-ios`
