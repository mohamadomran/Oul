#!/usr/bin/env node

/**
 * Generate All Missing Voice Files
 * Uses ElevenLabs API to generate ALL missing audio files with Daniel's voice
 * Reads from audioPhrases.json for source of truth
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9';

// Audio settings
const VOICE_SETTINGS = {
  stability: 0.35, // Natural, not robotic
  similarity_boost: 0.75, // Consistent
  style: 0.1, // Warm & friendly
  use_speaker_boost: true, // Maximum clarity
};

// Output directory
const OUTPUT_DIR = path.join(__dirname, 'android/app/src/main/assets/audio');

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Helper function to save audio file
function saveAudioFile(audioBuffer, filename, category) {
  const categoryDir = path.join(OUTPUT_DIR, category);
  ensureDirectoryExists(categoryDir);

  const filePath = path.join(categoryDir, `${filename}.mp3`);

  try {
    fs.writeFileSync(filePath, audioBuffer);
    console.log(`✅ Saved: ${category}/${filename}.mp3`);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to save: ${category}/${filename}.mp3`,
      error.message,
    );
    return false;
  }
}

// Helper function to generate audio using ElevenLabs
async function generateAudio(text, filename) {
  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not found in environment');
    return null;
  }

  const requestData = JSON.stringify({
    text: text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: VOICE_SETTINGS,
  });

  try {
    console.log(`🎙️ Generating: ${filename}`);

    const response = await new Promise((resolve, reject) => {
      const req = https.request(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            Accept: 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY,
          },
        },
      );

      req.write(requestData);
      req.end(); // CRITICAL: Actually send the request!

      req.on('response', res => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(chunks);
          resolve(data);
        });
      });

      req.on('error', reject);
    });

    const audioBuffer = Buffer.from(await response);
    return audioBuffer;
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return null;
  }
}

// Main generation function
async function generateAllMissingVoices() {
  console.log('🎙️ Starting COMPLETE voice regeneration...');
  console.log(`📝 Voice: Daniel (${VOICE_ID})`);
  console.log(`📊 Settings:`, VOICE_SETTINGS);

  // Read the audio phrases JSON
  const audioPhrasesPath = path.join(
    __dirname,
    'src/data/audioPhrases.json',
  );
  let audioPhrases;

  try {
    const audioPhrasesData = fs.readFileSync(audioPhrasesPath, 'utf8');
    audioPhrases = JSON.parse(audioPhrasesData);
    console.log(
      `📖 Successfully loaded ${
        Object.keys(audioPhrases.audioPhrases).length
      } phrases from JSON`,
    );
  } catch (error) {
    console.error('❌ Failed to load audioPhrases.json:', error.message);
    return;
  }

  let successCount = 0;
  let failCount = 0;
  const categoryStats = {};

  // Generate audio for each phrase
  for (const category of Object.keys(audioPhrases.audioPhrases)) {
    console.log(`\n🎯 Processing category: ${category}`);

    const phrases = audioPhrases.audioPhrases[category];
    categoryStats[category] = { success: 0, fail: 0 };

    for (const phrase of phrases) {
      try {
        console.log(`🎙️ Generating: ${phrase.arabicText}`);

        // Remove .mp3 extension from audioFile since saveAudioFile adds it
        const filename = phrase.audioFile.replace('.mp3', '');

        const audioBuffer = await generateAudio(
          phrase.arabicText,
          filename,
        );

        if (
          audioBuffer &&
          saveAudioFile(audioBuffer, filename, category)
        ) {
          successCount++;
          categoryStats[category].success++;
          console.log(`✅ Success: ${phrase.arabicText}`);
        } else {
          failCount++;
          categoryStats[category].fail++;
          console.log(`❌ Failed: ${phrase.arabicText}`);
        }
      } catch (error) {
        console.error(`❌ Error: ${phrase.arabicText}:`, error.message);
        failCount++;
        categoryStats[category].fail++;
      }
    }
  }

  // Summary
  console.log('\n📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(
    `✅ Successful: ${successCount}/${
      Object.keys(audioPhrases.audioPhrases).length
    }`,
  );
  console.log(
    `❌ Failed: ${failCount}/${Object.keys(audioPhrases.audioPhrases).length}`,
  );
  console.log(
    `📈 Success Rate: ${Math.round(
      (successCount / (successCount + failCount)) * 100,
    )}%`,
  );

  console.log('\n📋 BY CATEGORY:');
  for (const [category, stats] of Object.entries(categoryStats)) {
    const total = stats.success + stats.fail;
    const rate = Math.round((stats.success / total) * 100);
    console.log(`  ${category}: ${stats.success}/${total} (${rate}%)`);
  }

  if (successCount === Object.keys(audioPhrases.audioPhrases).length) {
    console.log('\n🎉 ALL VOICES GENERATED SUCCESSFULLY!');
    console.log('\n🔄 NEXT STEPS:');
    console.log('1. Test the app with new audio files');
    console.log('2. Verify all buttons play correct audio');
    console.log('3. Check logs for JsonAudioService output');
  } else {
    console.log('\n⚠️  SOME VOICES FAILED TO GENERATE');
    console.log('\n🔄 NEXT STEPS:');
    console.log('1. Check the logs above for errors');
    console.log('2. Try running the script again');
    console.log('3. Check ELEVENLABS_API_KEY configuration');
  }
}

// Run the generation
generateAllMissingVoices().catch(error => {
  console.error('💥 Fatal error during generation:', error.message);
  process.exit(1);
});
