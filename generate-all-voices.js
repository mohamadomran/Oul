#!/usr/bin/env node

/**
 * Generate All Missing Voice Files
 *
 * Uses ElevenLabs API to generate ALL missing audio files with Daniel's voice
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ElevenLabs configuration from .env
const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY || 'sk_a91442ee1b6922d8be2fe389fe3d44b6b20c55fa7cb60bb1';
const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9'; // Daniel
const VOICE_SETTINGS = {
  stability: 0.35, // Natural, not robotic
  similarity_boost: 0.75, // Consistent
  style: 0.1, // Warm & friendly
  use_speaker_boost: true, // Maximum clarity
};

// ALL sentences that need voice generation
const ALL_SENTENCES_TO_GENERATE = [
  // Navigation phrases
  {
    arabic: 'عبارات مخصصة',
    english: 'Custom Phrases',
    filename: 'custom_phrases_navigation',
    category: 'navigation',
  },
  {
    arabic: 'الإعدادات',
    english: 'Settings',
    filename: 'settings_navigation',
    category: 'navigation',
  },

  // Pain status phrases
  {
    arabic: 'عندي وجع',
    english: 'I have pain',
    filename: 'pain_have_pain',
    category: 'pain_status',
  },
  {
    arabic: 'ما في وجع',
    english: "I don't have pain",
    filename: 'pain_no_pain',
    category: 'pain_status',
  },

  // Pain intensity selector phrases
  {
    arabic: 'خفيف',
    english: 'Light',
    filename: 'pain_intensity_light',
    category: 'pain_intensity',
  },
  {
    arabic: 'متوسط',
    english: 'Moderate',
    filename: 'pain_intensity_moderate',
    category: 'pain_intensity',
  },
  {
    arabic: 'قوي',
    english: 'Severe',
    filename: 'pain_intensity_severe',
    category: 'pain_intensity',
  },

  // Basic Needs (regenerate all for consistency)
  {
    arabic: 'أحتاج ماء',
    english: 'I need water',
    filename: 'basic_needs_water',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج طعام',
    english: 'I need food',
    filename: 'basic_needs_food',
    category: 'basic_needs',
  },
  {
    arabic: 'أريد شاي أو قهوة',
    english: 'I want tea or coffee',
    filename: 'basic_needs_hot_drink',
    category: 'basic_needs',
  },
  {
    arabic: 'أريد عصير',
    english: 'I want juice',
    filename: 'basic_needs_cold_drink',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج دورة المياه',
    english: 'I need the bathroom',
    filename: 'basic_needs_bathroom',
    category: 'basic_needs',
  },
  {
    arabic: 'أريد الاستحمام',
    english: 'I want to shower',
    filename: 'basic_needs_shower',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج التنظيف',
    english: 'I need to be cleaned',
    filename: 'basic_needs_clean',
    category: 'basic_needs',
  },
  {
    arabic: 'أنا متعب',
    english: 'I am tired',
    filename: 'basic_needs_tired',
    category: 'basic_needs',
  },
  {
    arabic: 'أريد النوم',
    english: 'I want to sleep',
    filename: 'basic_needs_sleep',
    category: 'basic_needs',
  },
  {
    arabic: 'أريد الجلوس',
    english: 'I want to sit',
    filename: 'basic_needs_sit',
    category: 'basic_needs',
  },
  {
    arabic: 'أنا حار',
    english: 'I am hot',
    filename: 'basic_needs_hot',
    category: 'basic_needs',
  },
  {
    arabic: 'أنا بارد',
    english: 'I am cold',
    filename: 'basic_needs_cold',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج دوائي',
    english: 'I need my medicine',
    filename: 'basic_needs_medicine',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج مساعدة',
    english: 'I need help',
    filename: 'basic_needs_help',
    category: 'basic_needs',
  },
  {
    arabic: 'أحتاج الطبيب',
    english: 'I need the doctor',
    filename: 'basic_needs_doctor',
    category: 'basic_needs',
  },
  {
    arabic: 'حالة طارئة',
    english: 'Emergency',
    filename: 'basic_needs_emergency',
    category: 'basic_needs',
  },

  // Pain Location (regenerate all for consistency)
  {
    arabic: 'راسي',
    english: 'Head',
    filename: 'pain_head',
    category: 'pain_location',
  },
  {
    arabic: 'عيني',
    english: 'Eye',
    filename: 'pain_eye',
    category: 'pain_location',
  },
  {
    arabic: 'أذني',
    english: 'Ear',
    filename: 'pain_ear',
    category: 'pain_location',
  },
  {
    arabic: 'سني',
    english: 'Tooth',
    filename: 'pain_tooth',
    category: 'pain_location',
  },
  {
    arabic: 'رقبتي',
    english: 'Neck',
    filename: 'pain_neck',
    category: 'pain_location',
  },
  {
    arabic: 'كتفي',
    english: 'Shoulder',
    filename: 'pain_shoulder',
    category: 'pain_location',
  },
  {
    arabic: 'إيدي',
    english: 'Arm',
    filename: 'pain_arm',
    category: 'pain_location',
  },
  {
    arabic: 'صدري',
    english: 'Chest',
    filename: 'pain_chest',
    category: 'pain_location',
  },
  {
    arabic: 'معدتي',
    english: 'Stomach',
    filename: 'pain_stomach',
    category: 'pain_location',
  },
  {
    arabic: 'ظهري',
    english: 'Back',
    filename: 'pain_back',
    category: 'pain_location',
  },
  {
    arabic: 'خصري',
    english: 'Waist',
    filename: 'pain_waist',
    category: 'pain_location',
  },
  {
    arabic: 'رجلي',
    english: 'Leg',
    filename: 'pain_leg',
    category: 'pain_location',
  },
  {
    arabic: 'ركبتي',
    english: 'Knee',
    filename: 'pain_knee',
    category: 'pain_location',
  },
  {
    arabic: 'قدمي',
    english: 'Foot',
    filename: 'pain_foot',
    category: 'pain_location',
  },
  {
    arabic: 'كل جسمي',
    english: 'Whole body',
    filename: 'pain_whole_body',
    category: 'pain_location',
  },

  // Emergency pain phrases (regenerate for consistency)
  {
    arabic: 'عندي وجع كتير',
    english: "I'm in a lot of pain",
    filename: 'pain_emergency_severe',
    category: 'pain_emergency',
  },
  {
    arabic: 'بدي دوا',
    english: 'I need medicine',
    filename: 'pain_emergency_medicine',
    category: 'pain_emergency',
  },
  {
    arabic: 'بدي دكتور',
    english: 'I need a doctor',
    filename: 'pain_emergency_doctor',
    category: 'pain_emergency',
  },

  // Emotions (regenerate all for consistency)
  {
    arabic: 'أنا سعيد',
    english: 'I am happy',
    filename: 'emotions_happy',
    category: 'emotions',
  },
  {
    arabic: 'أنا متحمس',
    english: 'I am excited',
    filename: 'emotions_excited',
    category: 'emotions',
  },
  {
    arabic: 'أنا ممتن',
    english: 'I am grateful',
    filename: 'emotions_grateful',
    category: 'emotions',
  },
  {
    arabic: 'أنا فخور',
    english: 'I am proud',
    filename: 'emotions_proud',
    category: 'emotions',
  },
  {
    arabic: 'أنا مرتاح',
    english: 'I am relaxed',
    filename: 'emotions_relaxed',
    category: 'emotions',
  },
  {
    arabic: 'أشعر بالحب',
    english: 'I feel loved',
    filename: 'emotions_loved',
    category: 'emotions',
  },
  {
    arabic: 'أنا حزين',
    english: 'I am sad',
    filename: 'emotions_sad',
    category: 'emotions',
  },
  {
    arabic: 'أنا غاضب',
    english: 'I am angry',
    filename: 'emotions_angry',
    category: 'emotions',
  },
  {
    arabic: 'أنا محبط',
    english: 'I am frustrated',
    filename: 'emotions_frustrated',
    category: 'emotions',
  },
  {
    arabic: 'أنا قلق',
    english: 'I am worried',
    filename: 'emotions_worried',
    category: 'emotions',
  },
  {
    arabic: 'أنا خائف',
    english: 'I am scared',
    filename: 'emotions_scared',
    category: 'emotions',
  },
  {
    arabic: 'أشعر بالوحدة',
    english: 'I feel lonely',
    filename: 'emotions_lonely',
    category: 'emotions',
  },
  {
    arabic: 'أنا متعب',
    english: 'I am tired',
    filename: 'emotions_tired',
    category: 'emotions',
  },
  {
    arabic: 'أشعر بالملل',
    english: 'I am bored',
    filename: 'emotions_bored',
    category: 'emotions',
  },
  {
    arabic: 'أنا مرتبك',
    english: 'I am confused',
    filename: 'emotions_confused',
    category: 'emotions',
  },
  {
    arabic: 'أنا متفاجئ',
    english: 'I am surprised',
    filename: 'emotions_surprised',
    category: 'emotions',
  },
  {
    arabic: 'أشعر بعدم الراحة',
    english: 'I feel uncomfortable',
    filename: 'emotions_uncomfortable',
    category: 'emotions',
  },
  {
    arabic: 'أشعر بالإرهاق',
    english: 'I feel overwhelmed',
    filename: 'emotions_overwhelmed',
    category: 'emotions',
  },

  // Conversation (regenerate all for consistency)
  {
    arabic: 'مرحبا',
    english: 'Hello',
    filename: 'conversation_hello',
    category: 'conversation',
  },
  {
    arabic: 'صباح الخير',
    english: 'Good morning',
    filename: 'conversation_good_morning',
    category: 'conversation',
  },
  {
    arabic: 'مساء الخير',
    english: 'Good evening',
    filename: 'conversation_good_evening',
    category: 'conversation',
  },
  {
    arabic: 'وداعا',
    english: 'Goodbye',
    filename: 'conversation_goodbye',
    category: 'conversation',
  },
  {
    arabic: 'تصبح على خير',
    english: 'Good night',
    filename: 'conversation_goodnight',
    category: 'conversation',
  },
  {
    arabic: 'نعم',
    english: 'Yes',
    filename: 'conversation_yes',
    category: 'conversation',
  },
  {
    arabic: 'لا',
    english: 'No',
    filename: 'conversation_no',
    category: 'conversation',
  },
  {
    arabic: 'ربما',
    english: 'Maybe',
    filename: 'conversation_maybe',
    category: 'conversation',
  },
  {
    arabic: 'لا أعرف',
    english: "I don't know",
    filename: 'conversation_dont_know',
    category: 'conversation',
  },
  {
    arabic: 'من فضلك',
    english: 'Please',
    filename: 'conversation_please',
    category: 'conversation',
  },
  {
    arabic: 'شكرا',
    english: 'Thank you',
    filename: 'conversation_thank_you',
    category: 'conversation',
  },
  {
    arabic: 'آسف',
    english: 'Sorry',
    filename: 'conversation_sorry',
    category: 'conversation',
  },
  {
    arabic: 'عفوا',
    english: 'Excuse me',
    filename: 'conversation_excuse_me',
    category: 'conversation',
  },
  {
    arabic: 'ماذا؟',
    english: 'What?',
    filename: 'conversation_what',
    category: 'conversation',
  },
  {
    arabic: 'أين؟',
    english: 'Where?',
    filename: 'conversation_where',
    category: 'conversation',
  },
  {
    arabic: 'متى؟',
    english: 'When?',
    filename: 'conversation_when',
    category: 'conversation',
  },
  {
    arabic: 'من؟',
    english: 'Who?',
    filename: 'conversation_who',
    category: 'conversation',
  },
  {
    arabic: 'لماذا؟',
    english: 'Why?',
    filename: 'conversation_why',
    category: 'conversation',
  },
  {
    arabic: 'كيف؟',
    english: 'How?',
    filename: 'conversation_how',
    category: 'conversation',
  },
  {
    arabic: 'انتظر',
    english: 'Wait',
    filename: 'conversation_wait',
    category: 'conversation',
  },
  {
    arabic: 'تعال',
    english: 'Come',
    filename: 'conversation_come',
    category: 'conversation',
  },
  {
    arabic: 'اذهب',
    english: 'Go',
    filename: 'conversation_go',
    category: 'conversation',
  },
  {
    arabic: 'توقف',
    english: 'Stop',
    filename: 'conversation_stop',
    category: 'conversation',
  },
  {
    arabic: 'استمر',
    english: 'Continue',
    filename: 'conversation_continue',
    category: 'conversation',
  },
  {
    arabic: 'أفهم',
    english: 'I understand',
    filename: 'conversation_understand',
    category: 'conversation',
  },
  {
    arabic: 'لا أفهم',
    english: "I don't understand",
    filename: 'conversation_dont_understand',
    category: 'conversation',
  },
  {
    arabic: 'كرر من فضلك',
    english: 'Please repeat',
    filename: 'conversation_repeat',
    category: 'conversation',
  },
  {
    arabic: 'أعلى صوتا',
    english: 'Louder please',
    filename: 'conversation_louder',
    category: 'conversation',
  },
  {
    arabic: 'أوافق',
    english: 'I agree',
    filename: 'conversation_agree',
    category: 'conversation',
  },
  {
    arabic: 'لا أوافق',
    english: 'I disagree',
    filename: 'conversation_disagree',
    category: 'conversation',
  },
  {
    arabic: 'أريد',
    english: 'I want',
    filename: 'conversation_want',
    category: 'conversation',
  },
  {
    arabic: 'أحتاج',
    english: 'I need',
    filename: 'conversation_need',
    category: 'conversation',
  },
  {
    arabic: 'أحب',
    english: 'I like',
    filename: 'conversation_like',
    category: 'conversation',
  },
  {
    arabic: 'لا أحب',
    english: "I don't like",
    filename: 'conversation_dont_like',
    category: 'conversation',
  },
  {
    arabic: 'الآن',
    english: 'Now',
    filename: 'conversation_now',
    category: 'conversation',
  },
  {
    arabic: 'لاحقا',
    english: 'Later',
    filename: 'conversation_later',
    category: 'conversation',
  },
  {
    arabic: 'اليوم',
    english: 'Today',
    filename: 'conversation_today',
    category: 'conversation',
  },
  {
    arabic: 'غدا',
    english: 'Tomorrow',
    filename: 'conversation_tomorrow',
    category: 'conversation',
  },
  {
    arabic: 'جيد',
    english: 'Good',
    filename: 'conversation_good',
    category: 'conversation',
  },
  {
    arabic: 'سيء',
    english: 'Bad',
    filename: 'conversation_bad',
    category: 'conversation',
  },
  {
    arabic: 'حسنا',
    english: 'Okay',
    filename: 'conversation_okay',
    category: 'conversation',
  },
  {
    arabic: 'انتهيت',
    english: 'Finished',
    filename: 'conversation_finished',
    category: 'conversation',
  },
];

/**
 * Generate audio using ElevenLabs API
 */
async function generateAudio(text, filename) {
  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not available');
    return false;
  }

  try {
    console.log(`🎙️ Generating: ${text} -> ${filename}.mp3`);

    const requestData = JSON.stringify({
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: VOICE_SETTINGS,
    });

    const response = await new Promise((resolve, reject) => {
      const req = https.request(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Length': Buffer.byteLength(requestData),
        },
      });

      req.on('response', res => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(chunks);
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data.toString()}`));
          }
        });
      });

      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    return response;
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return false;
  }
}

/**
 * Save audio file to correct location
 */
function saveAudioFile(audioBuffer, filename, category) {
  const outputDir = path.join(
    __dirname,
    '../android/app/src/main/assets/audio',
  );

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${filename}.mp3`);

  try {
    fs.writeFileSync(filePath, audioBuffer);
    console.log(`✅ Saved: ${filename}.mp3 (${category})`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to save ${filename}:`, error.message);
    return false;
  }
}

/**
 * Main generation function
 */
async function generateAllMissingVoices() {
  console.log('🎙️ Starting COMPLETE voice regeneration...');
  console.log(`📝 Voice: Daniel (${VOICE_ID})`);
  console.log(`🎛 Settings:`, VOICE_SETTINGS);
  console.log(`📊 Sentences to generate: ${ALL_SENTENCES_TO_GENERATE.length}`);
  console.log('');

  let successCount = 0;
  let failCount = 0;
  const categoryStats = {};

  for (const sentence of ALL_SENTENCES_TO_GENERATE) {
    console.log(`\n🎯 Processing: ${sentence.category} - ${sentence.arabic}`);

    // Track category stats
    if (!categoryStats[sentence.category]) {
      categoryStats[sentence.category] = { success: 0, fail: 0 };
    }

    // Generate audio
    const audioBuffer = await generateAudio(sentence.arabic, sentence.filename);

    if (audioBuffer) {
      // Save file
      const saved = saveAudioFile(
        audioBuffer,
        sentence.filename,
        sentence.category,
      );
      if (saved) {
        successCount++;
        categoryStats[sentence.category].success++;
      } else {
        failCount++;
        categoryStats[sentence.category].fail++;
      }
    } else {
      failCount++;
      categoryStats[sentence.category].fail++;
    }

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(
    `✅ Successful: ${successCount}/${ALL_SENTENCES_TO_GENERATE.length}`,
  );
  console.log(`❌ Failed: ${failCount}/${ALL_SENTENCES_TO_GENERATE.length}`);
  console.log(
    `📈 Success Rate: ${Math.round(
      (successCount / ALL_SENTENCES_TO_GENERATE.length) * 100,
    )}%`,
  );

  console.log('\n📋 BY CATEGORY:');
  for (const [category, stats] of Object.entries(categoryStats)) {
    console.log(
      `  ${category}: ${stats.success}/${
        stats.success + stats.fail
      } (${Math.round((stats.success / (stats.success + stats.fail)) * 100)}%)`,
    );
  }

  if (successCount === ALL_SENTENCES_TO_GENERATE.length) {
    console.log('\n🎉 ALL VOICES GENERATED SUCCESSFULLY!');
    console.log('📁 Location: android/app/src/main/assets/audio/');
    console.log(
      `🎙️ Total audio files: ${ALL_SENTENCES_TO_GENERATE.length} (all regenerated with Daniel voice)`,
    );
    console.log('\n🔄 NEXT STEPS:');
    console.log('1. Test the app with new audio files');
    console.log('2. Verify all buttons play correct audio');
    console.log('3. Check audio quality and consistency');
  } else {
    console.log('\n⚠️ Some voices failed to generate. Check errors above.');
  }
}

// Run generation
generateAllMissingVoices().catch(error => {
  console.error('💥 Fatal error:', error.message);
  process.exit(1);
});
