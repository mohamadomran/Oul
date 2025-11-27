# Maestro Quick Start Guide

Quick reference for running Maestro tests on Oul app.

## Install Maestro (One-time Setup)

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

## Prepare Device

```bash
# Start Android emulator
emulator -avd Pixel_5_API_33

# OR connect physical device and enable USB debugging
adb devices

# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Run Tests

### All Tests
```bash
maestro test .maestro
```

### Single Test
```bash
maestro test .maestro/01-app-launch.yaml
```

### With Debug Output
```bash
maestro test .maestro --debug
```

### Continuous Mode (watches for file changes)
```bash
maestro test .maestro/01-app-launch.yaml --continuous
```

## Common Issues

### "No devices found"
```bash
adb devices
# If empty, check USB connection or start emulator
```

### "App not installed"
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### "Element not found"
- Check if text is exactly correct (case-sensitive)
- Try using `testID` instead of text
- Add `waitForAnimationToEnd` before assertion

## Test Results

Results are saved in: `~/.maestro/tests/`

View latest:
```bash
ls -lt ~/.maestro/tests/ | head -5
```

---

**For full documentation, see README.md**
