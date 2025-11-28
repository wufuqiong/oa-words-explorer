import React from 'react';
import { OA_WORDS } from '../constants';
import Button from './Button';
import { Printer } from 'lucide-react';

const WorksheetView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  // Helper to shuffle array
  const shuffle = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const shuffledWordsForMatching = shuffle(OA_WORDS);

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-white md:shadow-lg md:my-8">
      {/* Header / Controls - Hidden on Print */}
      <div className="no-print p-8 bg-blue-50 border-b border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4 rounded-t-lg">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Printable Worksheets</h1>
          <p className="text-gray-600 mt-2">Practice writing, matching, and reading offline!</p>
        </div>
        <Button onClick={handlePrint} size="lg" icon={<Printer size={24} />}>
          Print Worksheets
        </Button>
      </div>

      {/* Printable Content */}
      <div className="p-8 md:p-12 space-y-12">
        
        {/* --- Page 1: Writing Practice --- */}
        <section className="print-page">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Writing Practice</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>

            <div className="space-y-6">
                {OA_WORDS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 h-24 border-b border-gray-200 pb-2">
                        {/* Emoji */}
                        <div className="w-24 text-center text-6xl grayscale opacity-70">
                            {item.emoji}
                        </div>
                        
                        {/* Trace Word */}
                        <div className="w-40 text-6xl font-sans font-bold text-gray-200 tracking-wider">
                            {item.word}
                        </div>

                        {/* Writing Lines */}
                        <div className="flex-1 flex flex-col gap-6 px-4">
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 2: Matching --- */}
        <section className="print-page pt-8">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Match the Word</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>
            
            <p className="text-2xl text-gray-600 mb-8 italic">Draw a line from the picture to the correct word.</p>

            <div className="flex justify-between px-12 gap-20">
                {/* Left Column: Emojis */}
                <div className="flex flex-col gap-12 w-1/3">
                    {OA_WORDS.map((item, idx) => (
                        <div key={`left-${idx}`} className="h-32 flex items-center justify-center bg-gray-50 border-2 border-gray-200 rounded-2xl relative">
                            <span className="text-7xl">{item.emoji}</span>
                            <div className="absolute -right-3 w-6 h-6 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Words (Shuffled) */}
                <div className="flex flex-col gap-12 w-1/3">
                    {shuffledWordsForMatching.map((item, idx) => (
                        <div key={`right-${idx}`} className="h-32 flex items-center justify-center border-2 border-gray-200 rounded-2xl relative">
                            <span className="text-5xl font-bold tracking-wide">{item.word}</span>
                            <div className="absolute -left-3 w-6 h-6 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 3: Fill in the Blanks --- */}
        <section className="print-page pt-8">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Fill in the Blanks</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>

            {/* Word Bank */}
            <div className="bg-gray-100 p-8 rounded-3xl mb-12 border-2 border-gray-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-500 uppercase tracking-widest text-center">Word Bank</h3>
                <div className="flex flex-wrap gap-6 justify-center">
                    {OA_WORDS.map(w => (
                        <span key={w.word} className="text-3xl font-bold bg-white px-6 py-3 rounded-xl border border-gray-300 shadow-sm">
                            {w.word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Sentences */}
            <div className="space-y-10 pl-4">
                {OA_WORDS.map((item, idx) => {
                    const parts = item.sentence.split(new RegExp(`(${item.word})`, 'gi'));
                    return (
                        <div key={idx} className="text-3xl leading-loose font-medium flex items-baseline gap-2">
                            <span className="font-bold text-gray-400 mr-4">{idx + 1}.</span>
                            <span>
                            {parts.map((part, pIdx) => (
                                part.toLowerCase() === item.word.toLowerCase() 
                                ? <span key={pIdx} className="inline-block w-48 border-b-4 border-black mx-2 relative top-2"></span> 
                                : <span key={pIdx}>{part}</span>
                            ))}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>

      </div>
    </div>
  );
};

export default WorksheetView;