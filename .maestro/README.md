# Maestro Testing for Oul (قول)

Comprehensive UI testing suite for the Oul communication app using Maestro.

## 📋 Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Files](#test-files)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## 🚀 Installation

### Install Maestro

**macOS/Linux:**
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**Windows:**
```bash
# Using Windows Subsystem for Linux (WSL)
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**Verify installation:**
```bash
maestro --version
```

### Prerequisites

- Android emulator or physical device connected via ADB
- Oul app installed on device (debug or release build)
- Device screen unlocked

## 🧪 Running Tests

### Run All Tests

```bash
# Run all tests in the .maestro directory
maestro test .maestro

# Run with detailed output
maestro test .maestro --debug
```

### Run Individual Test

```bash
# Run specific test file
maestro test .maestro/01-app-launch.yaml

# Run with continuous mode (watches for changes)
maestro test .maestro/01-app-launch.yaml --continuous
```

### Run Specific Category Tests

```bash
# Test only Basic Needs flow
maestro test .maestro/02-basic-needs-flow.yaml

# Test all category flows
maestro test .maestro/02-basic-needs-flow.yaml \
             .maestro/03-emotions-flow.yaml \
             .maestro/04-conversation-flow.yaml \
             .maestro/05-pain-flow.yaml \
             .maestro/06-family-flow.yaml
```

### Run with Android Emulator

```bash
# Start emulator first
emulator -avd <your_avd_name>

# Install app
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Run tests
maestro test .maestro
```

## 📝 Test Files

| File | Description | Duration |
|------|-------------|----------|
| `01-app-launch.yaml` | Verifies app launches and home screen displays | ~5s |
| `02-basic-needs-flow.yaml` | Tests Basic Needs category navigation and phrase interaction | ~15s |
| `03-emotions-flow.yaml` | Tests Emotions category | ~10s |
| `04-conversation-flow.yaml` | Tests Conversation phrases | ~10s |
| `05-pain-flow.yaml` | Tests Pain location category | ~12s |
| `06-family-flow.yaml` | Tests Family phrases | ~10s |
| `07-settings-flow.yaml` | Tests Settings screen and preference changes | ~20s |
| `08-complete-user-journey.yaml` | Simulates realistic user flow through multiple categories | ~45s |
| `09-accessibility-test.yaml` | Tests high contrast mode and font size changes | ~25s |

**Total test suite duration:** ~2-3 minutes

## 🔧 Test Coverage

### Features Tested ✅

- ✅ App launch and initialization
- ✅ Home screen category display
- ✅ Navigation to all 5 categories
- ✅ Phrase button interactions
- ✅ Bottom sheet modal display
- ✅ Play button functionality
- ✅ Share button functionality
- ✅ Settings screen navigation
- ✅ Font size changes
- ✅ Button size changes
- ✅ High contrast mode toggle
- ✅ Haptic feedback toggle
- ✅ Complete user journeys
- ✅ Accessibility features

### Not Tested (Maestro Limitations) ⚠️

- ⚠️ Audio playback verification (can press button, can't verify sound)
- ⚠️ WhatsApp integration (external app, requires manual testing)
- ⚠️ Actual TTS voice quality
- ⚠️ AsyncStorage persistence (requires app restart)

## ✍️ Writing New Tests

### Basic Test Structure

```yaml
appId: com.oul
---
# Test: Description of what this tests

- launchApp
- assertVisible: "Element to verify"
- tapOn: "Element to tap"
- swipe:
    direction: DOWN
- back
```

### Common Maestro Commands

**Navigation:**
```yaml
- tapOn: "Button Text"
- tapOn:
    id: "element-test-id"
- back
- swipe:
    direction: UP|DOWN|LEFT|RIGHT
```

**Assertions:**
```yaml
- assertVisible: "Text to find"
- assertVisible:
    id: "element-test-id"
- assertNotVisible: "Should not see this"
```

**Waiting:**
```yaml
- waitForAnimationToEnd
- waitForAnimationToEnd:
    timeout: 5000  # milliseconds
```

**Input:**
```yaml
- inputText: "Text to type"
- tapOn: "Field"
- inputText: "Hello"
```

### Adding Test IDs to Components

To make tests more reliable, add `testID` props to React Native components:

```typescript
// PhraseButton.tsx
<TouchableOpacity
  testID="play-button"
  onPress={onPlay}
>
  <Text>Play</Text>
</TouchableOpacity>

// Usage in Maestro
- tapOn:
    id: "play-button"
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Maestro Tests

on: [push, pull_request]

jobs:
  maestro-test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Android
        uses: android-actions/setup-android@v2

      - name: Install Maestro
        run: curl -Ls "https://get.maestro.mobile.dev" | bash

      - name: Build APK
        run: |
          cd android
          ./gradlew assembleDebug

      - name: Run Maestro Tests
        run: |
          maestro test .maestro

      - name: Upload Test Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: maestro-results
          path: ~/.maestro/tests/
```

### Local Pre-commit Hook

```bash
# .git/hooks/pre-push
#!/bin/bash
echo "Running Maestro tests..."
maestro test .maestro/01-app-launch.yaml
if [ $? -ne 0 ]; then
  echo "Tests failed! Push aborted."
  exit 1
fi
```

## 🐛 Troubleshooting

### Test fails to find element

**Problem:** `assertVisible` fails even though element is on screen

**Solutions:**
1. Check if text is exactly correct (case-sensitive, includes special characters)
2. Use `id` instead of text for more reliable targeting
3. Add `waitForAnimationToEnd` before assertion
4. Verify element is actually visible (not hidden by modal/overlay)

### App doesn't launch

**Problem:** `launchApp` times out

**Solutions:**
```bash
# Verify app is installed
adb shell pm list packages | grep com.oul

# Install if needed
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Check device connection
adb devices

# Restart ADB server
adb kill-server
adb start-server
```

### Bottom sheet doesn't close

**Problem:** Swipe down doesn't close bottom sheet

**Solutions:**
```yaml
# Try different swipe directions
- swipe:
    direction: DOWN

# Or tap outside the modal
- tapOn:
    point: 50%,10%  # Tap near top of screen

# Or use close button
- tapOn:
    id: "close-button"
```

### Tests are flaky

**Problem:** Tests pass sometimes, fail other times

**Solutions:**
1. Add more `waitForAnimationToEnd` commands
2. Increase timeouts
3. Use `id` selectors instead of text
4. Check for animations/transitions completing

### Arabic text not found

**Problem:** `assertVisible` fails for Arabic text

**Solutions:**
1. Ensure text is copied exactly (including diacritics)
2. Use English translation instead
3. Use `id` selector on parent component
4. Check text rendering in app

## 📊 Test Reports

Maestro generates reports in `~/.maestro/tests/`

### View Latest Test Report

```bash
# List recent test runs
ls -lt ~/.maestro/tests/

# Open latest report
open ~/.maestro/tests/<timestamp>/report.html
```

### Export Test Results

```bash
# Run tests with JUnit output
maestro test .maestro --format junit --output results.xml

# Run with JSON output
maestro test .maestro --format json --output results.json
```

## 🎯 Test Best Practices

1. **Start simple** - Test happy paths first, edge cases later
2. **Use testIDs** - More reliable than text matching
3. **Wait appropriately** - Add waits for animations/async operations
4. **Keep tests independent** - Each test should work in isolation
5. **Test user journeys** - Not just individual features
6. **Maintain test data** - Keep Arabic text consistent with app
7. **Run regularly** - Integrate into development workflow
8. **Update with app changes** - Keep tests in sync with UI updates

## 📚 Resources

- [Maestro Documentation](https://maestro.mobile.dev/)
- [Maestro CLI Reference](https://maestro.mobile.dev/cli/commands)
- [Maestro Discord Community](https://discord.gg/maestro)
- [Example Tests](https://github.com/mobile-dev-inc/maestro/tree/main/maestro-test)

## 🤝 Contributing

When adding new features to Oul:

1. Add `testID` props to new components
2. Write corresponding Maestro test
3. Run tests locally before committing
4. Update this README if needed

---

**Last Updated:** 2025-11-16
**Maestro Version:** Latest
**App Version:** 1.0
