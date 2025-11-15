#!/usr/bin/env node

/**
 * Generate Missing Voice Files
 *
 * Uses ElevenLabs API to generate 5 missing audio files with Daniel's voice
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// ElevenLabs configuration from .env
const ELEVENLABS_API_KEY =
  'sk_9c064638f29a09efa9deb0f913e1ab16e40132d339356f71';

const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9'; // Daniel
const VOICE_SETTINGS = {
  stability: 0.35, // Natural, not robotic
  similarity_boost: 0.75, // Consistent
  style: 0.1, // Warm & friendly
  use_speaker_boost: true, // Maximum clarity
};

// ONLY the 5 missing sentences that need voice generation
const MISSING_SENTENCES = [
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
      voice_id: VOICE_ID,
      model_id: 'eleven_multilingual_v2',
      voice_settings: VOICE_SETTINGS,
      output_format: 'mp3_22050_32',
    });

    const response = await new Promise((resolve, reject) => {
      const req = https.request('https://api.elevenlabs.io/v1/text-to-speech', {
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
async function generateMissingVoices() {
  console.log('🎙️ Starting missing voice generation...');
  console.log(`📝 Voice: Daniel (${VOICE_ID})`);
  console.log(`🎛 Settings:`, VOICE_SETTINGS);
  console.log(`📊 Sentences to generate: ${MISSING_SENTENCES.length}`);
  console.log('');

  let successCount = 0;
  let failCount = 0;
  const categoryStats = {};

  for (const sentence of MISSING_SENTENCES) {
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
  console.log(`✅ Successful: ${successCount}/${MISSING_SENTENCES.length}`);
  console.log(`❌ Failed: ${failCount}/${MISSING_SENTENCES.length}`);
  console.log(
    `📈 Success Rate: ${Math.round(
      (successCount / MISSING_SENTENCES.length) * 100,
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

  if (successCount === MISSING_SENTENCES.length) {
    console.log('\n🎉 ALL MISSING VOICES GENERATED SUCCESSFULLY!');
    console.log('📁 Location: android/app/src/main/assets/audio/');
    console.log(
      `🎙️ Total audio files: ${MISSING_SENTENCES.length} (all generated with Daniel voice)`,
    );
    console.log('\n🔄 NEXT STEPS:');
    console.log('1. Test app with new audio files');
    console.log('2. Verify all buttons play correct audio');
    console.log('3. Check audio quality and consistency');
  } else {
    console.log('\n⚠️ Some voices failed to generate. Check errors above.');
  }
}

// Run generation
generateMissingVoices().catch(error => {
  console.error('💥 Fatal error:', error.message);
  process.exit(1);
});
