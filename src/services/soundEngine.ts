// Web Audio API procedural sound engine + Web Speech API voice narrator

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isVoiceEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopVoice();
    }
    return this.isMuted;
  }

  public toggleVoice(): boolean {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    if (!this.isVoiceEnabled) {
      this.stopVoice();
    }
    return this.isVoiceEnabled;
  }

  // --- Sound Effects using procedural oscillators ---

  public playLaserAttack() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio fallback silent
    }
  }

  public playShieldDeploy() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio fallback
    }
  }

  public playCashRegister() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.2, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.22);
      });
    } catch {
      // Audio fallback
    }
  }

  public playCriticalHit() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'square';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      osc2.frequency.setValueAtTime(180, now);
      osc2.frequency.exponentialRampToValueAtTime(50, now + 0.4);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.42);
      osc2.stop(now + 0.42);
    } catch {
      // Audio fallback
    }
  }

  public playQuizSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.26);
      });
    } catch {
      // Audio fallback
    }
  }

  public playQuizError() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.3);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Audio fallback
    }
  }

  public playVictoryFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const times = [0, 0.12, 0.24, 0.36, 0.52, 0.65];

      melody.forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + times[i]);

        gain.gain.setValueAtTime(0.25, now + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.01, now + times[i] + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + times[i]);
        osc.stop(now + times[i] + 0.38);
      });
    } catch {
      // Audio fallback
    }
  }

  public playUiClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio fallback
    }
  }

  // --- Web Speech API Voice Narrator with Sequential Queue, Pacing & Overlap Prevention ---

  public speechRateMultiplier: number = 1.0;
  private speechKeepAliveInterval: number | null = null;

  public setSpeechRateMultiplier(rate: number) {
    this.speechRateMultiplier = Math.max(0.7, Math.min(1.4, rate));
  }

  public stopVoice() {
    if (this.speechKeepAliveInterval) {
      window.clearInterval(this.speechKeepAliveInterval);
      this.speechKeepAliveInterval = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe catch
      }
      this.currentUtterance = null;
    }
  }

  public speak(
    text: string,
    role: 'hero' | 'villain' | 'narrator' | 'mentor' = 'hero',
    onEnd?: () => void,
    customRate?: number
  ) {
    if (this.isMuted || !this.isVoiceEnabled) {
      if (onEnd) onEnd();
      return;
    }

    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous pending or playing audio immediately before starting new speech
    this.stopVoice();

    // Chrome/Safari speech synthesis fix: resume if synthesis was stuck
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      // Safe catch
    }

    try {
      // Clean speech text removing formatting quotes and bracketed labels
      const cleanText = text.replace(/[«»"]/g, '').trim();
      if (!cleanText) {
        if (onEnd) onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-VE'; // Spanish (Venezuela) Latin American

      const voices = window.speechSynthesis.getVoices();
      // Prioritize Venezuelan and Latin American Spanish voices
      const venezuelanVoice = voices.find(v => 
        v.lang.toLowerCase() === 'es-ve' || 
        v.lang.toLowerCase().replace('_', '-').startsWith('es-ve') ||
        v.name.toLowerCase().includes('venezuela')
      );
      const latinVoice = voices.find(v => 
        v.lang.toLowerCase() === 'es-419' ||
        v.lang.toLowerCase().startsWith('es-co') || // Colombian (neighboring phonetics)
        v.lang.toLowerCase().startsWith('es-mx') ||
        v.lang.toLowerCase().startsWith('es-us') ||
        v.lang.toLowerCase().startsWith('es-cl') ||
        v.lang.toLowerCase().startsWith('es-ar')
      );
      const anySpanishVoice = voices.find(v => v.lang.startsWith('es') || v.lang.includes('es'));

      const selectedVoice = venezuelanVoice || latinVoice || anySpanishVoice || voices[0];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || 'es-VE';
      }

      // Natural, unhurried human pacing for story narration
      const baseMultiplier = customRate !== undefined ? customRate : this.speechRateMultiplier;
      if (role === 'hero') {
        utterance.pitch = 1.02; // Warm, energetic hero cadence
        utterance.rate = 1.0 * baseMultiplier;
      } else if (role === 'villain') {
        utterance.pitch = 0.72; // Deep, imposing villain voice
        utterance.rate = 0.94 * baseMultiplier;
      } else if (role === 'mentor') {
        utterance.pitch = 0.98; // Warm, pedagogical Latin voice
        utterance.rate = 0.96 * baseMultiplier;
      } else {
        // Narrator: calm, clear, evocative storytelling pacing
        utterance.pitch = 1.0;
        utterance.rate = 0.96 * baseMultiplier;
      }

      let hasEnded = false;
      const finishSpeech = () => {
        if (!hasEnded) {
          hasEnded = true;
          if (this.speechKeepAliveInterval) {
            window.clearInterval(this.speechKeepAliveInterval);
            this.speechKeepAliveInterval = null;
          }
          this.currentUtterance = null;
          if (onEnd) onEnd();
        }
      };

      utterance.onend = finishSpeech;
      utterance.onerror = () => {
        finishSpeech();
      };

      this.currentUtterance = utterance;

      // Chrome/Edge/Safari keep-alive heartbeat to prevent speech synthesis freeze on longer narrations
      this.speechKeepAliveInterval = window.setInterval(() => {
        try {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        } catch {
          // Safe catch
        }
      }, 8000);

      // 40ms safety timeout ensures engine initialization
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch {
          finishSpeech();
        }
      }, 40);
    } catch {
      if (onEnd) onEnd();
    }
  }
}

export const soundEngine = new SoundEngine();
