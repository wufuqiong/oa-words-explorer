export const playTextToSpeech = async (text: string): Promise<void> => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech Synthesis not supported in this browser");
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 0.8;    // Slower rate for better clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Function to get voices and speak
    const speak = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices); // Debug log
      
      // Try to find an English voice (preferably female)
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') || 
        voice.lang.includes('US') ||
        voice.lang.includes('GB')
      );
      
      if (englishVoice) {
        utterance.voice = englishVoice;
        console.log('Using voice:', englishVoice.name, englishVoice.lang);
      } else if (voices.length > 0) {
        // Fallback to first available voice
        utterance.voice = voices[0];
        console.log('Using fallback voice:', voices[0].name);
      }
      
      // Play the speech
      window.speechSynthesis.speak(utterance);
    };

    // Check if voices are already loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speak();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = speak;
    }
    
  } catch (error) {
    console.error("Error with speech synthesis:", error);
  }
};

// Preload voices when the page loads
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Trigger voices to load
  window.speechSynthesis.getVoices();
  
  // Re-trigger after a short delay to ensure voices are loaded
  setTimeout(() => {
    window.speechSynthesis.getVoices();
  }, 1000);
}