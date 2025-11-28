import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper to decode Base64 audio
const decodeAudioData = async (
  base64String: string,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return await audioContext.decodeAudioData(bytes.buffer);
};

export const playTextToSpeech = async (text: string): Promise<void> => {
  if (!API_KEY) {
    console.warn("No API Key provided for TTS");
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Friendly female voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const audioBuffer = await decodeAudioData(base64Audio, audioContext);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    // Fallback to browser TTS if Gemini fails or key is missing
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

export const generateStory = async (words: string[]): Promise<string> => {
  if (!API_KEY) {
    console.warn("No API Key provided for Story Generation");
    return "Please configure the API Key to generate stories.";
  }

  try {
    const prompt = `Write a short, engaging story for children (approx 100 words) that includes the following words: ${words.join(', ')}. 
    Please bold each occurrence of these words by wrapping them in single asterisks like *word*. 
    The story should be fun and easy to read.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate story.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Sorry, I couldn't write a story right now. Please try again later.";
  }
};