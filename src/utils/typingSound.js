class TypingSound {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      // Create AudioContext only when user interacts
      this.createAudioContext = () => {
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          this.isEnabled = true;
        }
      };
    } catch (error) {
      console.log("Web Audio API not supported");
    }
  }

  // Enable sound on user interaction
  enable() {
    if (!this.audioContext) {
      this.createAudioContext();
    }
  }

  // Create typing sound
  playKeystroke(charType = "normal") {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Different frequencies for different character types
    let frequency = 800;
    let duration = 0.1;

    switch (charType) {
      case "space":
        frequency = 400;
        duration = 0.05;
        break;
      case "punctuation":
        frequency = 1200;
        duration = 0.08;
        break;
      case "newline":
        frequency = 600;
        duration = 0.15;
        break;
      default:
        frequency = 800 + Math.random() * 200; // Add some variation
    }

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );
    oscillator.type = "square";

    // Envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.02,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Get character type for sound variation
  getCharType(char) {
    if (char === " ") return "space";
    if (char === "\n") return "newline";
    if (
      [",", ".", ";", ":", "!", "?", "(", ")", "{", "}", "[", "]"].includes(
        char
      )
    )
      return "punctuation";
    return "normal";
  }
}

export default TypingSound;
