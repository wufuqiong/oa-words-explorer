export const playTextToSpeech = async (text: string): Promise<void> => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech Synthesis not supported in this browser");
    return;
  }

  try {
    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 1.0;    // Speech rate (0.1 to 10)
    utterance.pitch = 1.0;   // Speech pitch (0 to 2)
    utterance.volume = 1.0;  // Speech volume (0 to 1)
    
    // Try to find a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.lang.includes('en')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    // Play the speech
    window.speechSynthesis.speak(utterance);
    
  } catch (error) {
    console.error("Error with speech synthesis:", error);
  }
};