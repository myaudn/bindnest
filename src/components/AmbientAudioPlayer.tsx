import React, { useState, useEffect, useRef } from 'react';

interface AmbientAudioPlayerProps {
  initialTrack?: 'rain' | 'fireplace' | 'lofi';
}

export const AmbientAudioPlayer: React.FC<AmbientAudioPlayerProps> = ({ initialTrack = 'rain' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [track, setTrack] = useState<'rain' | 'fireplace' | 'lofi'>(initialTrack);
  const [volume, setVolume] = useState<number>(0.45);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const crackleTimerRef = useRef<number | null>(null);

  // Setup Web Audio synthetic ambient generator
  const startAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      stopAudio();

      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate pink / brown soothing noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter based on selected track
      const filter = ctx.createBiquadFilter();
      if (track === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, ctx.currentTime);
      } else if (track === 'fireplace') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);
      } else {
        // lo-fi warm lowpass
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
      }

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseSourceRef.current = noise;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch {
      // AudioContext fallback
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch {
        // ignored
      }
      noiseSourceRef.current = null;
    }
    if (crackleTimerRef.current) {
      window.clearInterval(crackleTimerRef.current);
      crackleTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      startAudio();
    }
    return () => {
      stopAudio();
    };
  }, [track]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const getTrackLabel = () => {
    switch (track) {
      case 'fireplace':
        return 'Fireplace & Rainstorm';
      case 'lofi':
        return 'Cafe Lo-Fi Resonance';
      default:
        return 'Gentle Cafe Rain';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors shadow-xs"
        title="Cafe Soundscape"
        aria-label="Cafe Soundscape"
      >
        <span className="material-symbols-outlined text-[17px] text-primary">
          {isPlaying ? 'graphic_eq' : 'headphones'}
        </span>
        <span className="hidden sm:inline">Cafe Audio: {isPlaying ? 'Playing' : 'Off'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 w-72 p-4 bg-surface-container-lowest rounded-2xl shadow-xl z-50 border border-surface-container-high flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">music_note</span>
              <span className="font-semibold text-sm text-on-surface">Ambient Cafe Audio</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-outline hover:text-on-surface p-1 rounded"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <p className="text-xs text-on-surface-variant">
            {getTrackLabel()} • {Math.round(volume * 100)}% vol
          </p>

          <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl">
            <button
              onClick={() => setTrack('rain')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                track === 'rain'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Rain
            </button>
            <button
              onClick={() => setTrack('fireplace')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                track === 'fireplace'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Fireplace
            </button>
            <button
              onClick={() => setTrack('lofi')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                track === 'lofi'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Lo-Fi
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-outline">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-primary h-1.5 bg-surface-container-high rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={togglePlay}
            className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isPlaying
                ? 'bg-secondary text-on-secondary hover:bg-secondary/90'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Pause Soundscape' : 'Play Ambient Soundscape'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
