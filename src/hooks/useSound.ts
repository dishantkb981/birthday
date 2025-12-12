import { useEffect, useRef, useState } from 'react';

export function useSound(enabled: boolean = true) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('audio-muted');
    return saved ? JSON.parse(saved) : true;
  });

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem('audio-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const playClick = () => {
    if (isMuted || !enabled) return;

    if (!audioContextRef.current) {
      const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextConstructor) {
        audioContextRef.current = new AudioContextConstructor();
      }
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playSuccess = () => {
    if (isMuted || !enabled) return;

    if (!audioContextRef.current) {
      const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextConstructor) {
        audioContextRef.current = new AudioContextConstructor();
      }
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);

    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return {
    isMuted,
    toggleMute,
    playClick,
    playSuccess,
  };
}
