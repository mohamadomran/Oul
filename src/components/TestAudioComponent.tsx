import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import JsonAudioService from '../services/JsonAudioService';

const TestAudioComponent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = JsonAudioService.onPlaybackStateChange(
      (playing: boolean) => {
        console.log('[TestAudioComponent] Playback state changed:', playing);
        setIsPlaying(playing);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTestAudio = async () => {
    console.log('[TestAudioComponent] Testing audio playback...');
    try {
      setIsPlaying(true);
      await JsonAudioService.play('basic_needs', 'bn_water');
      console.log('[TestAudioComponent] Audio played successfully');
      setTimeout(() => setIsPlaying(false), 3000);
    } catch (error) {
      console.error('[TestAudioComponent] Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Audio Test Component
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: isPlaying ? 'green' : 'red',
          marginBottom: 5,
        }}
      >
        Status: {isPlaying ? 'Playing' : 'Stopped'}
      </Text>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
        Test Audio (Basic Needs - Water)
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
          ▶ Play Test Audio
        </Text>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
          ▶ Stop Audio
        </Text>
      </View>
    </View>
  );
};

export default TestAudioComponent;
