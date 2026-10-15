"use client";

// Web Audio API Procedural Horror Sound Engine
// Synthesizes atmospheric horror drone, howling storm wind, distant thunder rumble,
// church bell chimes, and interactive witch cackle without external audio files!

class HorrorSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private volume = 0.35;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public startAmbience() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.isPlaying) return;
      this.isPlaying = true;
      this.notify();

      const now = this.ctx.currentTime;

      // 1. Procedural Howling Wind Generator (Filtered Pink Noise with LFO Sweep)
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      this.windSource = this.ctx.createBufferSource();
      this.windSource.buffer = noiseBuffer;
      this.windSource.loop = true;

      // Filter for ghostly wind frequency sweep
      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.frequency.setValueAtTime(320, now);
      windFilter.Q.setValueAtTime(3.5, now);

      // LFO for sweeping wind howling
      const windLFO = this.ctx.createOscillator();
      windLFO.frequency.setValueAtTime(0.18, now); // Slow wind gust
      const windLFOGain = this.ctx.createGain();
      windLFOGain.gain.setValueAtTime(220, now);
      windLFO.connect(windLFOGain);
      windLFOGain.connect(windFilter.frequency);
      windLFO.start(now);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.01, now);
      this.windGain.gain.linearRampToValueAtTime(0.28, now + 3);

      this.windSource.connect(windFilter);
      windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      this.windSource.start(now);

      // 2. Haunting Dark Gothic Drone (Low A-Minor triad: A1 55Hz, E2 82.4Hz, C3 130.8Hz)
      const freqs = [55, 55.4, 82.4, 110, 130.81];
      this.droneOscs = [];

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.linearRampToValueAtTime(0.18, now + 4);
      this.droneGain.connect(this.masterGain);

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.droneGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Add subtle detune beating for creepy eerie dissonance
        osc.detune.setValueAtTime((Math.random() - 0.5) * 14, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(260 + idx * 40, now);

        oscGain.gain.setValueAtTime(0.25 / freqs.length, now);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.droneGain);

        osc.start(now);
        this.droneOscs.push(osc);
      });
    } catch (err) {
      console.warn("Horror audio playback blocked or not supported:", err);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stopAmbience() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.notify();

    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.windGain) {
      this.windGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
    }
    if (this.droneGain) {
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
    }

    setTimeout(() => {
      try {
        if (this.windSource) {
          this.windSource.stop();
          this.windSource.disconnect();
          this.windSource = null;
        }
        this.droneOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        this.droneOscs = [];
      } catch {
        // Ignored
      }
    }, 1600);
  }

  public toggleAmbience() {
    if (this.isPlaying) {
      this.stopAmbience();
    } else {
      this.startAmbience();
    }
  }

  // Sound FX: Thunder Sub-Bass Boom
  public playThunder() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 1.8);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.3);
    } catch {
      // AudioContext unavailable
    }
  }

  // Sound FX: Sinister Witch Cackle
  public playWitchCackle() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Sequence of rapid high-pitched discordant bursts
      const pitches = [740, 880, 810, 920, 840, 980, 780, 860, 720];
      pitches.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const t = now + idx * 0.11;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.linearRampToValueAtTime(freq * 0.85, t + 0.1);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.13);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  // Sound FX: Gothic Church Bell Toll
  public playGothicBell() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now); // A3

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(442, now); // Overtone with dissonance

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 3.3);
      osc2.stop(now + 3.3);
    } catch {
      // AudioContext unavailable
    }
  }

  // Sound FX: Creepy Whisper Stinger on button hover
  public playWhisperStinger() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext unavailable
    }
  }
}

export const horrorAudio = new HorrorSoundEngine();
