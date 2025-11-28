import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { OA_WORDS } from '../constants';
import { playTextToSpeech } from '../services/Service';
import Button from './Button';

const LearnView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentWord = OA_WORDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % OA_WORDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + OA_WORDS.length) % OA_WORDS.length);
  };

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    
    setIsPlaying(true);
    await playTextToSpeech(currentWord.word);
    // Small delay to allow audio to start
    setTimeout(() => {
        setIsPlaying(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] gap-8 p-4">
      <div className="text-center mb-2">
        <h2 className="text-4xl font-bold text-blue-600">Flashcards</h2>
        <p className="text-gray-500 text-lg">Tap the card to flip!</p>
      </div>

      <div 
        className="relative w-full max-w-sm aspect-[4/5] md:w-96 md:h-[32rem] cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-4 border-blue-100 rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-6 text-center">
             <div className="text-[11rem] md:text-[12rem] mb-6 floating leading-none select-none">{currentWord.emoji}</div>
             <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-2 tracking-wide">{currentWord.word}</div>
             <p className="text-lg text-gray-400 mt-4 font-medium uppercase tracking-wider">Tap to see meaning</p>
             
             <button 
               onClick={handlePlayAudio}
               className={`mt-6 p-5 rounded-full ${isPlaying ? 'bg-blue-200 text-blue-700' : 'bg-blue-100 text-blue-500 hover:bg-blue-200'} transition-colors`}
             >
               <Volume2 size={44} />
             </button>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-blue-500 rotate-y-180 rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-8 text-center text-white">
            <h3 className="text-7xl font-bold mb-2">{currentWord.word}</h3>
            <h4 className="text-5xl font-bold mb-8 text-blue-200">{currentWord.chineseWord}</h4>
            
            <p className="text-4xl leading-relaxed font-medium mb-4">"{currentWord.sentence}"</p>
            <p className="text-2xl leading-relaxed text-blue-100">{currentWord.chineseSentence}</p>
            
            <div className="mt-8 text-8xl opacity-30">{currentWord.emoji}</div>
          </div>
        </div>
      </div>

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