export const convertAudioPath = (audioFile: string): string => {
  const cleanFileName = audioFile.endsWith('.mp3')
    ? audioFile.slice(0, -4)
    : audioFile;

  return cleanFileName;
};
