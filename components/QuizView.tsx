import React, { useState, useEffect } from 'react';
import { OA_WORDS } from '../constants';
import { WordItem } from '../types';
import Button from './Button';
import { Volume2, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { playTextToSpeech } from '../services/Service';

const QuizView: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const generateQuestion = () => {
    const randomWord = OA_WORDS[Math.floor(Math.random() * OA_WORDS.length)];
    // Get 3 other random distractors
    const distractors = OA_WORDS
      .filter(w => w.word !== randomWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allOptions = [randomWord, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion(randomWord);
    setOptions(allOptions);
    setAnswered(false);
    setSelectedOption(null);
    setIsCorrect(false);
    
    // Auto play audio for fun
    playTextToSpeech(`Find the word... ${randomWord.word}`);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (word: string) => {
    if (answered || !currentQuestion) return;

    setSelectedOption(word);
    setAnswered(true);

    if (word === currentQuestion.word) {
      setIsCorrect(true);
      setScore(score + 10);
      setStreak(streak + 1);
      playTextToSpeech("Great job!");
    } else {
      setIsCorrect(false);
      setStreak(0);
      playTextToSpeech("Try again next time!");
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
       <div className="w-full flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex flex-col">
            <span className="text-sm text-gray-500 uppercase tracking-wide">Score</span>
            <span className="text-4xl font-bold text-blue-600">{score}</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 uppercase tracking-wide">Streak</span>
            <span className="text-4xl font-bold text-orange-500">🔥 {streak}</span>
         </div>
       </div>

       <div className="text-center mb-10">
         <h2 className="text-3xl font-bold text-gray-800 mb-6">Can you find:</h2>
         <div className="flex items-center justify-center gap-6">
            <h1 className="text-9xl font-bold text-blue-600 underline decoration-wavy decoration-blue-300 pb-4 tracking-wider">{currentQuestion.word}</h1>
             <button 
               onClick={() => playTextToSpeech(currentQuestion.word)}
               className="p-5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
             >
               <Volume2 size={40} />
             </button>
         </div>
       </div>

       <div className="grid grid-cols-2 gap-6 md:gap-8 w-full">
         {options.map((opt) => (
           <button
             key={opt.word}
             onClick={() => handleOptionClick(opt.word)}
             disabled={answered}
             className={`
                relative h-64 md:h-72 rounded-[2rem] border-4 text-[8rem] md:text-[9rem] flex flex-col items-center justify-center transition-all duration-300
                ${answered && opt.word === currentQuestion.word ? 'bg-green-100 border-green-400 ring-4 ring-green-200 scale-105' : ''}
                ${answered && opt.word === selectedOption && selectedOption !== currentQuestion.word ? 'bg-red-50 border-red-300 opacity-50' : ''}
                ${!answered ? 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-lg active:scale-95' : ''}
             `}
           >
             <span className="mb-2 leading-none select-none">{opt.emoji}</span>
             {answered && (
                 <span className={`text-4xl font-bold ${opt.word === currentQuestion.word ? 'text-green-600' : 'text-gray-400'}`}>
                    {opt.word}
                 </span>
             )}
             
             {/* Result Icons */}
             {answered && opt.word === currentQuestion.word && (
                <div className="absolute -top-3 -right-3 bg-green-500 text-white p-3 rounded-full shadow-md">
                    <CheckCircle size={40} />
                </div>
             )}
              {answered && opt.word === selectedOption && selectedOption !== currentQuestion.word && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white p-3 rounded-full shadow-md">
                    <XCircle size={40} />
                </div>
             )}
           </button>
         ))}
       </div>

       {answered && (
         <div className="mt-12 animate-bounce">
           <Button variant="primary" size="lg" onClick={generateQuestion} icon={<RefreshCcw size={32} />}>
             <span className="text-2xl px-4">Next Word</span>
           </Button>
         </div>
       )}
    </div>
  );
};

export default QuizView;