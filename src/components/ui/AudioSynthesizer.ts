"use client";

class AmbientCloudAudio {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gain: GainNode | null = null;
  private isPlaying: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();

    // Create low-pass filter for smooth datacenter ambient air
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Master gain
    this.gain = this.ctx.createGain();
    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.filter.connect(this.gain);
    this.gain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx || !this.filter || !this.gain) {
      this.init();
    }
    if (!this.ctx || !this.filter || !this.gain) return;

    try {
      this.osc1 = this.ctx.createOscillator();
      this.osc2 = this.ctx.createOscillator();

      // Deep 55Hz (A1) and harmonic 110Hz (A2) with gentle detune for warm cloud drift
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);

      this.osc1.start();
      this.osc2.start();

      // Gentle fade in
      this.gain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 1.2);
      this.isPlaying = true;
    } catch {
      // Audio context error handling
    }
  }

  public stop() {
    if (!this.ctx || !this.gain) return;
    try {
      this.gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.4);
      setTimeout(() => {
        if (this.osc1) {
          this.osc1.stop();
          this.osc1.disconnect();
          this.osc1 = null;
        }
        if (this.osc2) {
          this.osc2.stop();
          this.osc2.disconnect();
          this.osc2 = null;
        }
        this.isPlaying = false;
      }, 500);
    } catch {
      this.isPlaying = false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cloudAudio = new AmbientCloudAudio();
