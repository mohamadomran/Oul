# Product Requirements Document (PRD)

# قول (Oul) - Communication App for Speech-Impaired Users

**Version:** 1.0
**Last Updated:** November 14, 2025
**Product Owner:** Mohamad (Founding Engineer)
**Target Platform:** Android

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target User Profile](#target-user-profile)
4. [User Stories](#user-stories)
5. [Core Features](#core-features)
6. [Technical Specifications](#technical-specifications)
7. [User Interface Design](#user-interface-design)
8. [User Flows](#user-flows)
9. [Success Metrics](#success-metrics)
10. [Future Enhancements](#future-enhancements)

---

## Executive Summary

**قول (Oul)** is a specialized Android communication application designed for individuals with speech difficulties, particularly those recovering from neurological conditions such as aneurysms. The app enables users to express their needs, emotions, and thoughts through a text-to-speech system with pre-programmed and customizable phrases.

### Key Value Propositions

- **Independence**: Enables communication without relying on others to interpret
- **Dignity**: Preserves the user's ability to express themselves clearly
- **Accessibility**: Designed for one-handed operation with large, easy-to-tap buttons
- **Cultural Sensitivity**: Lebanese Arabic dialect with multilingual support
- **Privacy**: Completely offline functionality with local data storage

---

## Product Vision

### Mission Statement

_"Empowering individuals with speech difficulties to communicate independently, clearly, and with dignity through accessible technology."_

### Goals

1. **Primary Goal**: Enable users with speech impairments to communicate basic needs, pain levels, emotions, and participate in family conversations
2. **Secondary Goal**: Provide a customizable platform that grows with the user's recovery and changing needs
3. **Tertiary Goal**: Create a family-friendly tool that encourages and facilitates communication

### Problem Statement

Individuals recovering from aneurysms or other neurological conditions often experience:

- Difficulty producing clear speech (dysarthria/aphasia)
- Frustration from being unable to express basic needs
- Loss of independence in daily communication
- Reduced participation in family and social interactions
- Difficulty indicating pain location and severity to caregivers

Traditional communication boards are:

- Static and inflexible
- Require two hands to use
- Cannot produce audible speech
- Limited in vocabulary
- Not culturally or linguistically appropriate

---

## Target User Profile

### Primary User: Post-Aneurysm Recovery Patient

**Demographics:**

- Age: 40-70 years old
- Location: Lebanon (Beirut area)
- Language: Lebanese Arabic (primary), English/French (secondary)
- Tech Literacy: Basic smartphone user

**Physical Abilities:**

- **Mobility**: Use of one arm/hand (non-dominant)
- **Motor Skills**: Can walk with assistance (cane/walker)
- **Vision**: Adequate (may need reading glasses)
- **Hearing**: Adequate
- **Speech**: Severely impaired but improving gradually

**Cognitive Abilities:**

- **Comprehension**: Full understanding of conversations
- **Memory**: Functional short and long-term memory
- **Problem Solving**: Able to learn new tools with guidance
- **Awareness**: Fully aware of condition and surroundings

**Behavioral Patterns:**

- Uses WhatsApp and social media (scrolling, stickers)
- Watches TikTok and videos
- Sends good morning images and stickers to family
- Active in family group chats (through reactions/stickers)
- Learning and improving speech gradually

**Pain Points:**

- Cannot express complex thoughts verbally
- Struggles to indicate pain location
- Difficulty participating in family conversations
- Frustration from communication barriers
- Needs help for basic requests

**Goals:**

- Communicate basic needs independently
- Participate in family gatherings
- Express emotions and opinions
- Indicate pain accurately to get help
- Maintain dignity and autonomy

### Secondary Users: Family Members & Caregivers

**Role:**

- Help set up and customize the app
- Add frequently-used phrases
- Adjust settings as needed
- Encourage app usage

**Needs:**

- Simple interface to add custom phrases
- Clear instructions in Arabic
- Ability to quickly help during emergencies
- Peace of mind that loved one can communicate

---

## User Stories

### Epic 1: Basic Communication

**As a user**, I want to express basic daily needs so that I can maintain independence.

**User Stories:**

- As a user, I want to tell someone I'm hungry/thirsty with one tap
- As a user, I want to request bathroom assistance quickly
- As a user, I want to ask for medicine when needed
- As a user, I want to indicate if I'm too hot or cold
- As a user, I want to request help immediately in emergencies

**Acceptance Criteria:**

- Button taps result in clear audio output within 1 second
- Phrases are in Lebanese Arabic dialect
- Buttons are large enough to tap with one hand (min 120px height)
- Visual feedback confirms button press
- No internet connection required

---

### Epic 2: Pain Communication

**As a user**, I want to accurately communicate pain location and intensity so that I receive appropriate care.

**User Stories:**

- As a user, I want to select which body part hurts
- As a user, I want to indicate if pain is mild, moderate, or severe
- As a user, I want to quickly say "I need a doctor"
- As a user, I want to tell someone I'm in a lot of pain
- As a user, I want to indicate I'm feeling better

**Acceptance Criteria:**

- Body diagram is clear and easy to understand
- Pain intensity selector is obvious (color-coded)
- Emergency phrases are prominently displayed
- Can communicate pain in 2-3 taps maximum
- Outputs complete sentence: "عندي وجع [intensity] [location]"

---

### Epic 3: Emotional Expression

**As a user**, I want to express my feelings and emotions so that family understands my emotional state.

**User Stories:**

- As a user, I want to tell family I'm happy/sad
- As a user, I want to greet people when they arrive
- As a user, I want to say goodnight/good morning
- As a user, I want to express gratitude ("thank you")
- As a user, I want to say "I love you" to family

**Acceptance Criteria:**

- Includes positive and negative emotions
- Greetings in multiple languages (Arabic, English, French)
- Phrases sound natural when spoken
- Visual icons clearly represent emotions
- Easy to find commonly-used greetings

---

### Epic 4: Family Conversations

**As a user**, I want to participate in family discussions so that I feel included and valued.

**User Stories:**

- As a user, I want to answer yes/no questions
- As a user, I want to express agreement/disagreement
- As a user, I want to ask basic questions (what, who, where, when, why, how)
- As a user, I want to indicate if I understand or need clarification
- As a user, I want to make simple requests

**Acceptance Criteria:**

- Covers common conversation scenarios
- Enables two-way communication
- Includes question words
- Phrases for understanding/clarification
- Time-related expressions

---

### Epic 5: Personalization

**As a user**, I want to add my own phrases so that the app meets my specific needs.

**User Stories:**

- As a user, I want to add phrases I use frequently
- As a user, I want to choose an emoji icon for my phrases
- As a user, I want to select the language for pronunciation
- As a user, I want to edit or delete phrases I created
- As a user, I want my custom phrases to be saved permanently

**Acceptance Criteria:**

- Can add unlimited custom phrases
- Phrases persist after app restart
- Can edit existing custom phrases
- Can delete phrases with confirmation
- Simple form with clear labels
- Emoji picker with common options

---

### Epic 6: Settings & Customization

**As a user**, I want to customize the app to my preferences so that it's comfortable to use.

**User Stories:**

- As a user, I want to adjust speech speed to my comfort level
- As a user, I want to test the voice before saving settings
- As a user, I want to enable/disable haptic feedback
- As a user, I want high contrast mode for better visibility
- As a user, I want to see usage instructions

**Acceptance Criteria:**

- Speech rate adjustable from 0.3x to 1.5x
- Test button plays sample phrase
- Settings persist after app restart
- Changes apply immediately
- Clear visual feedback for current settings

---

## Core Features

### Feature 1: Home Screen Navigation

**Description:**
Central hub with four large category buttons and quick access to settings and custom phrases.

**Components:**

- 4 main category buttons (140px height each)
- 2 smaller action buttons for Custom Phrases and Settings
- App title: "قول" and subtitle
- Clean, uncluttered layout

**Categories:**

1. **احتياجات أساسية** (Basic Needs) - Green #4CAF50
2. **موقع الألم** (Pain Location) - Red #F44336
3. **المشاعر** (Emotions) - Orange #FF9800
4. **محادثة** (Conversation) - Blue #2196F3

**User Flow:**

1. User opens app → Sees home screen
2. User taps category → Navigates to category screen
3. User taps back button → Returns to home screen

**Technical Requirements:**

- React Navigation stack navigation
- Gesture handling for back navigation
- Async initialization of TTS service
- No loading states (instant navigation)

---

### Feature 2: Basic Needs Category

**Description:**
16 essential phrases for daily needs and requests.

**Phrases Included:**

| Arabic   | English        | Icon | Color      |
| -------- | -------------- | ---- | ---------- |
| جوعان    | Hungry         | 🍽️   | Green      |
| عطشان    | Thirsty        | 💧   | Blue       |
| تعبان    | Tired          | 😴   | Purple     |
| حمام     | Bathroom       | 🚽   | Orange     |
| دوا      | Medicine       | 💊   | Red        |
| موية     | Water          | 🚰   | Cyan       |
| بارد     | Cold           | ❄️   | Light Blue |
| حر       | Hot            | 🔥   | Red-Orange |
| بدي نام  | Want to sleep  | 🛏️   | Purple     |
| بدي قعود | Want to sit    | 🪑   | Brown      |
| بدي وقوف | Want to stand  | 🧍   | Grey       |
| بدي مشي  | Want to walk   | 🚶   | Green      |
| بدي طلع  | Want to go out | 🚪   | Teal       |
| ساعدني   | Help me        | 🆘   | Pink       |
| تعا      | Come here      | 👋   | Blue       |
| استنى    | Wait           | ✋   | Orange     |

**Button Layout:**

- Grid: 2 columns
- Button size: 45% width, 120px height
- Spacing: 8px margin
- Scrollable if needed

**Interaction:**

1. User taps phrase button
2. Visual feedback (opacity change)
3. TTS speaks phrase in Arabic
4. Button returns to normal state

---

### Feature 3: Pain Location Category

**Description:**
Body part selector with pain intensity options for accurate pain reporting.

**Pain Intensity Selector:**

- **خفيف** (Light) - Yellow background #FFF9C4
- **متوسط** (Moderate) - Orange background #FFB74D
- **قوي** (Severe) - Red background #F44336

**Body Parts (16 locations):**

| Arabic    | English    | Icon | Category   |
| --------- | ---------- | ---- | ---------- |
| راسي      | Head       | 🧠   | Head/Face  |
| عيني      | Eye        | 👁️   | Head/Face  |
| أذني      | Ear        | 👂   | Head/Face  |
| سني       | Tooth      | 🦷   | Head/Face  |
| رقبتي     | Neck       | 🧣   | Upper Body |
| كتفي      | Shoulder   | 💪   | Upper Body |
| إيدي      | Arm        | 🦾   | Upper Body |
| صدري      | Chest      | 🫀   | Upper Body |
| معدتي     | Stomach    | 🤰   | Core       |
| ظهري      | Back       | 🧍   | Core       |
| خصري      | Waist      | 🩹   | Core       |
| رجلي      | Leg        | 🦵   | Lower Body |
| ركبتي     | Knee       | 🦿   | Lower Body |
| قدمي      | Foot       | 🦶   | Lower Body |
| كل جسمي   | Whole body | 🤕   | General    |
| ما في وجع | No pain    | 😊   | General    |

**Quick Emergency Phrases:**

- عندي وجع كتير (I'm in a lot of pain)
- بدي دوا (I need medicine)
- بدي دكتور (I need a doctor)

**User Flow:**

1. User selects pain intensity (optional)
2. User taps body part
3. System speaks: "عندي وجع [intensity] [body part]"
4. Visual confirmation

**Smart Features:**

- If only intensity selected: speaks intensity only
- If only body part selected: speaks body part only
- If both selected: speaks complete sentence
- Remembers last intensity selection

---

### Feature 4: Emotions Category

**Description:**
18 phrases covering emotions, physical states, and multilingual greetings.

**Categories:**

**Positive Emotions (6):**

- مبسوط (Happy) 😊
- منيح (Good) 😌
- ممتاز (Excellent) 😄
- مرتاح (Comfortable) 😎
- شكراً (Thank you) 🙏
- بحبك (I love you) ❤️

**Negative Emotions (6):**

- زعلان (Sad) 😢
- عصبي (Angry) 😠
- خايف (Scared) 😰
- قلقان (Worried) 😟
- مضايق (Upset) 😔
- محبط (Frustrated) 😤

**Physical States (6):**

- تعبان (Tired) 😴
- مريض (Sick) 🤒
- دايخ (Dizzy) 😵
- نشيط (Energetic) 💪
- ملل (Bored) 😐
- مش مرتاح (Uncomfortable) 😣

**Greetings (Multilingual):**

- مرحبا (Hello - Arabic) 👋
- Hello (English) 👋
- Bonjour (French) 🌅
- مع السلامة (Goodbye) 👋
- تصبح على خير (Good night) 🌙
- صباح الخير (Good morning) ☀️

**Language Handling:**

- Arabic phrases: TTS with Arabic voice
- English words: TTS with English voice
- French words: TTS with French voice

---

### Feature 5: Conversation Category

**Description:**
48 phrases enabling participation in family discussions and daily conversations.

**Phrase Categories:**

**1. Basic Responses (6):**

- أيوة (Yes) ✅
- لا (No) ❌
- ما بعرف (I don't know) 🤷
- ممكن (Maybe) 🤔
- تمام (OK) 👌
- ماشي (Alright) 👍

**2. Agreement/Opinion (6):**

- موافق (I agree) ✔️
- مش موافق (I disagree) ✖️
- فكرة حلوة (Good idea) 💡
- مش حلو (Not good) 👎
- بحب هيك (I like it) 😍
- ما بحب (I don't like it) 😒

**3. Questions (6):**

- شو؟ (What?) ❓
- مين؟ (Who?) 👤
- وين؟ (Where?) 📍
- إيمتى؟ (When?) ⏰
- كيف؟ (How?) 🤷
- ليش؟ (Why?) 🧐

**4. Requests (6):**

- بدي (I want) 👉
- ما بدي (I don't want) 🙅
- فيك تساعدني؟ (Can you help?) 🙏
- تعا لهون (Come here) 👋
- استنى شوي (Wait a moment) ✋
- خلص (Finished) ✅

**5. Understanding (6):**

- فهمت (I understand) 🧠
- ما فهمت (I don't understand) 😕
- عيد مرة تانية (Say again) 🔄
- بطيء (Slower) 🐌
- اشرحلي (Explain to me) 📖
- صح (Correct) ✔️

**6. Time-Related (6):**

- هلق (Now) ⚡
- بعدين (Later) ⏳
- بكرا (Tomorrow) 📅
- اليوم (Today) 📆
- أديش الساعة؟ (What time?) 🕐
- عجقة (Hurry) 🏃

**7. Social (6):**

- كيفك؟ (How are you?) 😊
- شو في؟ (What's up?) 🤔
- شو الأخبار؟ (What's new?) 📰
- وحشتني (I missed you) 💙
- معليش (Sorry) 🙏
- مبروك (Congratulations) 🎉

**Layout:**

- Organized by sub-categories with headers
- Clear visual separation between categories
- Grey background headers for categories
- Scrollable grid layout

---

### Feature 6: Custom Phrases

**Description:**
User-created phrase library with full CRUD capabilities.

**Features:**

**1. Add New Phrase:**

- Modal form interface
- Required field: Arabic text (max 200 chars)
- Optional field: English translation (max 200 chars)
- Emoji selector: 16 common emojis displayed
- Language selector: Arabic, English, French radio buttons
- Save button creates new phrase
- Cancel button discards changes

**2. View Custom Phrases:**

- Grid layout (2 columns)
- Each phrase card shows:
  - Emoji icon (large)
  - Arabic text (bold)
  - English translation (if provided)
  - Edit button (✏️)
  - Delete button (🗑️)
- Empty state message if no phrases

**3. Edit Phrase:**

- Opens modal with pre-filled data
- Can modify all fields
- Update button saves changes
- Changes persist immediately

**4. Delete Phrase:**

- Confirmation dialog in Arabic
- "Are you sure?" message
- Yes/No buttons
- Permanent deletion on confirmation

**5. Speak Custom Phrase:**

- Tap phrase card to speak
- Uses selected language for TTS
- Visual feedback during speech

**Data Persistence:**

- Uses AsyncStorage
- Key: `@custom_phrases`
- JSON format
- Saves immediately on changes
- Loads on screen mount

**Data Structure:**

```typescript
interface CustomPhrase {
  id: string; // Timestamp-based unique ID
  arabicText: string; // Required
  englishText: string; // Optional
  icon: string; // Emoji character
  language: 'ar' | 'en' | 'fr'; // TTS language
}
```

---

### Feature 7: Settings & Preferences

**Description:**
Customization options for personalizing app behavior and appearance.

**Settings Available:**

**1. Speech Rate Control:**

- **Range**: 0.3x (slow) to 1.5x (fast)
- **Default**: 0.7x
- **Interface**: Horizontal slider
- **Step**: 0.1x increments
- **Visual**: Current value displayed
- **Test Button**: "🔊 اختبار الصوت" speaks sample phrase
- **Sample Phrase**: "هذا اختبار للصوت. This is a voice test."

**2. Haptic Feedback:**

- **Type**: Toggle switch
- **Default**: Enabled
- **Function**: Vibration on button press
- **Labels**: Arabic + English

**3. High Contrast Mode:**

- **Type**: Toggle switch
- **Default**: Enabled
- **Function**: Enhanced color contrast for visibility
- **Description**: "يجعل الألوان أكثر وضوحاً وسهولة في القراءة"

**Additional Information Sections:**

**About App:**

- App name: "تطبيق التواصل - Communication App"
- Version: 1.0
- Purpose statement
- Background color: Light blue #E3F2FD

**Usage Instructions:**

- 4-step guide in Arabic
- Numbered list format
- Background: Light yellow #FFF9C4

**Quick Tips:**

- 4 helpful tips with bullet points
- Background: Light green #E8F5E9
- Icon: 💡

**Data Persistence:**

- Settings saved to AsyncStorage
- Key: `@app_settings`
- Applied immediately on change
- Persists across sessions

**Data Structure:**

```typescript
interface AppSettings {
  speechRate: number; // 0.3 - 1.5
  hapticFeedback: boolean; // true/false
  buttonSize: 'normal' | 'large' | 'xlarge'; // Future use
  highContrast: boolean; // true/false
}
```

---

## Technical Specifications

### Platform & Environment

**Target Platform:**

- Android 5.0 (API 21) minimum
- Android 8.0+ recommended
- Phone and tablet support
- Portrait orientation only

**Development Stack:**

- **Framework**: React Native 0.76.0
- **Language**: TypeScript 5.3.3
- **Navigation**: React Navigation v6
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: AsyncStorage
- **Build Tool**: Gradle

### Dependencies

**Core:**

```json
{
  "react": "18.2.0",
  "react-native": "0.76.0",
  "typescript": "5.3.3"
}
```

**Navigation:**

```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "react-native-screens": "^3.29.0",
  "react-native-safe-area-context": "^4.8.2"
}
```

**Features:**

```json
{
  "react-native-tts": "^4.1.0",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "@react-native-community/slider": "^4.5.0",
  "react-native-vector-icons": "^10.0.0"
}
```

### Architecture

**Component Structure:**

```
App.tsx (Navigation Root)
├── HomeScreen
├── BasicNeedsScreen
├── PainLocationScreen
├── EmotionsScreen
├── ConversationScreen
├── CustomPhrasesScreen
└── SettingsScreen

Shared Components:
├── BigButton
└── PhraseButton

Services:
└── TTSService
```

**Data Flow:**

1. User interaction triggers component event
2. Component calls TTS service
3. Service handles speech synthesis
4. Visual feedback provided to user
5. State updates if needed
6. Changes persisted to AsyncStorage

**State Management:**

- Local component state for UI
- AsyncStorage for persistence
- No global state needed (simple app)

### Text-to-Speech Implementation

**Service: TTSService**

**Features:**

- Singleton pattern
- Lazy initialization
- Multi-language support
- Configurable speed and pitch

**Languages:**

- Arabic: `ar-SA` (Saudi Arabic as fallback for Lebanese)
- English: `en-US`
- French: `fr-FR`

**Configuration:**

- Default rate: 0.7 (slightly slow for clarity)
- Default pitch: 1.0 (normal)
- Adjustable rate: 0.3 - 1.5

**Methods:**

```typescript
- initialize(): Promise<void>
- speak(text: string, language: 'ar'|'en'|'fr'): Promise<void>
- stop(): Promise<void>
- setRate(rate: number): Promise<void>
```

**Error Handling:**

- Graceful degradation if TTS unavailable
- Console logging for debugging
- No app crashes on TTS failure

### Data Storage

**AsyncStorage Keys:**

- `@custom_phrases` - Array of CustomPhrase objects
- `@app_settings` - AppSettings object

**Data Persistence:**

- Saves immediately on changes
- Loads on app/screen mount
- JSON serialization
- No expiration

**Storage Limits:**

- AsyncStorage: ~6MB typical limit
- Custom phrases: Unlimited (practical limit ~1000)
- No cloud backup (privacy by design)

### Performance Requirements

**Response Times:**

- Button tap to visual feedback: <50ms
- TTS speech start: <1 second
- Screen navigation: <200ms
- AsyncStorage read: <100ms
- AsyncStorage write: <500ms

**Memory:**

- Base memory: <50MB
- With TTS active: <100MB
- Maximum custom phrases: 1000

**Battery:**

- Minimal impact when not speaking
- TTS increases battery usage during speech
- No background processes

---

## User Interface Design

### Design System

**Color Palette:**

**Primary Colors:**

- Green: `#4CAF50` - Positive actions, needs met
- Red: `#F44336` - Pain, emergency, negative
- Orange: `#FF9800` - Emotions, warnings
- Blue: `#2196F3` - Information, conversation
- Purple: `#9C27B0` - Special features

**Secondary Colors:**

- Cyan: `#00BCD4`
- Teal: `#009688`
- Amber: `#FFC107`
- Brown: `#795548`
- Grey: `#9E9E9E`

**Background:**

- App background: `#F5F5F5` (light grey)
- Card background: `#FFFFFF` (white)
- Modal overlay: `rgba(0, 0, 0, 0.5)`

**Text Colors:**

- Primary text: `#333333` (dark grey)
- Secondary text: `#666666` (medium grey)
- Disabled text: `#999999` (light grey)
- White text: `#FFFFFF`

**Typography:**

**Arabic Text:**

- Display: 32-36px, bold
- Headline: 24-28px, bold
- Body Large: 20-22px, bold
- Body: 18px, regular
- Caption: 14-16px, regular

**English Text:**

- Body: 16-18px, regular
- Caption: 14px, regular

**Font Weight:**

- Bold: 700
- Regular: 400

### Layout Specifications

**Home Screen:**

- Button size: 90% width, 140px height
- Spacing: 12px vertical margin
- Padding: 20px horizontal
- Bottom buttons: 150px width, 60px height

**Category Screens:**

- Grid: 2 columns
- Button: 45% width, 120px height
- Gap: 8px between buttons
- Padding: 10px horizontal, 20px vertical

**Custom Phrases Grid:**

- Columns: 2
- Card width: 45%
- Card components:
  - Phrase area: 100% width, colored background
  - Action area: 50% each, divided horizontally

**Settings Screen:**

- Full width sections
- Padding: 20px all sides
- Section spacing: 15px vertical
- Rounded corners: 15px

### Component Specifications

**BigButton (Home Screen):**

```typescript
Dimensions: {
  width: '90%',
  height: 140px,
  borderRadius: 20px
}
Visual: {
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5
}
Content: {
  icon: 60x60px,
  text: 32px bold,
  flexDirection: 'row',
  alignItems: 'center'
}
```

**PhraseButton:**

```typescript
Dimensions: {
  width: '45%',
  height: 120px,
  borderRadius: 15px
}
Visual: {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4
}
Content: {
  icon: 40px,
  arabicText: 20px bold,
  englishText: 14px regular
}
States: {
  normal: opacity 1.0,
  speaking: opacity 0.7, scale 0.98
}
```

### Accessibility Features

**Touch Targets:**

- Minimum: 120px x 120px
- Recommended: 140px x 140px
- Spacing: 8px minimum between targets

**Visual Feedback:**

- Button press: Opacity 0.7 + scale 0.98
- Active state: Border or background change
- Loading: Activity indicator overlay

**Text Legibility:**

- Minimum text: 14px
- Body text: 18px
- Headlines: 24px+
- Line spacing: 1.2-1.5x font size

**Color Contrast:**

- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: Clear visual distinction

---

## User Flows

### Flow 1: First Time User Setup

```
1. User opens app for first time
   ↓
2. App displays Home Screen
   - TTS service initializes in background
   - No splash screen (instant access)
   ↓
3. User taps "الإعدادات" (Settings)
   ↓
4. User adjusts speech speed
   - Drags slider
   - Taps "اختبار الصوت" to test
   - Finds comfortable speed
   ↓
5. User returns to Home Screen
   ↓
6. Ready to communicate!
```

**Time to Complete:** 1-2 minutes
**User Effort:** Low
**Success Criteria:** User has tested voice and is comfortable

---

### Flow 2: Express Basic Need

```
1. User on Home Screen
   ↓
2. User feels hungry
   ↓
3. User taps "احتياجات أساسية" (Green button)
   ↓
4. Basic Needs screen displays
   ↓
5. User sees "جوعان" button with 🍽️ icon
   ↓
6. User taps button
   ↓
7. App speaks: "جوعان" (Hungry)
   ↓
8. Family member responds
   ↓
9. Communication successful!
```

**Time to Complete:** 5-10 seconds
**Taps Required:** 2
**Success Criteria:** Need communicated clearly

---

### Flow 3: Report Pain

```
1. User experiencing pain
   ↓
2. User taps "موقع الألم" (Red button)
   ↓
3. Pain Location screen displays
   ↓
4. User sees intensity selector at top
   ↓
5. User taps "قوي" (Severe) - turns red
   ↓
6. User scrolls to find body part
   ↓
7. User taps "راسي" (Head) button
   ↓
8. App speaks: "عندي وجع قوي راسي"
   (I have severe pain in my head)
   ↓
9. If needs doctor, user taps quick phrase:
   "بدي دكتور" (I need a doctor)
   ↓
10. Family member takes action
```

**Time to Complete:** 10-15 seconds
**Taps Required:** 3
**Success Criteria:** Pain location and intensity communicated

---

### Flow 4: Participate in Conversation

```
1. Family having conversation
   ↓
2. Someone asks user a question
   ↓
3. User wants to respond "Yes"
   ↓
4. User taps "محادثة" (Blue button)
   ↓
5. Conversation screen displays
   ↓
6. User sees "ردود أساسية" section
   ↓
7. User taps "أيوة" (Yes) with ✅
   ↓
8. App speaks: "أيوة"
   ↓
9. Conversation continues
   ↓
10. User later wants to express opinion
   ↓
11. User taps "فكرة حلوة" (Good idea)
   ↓
12. App speaks phrase
   ↓
13. Family acknowledges input
```

**Time to Complete:** 5-10 seconds per response
**Taps Required:** 2 per phrase
**Success Criteria:** User participates meaningfully

---

### Flow 5: Add Custom Phrase

```
1. User wants to add "بدي أشوف التلفزيون"
   (I want to watch TV)
   ↓
2. User (or family member) taps "عبارات مخصصة"
   ↓
3. Custom Phrases screen displays
   ↓
4. User taps "➕ أضف عبارة جديدة"
   ↓
5. Modal form opens
   ↓
6. User types Arabic text:
   "بدي أشوف التلفزيون"
   ↓
7. User types English (optional):
   "I want to watch TV"
   ↓
8. User scrolls emoji picker
   ↓
9. User selects 📺 emoji
   ↓
10. User ensures "عربي" language selected
   ↓
11. User taps "حفظ" (Save)
   ↓
12. Modal closes
   ↓
13. New phrase appears in grid
   ↓
14. User taps new phrase to test
   ↓
15. App speaks: "بدي أشوف التلفزيون"
   ↓
16. Phrase saved for future use!
```

**Time to Complete:** 2-3 minutes
**User Effort:** Medium (typing required)
**Success Criteria:** Phrase saved and works correctly

---

### Flow 6: Emergency Situation

```
SCENARIO: User in severe pain, needs immediate help

1. User grabs phone (always nearby)
   ↓
2. Opens app (on home screen)
   ↓
3. Taps "موقع الألم" (RED - stands out)
   ↓
4. Screen loads
   ↓
5. User sees "Quick Phrases" section
   ↓
6. User taps "عندي وجع كتير"
   (I'm in a lot of pain)
   ↓
7. App speaks LOUDLY
   ↓
8. Family member hears
   ↓
9. User then taps "بدي دكتور"
   (I need a doctor)
   ↓
10. Family member calls doctor
   ↓
11. Crisis communicated successfully
```

**Time to Complete:** 10-15 seconds
**Critical Path:** 3 taps maximum
**Success Criteria:** Help arrives quickly

---

## Success Metrics

### Primary Metrics (User Success)

**1. Daily Active Usage**

- **Target**: User communicates 10+ times per day
- **Measurement**: Track app opens and phrase usage
- **Success Indicator**: Consistent daily use over 30 days

**2. Communication Effectiveness**

- **Target**: 80% of needs successfully communicated
- **Measurement**: Family feedback survey
- **Success Indicator**: Reduced frustration, increased independence

**3. Time to Communicate**

- **Target**: Express need in <15 seconds
- **Measurement**: Time from app open to phrase spoken
- **Success Indicator**: Faster than alternative methods

**4. Custom Phrase Adoption**

- **Target**: User adds 5+ custom phrases in first week
- **Measurement**: Count of custom phrases created
- **Success Indicator**: App personalized to user needs

### Secondary Metrics (App Quality)

**5. Technical Performance**

- **Target**: <1 second TTS response time
- **Measurement**: Time from tap to speech start
- **Success Indicator**: Instant feel, no delays

**6. App Stability**

- **Target**: Zero crashes per session
- **Measurement**: Crash reports
- **Success Indicator**: Reliable, always available

**7. User Satisfaction**

- **Target**: 4.5/5 satisfaction rating
- **Measurement**: Family and user feedback
- **Success Indicator**: Would recommend to others

### Qualitative Success Indicators

**User Independence:**

- Can express needs without assistance
- Participates in family conversations
- Uses app spontaneously (not prompted)
- Shows confidence when using app

**Family Impact:**

- Reduced caregiver stress
- Better understanding of user needs
- More inclusive family interactions
- Peace of mind

**User Dignity:**

- Maintains autonomy
- Clear, understandable communication
- Doesn't feel patronized
- Expresses complex thoughts

---

## Future Enhancements

### Phase 2: Extended Features

**1. Voice Recording for Practice**

- Record user attempting words
- Compare to TTS pronunciation
- Track improvement over time
- Share recordings with speech therapist

**2. Conversation History**

- Log of phrases used
- Timestamp and frequency
- Useful for medical appointments
- Privacy controls (can be disabled)

**3. WhatsApp Integration**

- Send phrases as text messages
- Share to family group chat
- Pre-configured contacts
- One-tap sharing

**4. Picture-Based Communication**

- Photo library of common items
- Take pictures of new items
- Associate phrases with images
- Visual + audio communication

**5. Scheduled Reminders**

- Medicine reminders
- Meal times
- Appointment alerts
- Daily routine support

### Phase 3: Advanced Features

**6. Phrase Suggestions**

- AI suggests relevant phrases based on time/context
- Learning from usage patterns
- Smart predictions
- Reduces navigation time

**7. Multi-User Profiles**

- Different users on same device
- Separate custom phrase libraries
- Individual settings
- Family account system

**8. Progress Tracking**

- Speech improvement metrics
- Usage statistics dashboard
- Share reports with doctor
- Motivational feedback

**9. Offline Voice Quality**

- Download higher quality TTS voices
- More natural pronunciation
- Dialect-specific options
- Larger file size but better quality

**10. Wearable Integration**

- Smart watch app
- Quick access buttons
- Emergency alert
- Haptic feedback

### Phase 4: Healthcare Integration

**11. Medical Professional Portal**

- Therapist can add custom phrases
- Track patient progress remotely
- Adjust difficulty levels
- Treatment plan integration

**12. Emergency Services**

- One-tap call emergency services
- Auto-send location
- Medical information card
- ICE (In Case of Emergency) info

**13. Symptom Diary**

- Track pain levels over time
- Note changes in condition
- Generate reports for doctor
- Medication tracking

### Design Improvements

**14. Dark Mode**

- Eye-friendly at night
- OLED battery savings
- User preference
- Auto-switch based on time

**15. Larger Text Option**

- Accessibility for vision impairment
- 3 size options: Normal, Large, Extra Large
- Maintains button layout
- System font size override

**16. Gesture Shortcuts**

- Swipe patterns for common phrases
- Reduce taps needed
- Customizable gestures
- Optional feature (can disable)

**17. Widget Support**

- Home screen widgets
- Quick access to frequent phrases
- No app open needed
- Configurable phrases

---

## Appendix

### Glossary

**TTS**: Text-to-Speech - Technology that converts written text into spoken words

**AsyncStorage**: React Native's local data storage system for saving user data on device

**Haptic Feedback**: Vibration response when tapping buttons

**Dysarthria**: Difficulty speaking caused by muscle weakness

**Aphasia**: Language disorder affecting ability to communicate

**RTL**: Right-to-Left text direction (for Arabic)

**API Level**: Android version number (e.g., API 21 = Android 5.0)

**Singleton**: Software design pattern ensuring only one instance of a service exists

**Modal**: Popup window that requires user interaction before returning to main content

**CRUD**: Create, Read, Update, Delete - Basic data operations

### References

**Design Resources:**

- Material Design Guidelines (Google)
- iOS Human Interface Guidelines (for UX patterns)
- W3C Accessibility Guidelines (WCAG 2.1)

**Medical Context:**

- Post-stroke communication disorders
- Augmentative and Alternative Communication (AAC) devices
- Speech therapy best practices

**Cultural Context:**

- Lebanese Arabic dialect phrases
- Middle Eastern family communication patterns
- Multilingual households (Arabic/English/French)

### Version History

**v1.0 (Current) - November 2025**

- Initial release
- 7 core screens
- 100+ pre-programmed phrases
- Custom phrases feature
- Settings and customization
- TTS in 3 languages
- Offline functionality

---

## Document Control

**Created:** November 14, 2025
**Author:** Mohamad (Founding Engineer)
**Status:** Approved for Development
**Next Review:** After user testing (estimated 2-4 weeks)

**Approval Signatures:**

- Product Owner: ✅
- Development: ✅
- User Representative (Family): ⏳ Pending

---

## Contact

**For Questions About This PRD:**

- Product Owner: Mohamad
- Role: Founding Engineer, RemotelyX
- Location: Beirut, Lebanon

**For Technical Implementation:**

- Repository: `/mnt/user-data/outputs/UncleCommApp`
- Documentation: See README.md and related docs

---

**End of Product Requirements Document**

---

_This document represents a complete specification for قول (Oul), a communication app designed with love and care for individuals with speech difficulties. Every feature, color, and button has been thoughtfully designed to empower users to communicate with dignity and independence._

_بالتوفيق! Good luck! Bonne chance!_ 🌟
