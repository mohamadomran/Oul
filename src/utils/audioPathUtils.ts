export const convertAudioPath = (audioFile: string): string => {
  const cleanFileName = audioFile.endsWith('.mp3')
    ? audioFile.slice(0, -4)
    : audioFile;

  // Add subdirectory prefix based on audioFile name
  if (cleanFileName.startsWith('basic_needs_')) {
    const fileName = cleanFileName.replace('basic_needs_', '');
    return `basic_needs/${fileName}.mp3`;
  } else if (cleanFileName.startsWith('emotions_')) {
    const fileName = cleanFileName.replace('emotions_', '');
    return `emotions/${fileName}.mp3`;
  } else if (cleanFileName.startsWith('conversation_')) {
    const fileName = cleanFileName.replace('conversation_', '');
    return `conversation/${fileName}.mp3`;
  } else if (cleanFileName.startsWith('pain_')) {
    const fileName = cleanFileName.replace('pain_', '');
    return `pain/${fileName}.mp3`;
  }

  // Return with .mp3 extension if no prefix matched
  return `${cleanFileName}.mp3`;
};
