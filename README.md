# قول (Oul) - Communication App

**Arabic:** قول
**English:** Say / Speak
**Purpose:** Empowering individuals with speech difficulties to communicate with dignity

---

## 🎯 About

قول (Oul) is an Android communication app designed for individuals with speech difficulties (post-stroke, ALS, etc.). It enables users to express their needs quickly through large, accessible buttons that play pre-recorded audio phrases.

**Target User:** Elderly individual recovering from speech loss
**Platform:** Android only
**Voice:** Daniel (ElevenLabs) - warm, authoritative, clear

---

## ⚡ Quick Start

```bash
# Install dependencies
yarn install

# Run app (fresh start - recommended)
yarn fresh:android
```

**First time?** Make sure you have Android Studio and an emulator/device set up.

---

## 📚 Documentation

- **[PRD.md](./PRD.md)** - Product requirements document
- **[VOICE_CONFIG_SUMMARY.md](./VOICE_CONFIG_SUMMARY.md)** - Voice configuration (Daniel)

---

## 🚀 Common Commands

```bash
# Daily development
yarn fresh:android          # Clean cache + run (most common)

# Normal run
yarn start                  # Terminal 1: Metro bundler
yarn android                # Terminal 2: Run app

# Clean caches (when things break)
yarn clean:cache            # Quick clean (~5s)
yarn clean:all              # Full clean + reinstall (~3min)
yarn reset                  # Nuclear option (~4min)

# Testing & linting
yarn test                   # Run tests
yarn lint                   # Lint code
```

**All essential commands are listed above**

---

## 📱 Features

### **Communication Categories**

- **Basic Needs** (16 phrases) ✅ - Food, water, bathroom, etc.
- **Pain Location** (22 phrases) ✅ - Body parts + intensity selector
- **Emotions** (18 phrases) ✅ - Thank you, happy, frustrated, etc.
- **Conversation** (42 phrases) ✅ - Yes, no, greetings, questions

### **Customization**

- **Custom Phrases** ✅ - User can add unlimited custom phrases
- **Settings** ✅ - Speech rate, haptic feedback, high contrast mode

### **Accessibility**

- Large buttons (120x120px minimum) ✅
- High contrast mode ✅
- Haptic feedback ✅
- Clear typography (20px+ Arabic) ✅
- WCAG 2.1 AA compliance ✅

---

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
├── screens/            # App screens (7 screens)
├── services/           # Business logic (Audio, TTS, Storage, Haptics)
├── types/              # TypeScript definitions
├── constants/          # Colors, sizes, design system
├── navigation/         # React Navigation setup
├── data/               # Static phrase data
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

**All components and services are fully implemented and functional**

---

## 🎨 Tech Stack

- **Framework:** React Native 0.82.1
- **Language:** TypeScript 5.8.3
- **Navigation:** React Navigation 7
- **Audio:** react-native-sound (pre-recorded) + react-native-tts (custom)
- **Storage:** AsyncStorage
- **Haptics:** react-native-haptic-feedback

---

## 🎙️ Voice

**Selected Voice:** Daniel (ElevenLabs)
**Characteristics:** Authoritative yet warm, clear, perfect for medical context

**Settings:**

- Stability: 0.35 (natural, not robotic)
- Style: 0.1 (friendly warmth)
- Speaker Boost: true (maximum clarity)

**Status:** ✅ All 188 audio files generated with Daniel voice

**See [VOICE_CONFIG_SUMMARY.md](./VOICE_CONFIG_SUMMARY.md) for details**

---

## 🎯 Development Status

### ✅ Completed

- [x] Project structure and TypeScript types
- [x] Core services (Audio, TTS, Storage, Haptics)
- [x] Navigation setup and routing
- [x] All 7 screens implemented
- [x] All 5 UI components implemented
- [x] Static phrase data (4 categories, 98 phrases)
- [x] Audio files generated (188 files with Daniel voice)
- [x] Accessibility features (WCAG 2.1 AA compliance)
- [x] Design system and theming
- [x] Development scripts and tooling

### 🎯 Ready

- [ ] Device testing with target user
- [ ] Performance optimization
- [ ] Production deployment

---

## 🛠️ Troubleshooting

### **App won't build?**

```bash
yarn fresh:android
```

### **Metro stuck?**

```bash
yarn clean:cache
yarn start
```

### **Nothing works?**

```bash
yarn reset
```

**All common issues are covered above**

---

## 📦 Dependencies

All dependencies are managed via Yarn. See `package.json` for complete list.

**Key dependencies:**

- Navigation, Audio, TTS, Storage, Haptics
- All installed and configured

---

## 🤝 Contributing

This is a personal project for a family member. Not open for external contributions.

---

## 📄 License

Private project - All rights reserved

---

## 📞 Support

**Having issues?**

1. Try `yarn fresh:android` (most common fix)
2. Try `yarn clean:cache` then `yarn start`
3. Try `yarn reset` (nuclear option)
4. Check [PRD.md](./PRD.md) for requirements

---

## 🎯 Next Steps

1. Test on device with target user
2. Performance optimization and battery usage
3. User feedback and refinements
4. Production build and deployment
5. Family training and support

---

**قول (Oul)** - Communication with Dignity
_Built with ❤️ using React Native_
