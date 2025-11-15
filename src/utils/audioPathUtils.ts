export const convertAudioPath = (audioFile: string): string => {
  if (audioFile.startsWith('basic_needs_')) {
    const filename = audioFile.replace('basic_needs_', '');
    return `audio/basic_needs/${filename}.mp3`;
  } else if (audioFile.startsWith('conversation_')) {
    const filename = audioFile.replace('conversation_', '');
    return `audio/conversation/${filename}.mp3`;
  } else if (audioFile.startsWith('emotions_')) {
    const filename = audioFile.replace('emotions_', '');
    return `audio/emotions/${filename}.mp3`;
  } else if (audioFile.startsWith('pain_')) {
    const filename = audioFile.replace('pain_', '');
    return `audio/pain/${filename}.mp3`;
  } else {
    console.warn('[AudioPathUtils] Unknown audio file pattern:', audioFile);
    return audioFile.endsWith('.mp3') ? audioFile : `${audioFile}.mp3`;
  }
};
