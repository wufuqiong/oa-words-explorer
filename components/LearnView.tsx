import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { OA_WORDS } from '../constants';
import { playTextToSpeech } from '../services/Service';
import Button from './Button';

const LearnView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isWordPlaying, setIsWordPlaying] = useState(false);
  const [isSentencePlaying, setIsSentencePlaying] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const currentWord = OA_WORDS[currentIndex];

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSpeechSupported('speechSynthesis' in window);
  }, []);

  // Define light color palettes for kids
  const FRONT_COLORS = [
    'bg-red-50 border-red-200',
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-yellow-50 border-yellow-200',
    'bg-purple-50 border-purple-200',
    'bg-pink-50 border-pink-200',
    'bg-indigo-50 border-indigo-200',
    'bg-orange-50 border-orange-200',
  ];

  const BACK_COLORS = [
    'bg-red-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-orange-100',
  ];

  // Get colors based on current index
  const frontColor = FRONT_COLORS[currentIndex % FRONT_COLORS.length];
  const backColor = BACK_COLORS[currentIndex % BACK_COLORS.length];

  const handleNext = () => {
    setIsFlipped(false);
    setIsWordPlaying(false);
    setIsSentencePlaying(false);
    setCurrentIndex((prev) => (prev + 1) % OA_WORDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIsWordPlaying(false);
    setIsSentencePlaying(false);
    setCurrentIndex((prev) => (prev - 1 + OA_WORDS.length) % OA_WORDS.length);
  };

  const handlePlayWordAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWordPlaying || !isSpeechSupported) return;
    
    setIsWordPlaying(true);
    try {
      console.log('Playing word:', currentWord.word);
      await playTextToSpeech(currentWord.word);
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Audio playback failed. Please check your browser settings.');
    } finally {
      // Reset after a delay to allow audio to complete
      setTimeout(() => setIsWordPlaying(false), 500);
    }
  };

  const handlePlaySentenceAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSentencePlaying || !isSpeechSupported) return;
    
    setIsSentencePlaying(true);
    try {
      console.log('Playing sentence:', currentWord.sentence);
      await playTextToSpeech(currentWord.sentence);
    } catch (error) {
      console.error('Error playing sentence audio:', error);
      alert('Audio playback failed. Please check your browser settings.');
    } finally {
      setTimeout(() => setIsSentencePlaying(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] gap-8 p-4">
      <div className="text-center mb-2">
        <h2 className="text-4xl font-bold text-blue-600">Flashcards</h2>
        <p className="text-gray-500 text-lg">Tap the card to flip!</p>
        {!isSpeechSupported && (
          <p className="text-red-500 text-sm mt-2">Audio not supported in your browser</p>
        )}
      </div>

      <div 
        className="relative w-full max-w-sm aspect-[4/5] md:w-96 md:h-[32rem] cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className={`absolute w-full h-full backface-hidden rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-6 text-center ${frontColor}`}>
             <div className="text-[11rem] md:text-[12rem] mb-6 floating leading-none select-none">{currentWord.emoji}</div>
             <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-2 tracking-wide">{currentWord.word}</div>
             <p className="text-lg text-gray-400 mt-4 font-medium uppercase tracking-wider">Tap to see meaning</p>
             
             <button 
               onClick={handlePlayWordAudio}
               disabled={!isSpeechSupported}
               className={`mt-6 p-5 rounded-full ${
                 !isSpeechSupported ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                 isWordPlaying ? 'bg-blue-200 text-blue-700' : 'bg-blue-100 text-blue-500 hover:bg-blue-200'
               } transition-colors`}
             >
               <Volume2 size={44} />
             </button>
          </div>

          {/* Back */}
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-8 text-center ${backColor}`}>
            <div className="text-8xl mb-4 opacity-30">{currentWord.emoji}</div>
            <h3 className="text-7xl font-bold mb-2 text-gray-800">{currentWord.word}</h3>
            <h4 className="text-5xl font-bold mb-8 text-gray-600">{currentWord.chineseWord}</h4>
            
            <button 
              onClick={handlePlayWordAudio}
              disabled={!isSpeechSupported}
              className={`p-4 rounded-full ${
                !isSpeechSupported ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                isWordPlaying ? 'bg-blue-200 text-blue-700' : 'bg-white text-blue-500 hover:bg-blue-100'
              } transition-colors shadow-md`}
            >
              <Volume2 size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Example Sentences Section - Only shown when card is flipped */}
      {isFlipped && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Example Sentences</h3>
            <button 
              onClick={handlePlaySentenceAudio}
              disabled={!isSpeechSupported}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                !isSpeechSupported ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                isSentencePlaying ? 'bg-blue-200 text-blue-700' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              } transition-colors`}
            >
              <Volume2 size={20} />
              <span className="font-medium">Play Sentence</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-2xl leading-relaxed font-medium text-gray-800 mb-2">"{currentWord.sentence}"</p>
              <p className="text-lg text-gray-500">English</p>
            </div>
            <div className="text-center">
              <p className="text-2xl leading-relaxed font-medium text-gray-800 mb-2">{currentWord.chineseSentence}</p>
              <p className="text-lg text-gray-500">中文</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-8">
        <Button variant="secondary" size="lg" onClick={handlePrev} icon={<ChevronLeft size={32} />}>
          Prev
        </Button>
        <span className="text-3xl font-bold text-gray-400 w-24 text-center">
          {currentIndex + 1} / {OA_WORDS.length}
        </span>
        <Button variant="secondary" size="lg" onClick={handleNext}>
          Next <ChevronRight size={32} className="ml-2 inline" />
        </Button>
      </div>
    </div>
  );
};

export default LearnView;