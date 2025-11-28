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
      <div className="p-8 md:p-0 space-y-0 text-black">
        
        {/* --- Page 1: Printable Flashcards --- */}
        <section className="print-page w-full min-h-[297mm] p-[15mm] box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-3 mb-6">
                <h1 className="text-3xl font-bold">Word Flashcards</h1>
                <div className="text-lg text-gray-400">Cut along dotted lines</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {OA_WORDS.slice(0, 8).map((item, idx) => (
                    <div key={idx} className="break-inside-avoid border-4 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center h-[55mm]">
                        <div className="flex justify-between w-full items-center px-3">
                             <span className="text-5xl">{item.emoji}</span>
                             <div className="text-right">
                                 <div className="text-3xl font-bold">{item.word}</div>
                                 <div className="text-xl text-gray-500 mt-1 font-sans">{item.chineseWord}</div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 2: Flashcards Continued --- */}
        <section className="print-page w-full min-h-[297mm] p-[15mm] box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-3 mb-6">
                <h1 className="text-3xl font-bold">Word Flashcards (Cont.)</h1>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {OA_WORDS.slice(8).map((item, idx) => (
                    <div key={idx} className="break-inside-avoid border-4 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center h-[55mm]">
                        <div className="flex justify-between w-full items-center px-3">
                             <span className="text-5xl">{item.emoji}</span>
                             <div className="text-right">
                                 <div className="text-3xl font-bold">{item.word}</div>
                                 <div className="text-xl text-gray-500 mt-1 font-sans">{item.chineseWord}</div>
                             </div>
                        </div>
                    </div>
                ))}
                {/* Empty spacers to fill grid if needed */}
                <div className="break-inside-avoid border-4 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center h-[55mm] opacity-20">
                    <span className="text-xl">Great Job!</span>
                </div>
                <div className="break-inside-avoid border-4 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center h-[55mm] opacity-20">
                    <span className="text-xl">Keep Learning!</span>
                </div>
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 3: Writing Practice --- */}
        <section className="print-page w-full min-h-[297mm] p-[15mm] box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-3 mb-6">
                <h1 className="text-3xl font-bold">Writing Practice</h1>
                <div className="text-lg font-bold text-gray-400">Name: ____________________</div>
            </div>

            <div className="space-y-3">
                {OA_WORDS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 h-16 border-b border-gray-200 pb-1">
                        {/* Emoji */}
                        <div className="w-16 text-center text-4xl grayscale opacity-70">
                            {item.emoji}
                        </div>
                        
                        {/* Trace Word */}
                        <div className="w-28 text-3xl font-sans font-bold text-gray-200 tracking-wide">
                            {item.word}
                        </div>

                         {/* Chinese Hint */}
                        <div className="w-14 text-lg text-gray-400 font-sans">
                            {item.chineseWord}
                        </div>

                        {/* Writing Lines */}
                        <div className="flex-1 flex flex-col gap-2 px-2">
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 4: Matching --- */}
        <section className="print-page w-full min-h-[297mm] p-[15mm] box-border pt-8">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-3 mb-6">
                <h1 className="text-3xl font-bold">Match the Word</h1>
                <div className="text-lg font-bold text-gray-400">Name: ____________________</div>
            </div>
            
            <p className="text-xl text-gray-600 mb-6 italic">Draw a line from the picture to the correct word.</p>

            <div className="flex justify-between px-8 gap-12">
                {/* Left Column: Emojis */}
                <div className="flex flex-col gap-4 w-2/5">
                    {OA_WORDS.map((item, idx) => (
                        <div key={`left-${idx}`} className="h-20 flex items-center justify-center bg-gray-50 border-2 border-gray-200 rounded-xl relative break-inside-avoid">
                            <span className="text-4xl">{item.emoji}</span>
                            <div className="absolute -right-2 w-4 h-4 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Words (Shuffled) */}
                <div className="flex flex-col gap-4 w-2/5">
                    {shuffledWordsForMatching.map((item, idx) => (
                        <div key={`right-${idx}`} className="h-20 flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl relative break-inside-avoid">
                            <span className="text-2xl font-bold tracking-wide">{item.word}</span>
                            <span className="text-sm text-gray-400 mt-1">{item.chineseWord}</span>
                            <div className="absolute -left-2 w-4 h-4 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 5: Fill in the Blanks --- */}
        <section className="print-page w-full min-h-[297mm] p-[15mm] box-border pt-8">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-3 mb-6">
                <h1 className="text-3xl font-bold">Fill in the Blanks</h1>
                <div className="text-lg font-bold text-gray-400">Name: ____________________</div>
            </div>

            {/* Word Bank */}
            <div className="bg-gray-100 p-4 rounded-2xl mb-8 border-2 border-gray-300">
                <h3 className="text-xl font-bold mb-4 text-gray-500 uppercase tracking-widest text-center">Word Bank</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {OA_WORDS.map(w => (
                        <div key={w.word} className="flex flex-col items-center bg-white px-3 py-1 rounded-lg border border-gray-300 shadow-sm">
                            <span className="text-lg font-bold">{w.word}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sentences */}
            <div className="space-y-4 pl-2">
                {OA_WORDS.map((item, idx) => {
                    const parts = item.sentence.split(new RegExp(`(${item.word})`, 'gi'));
                    return (
                        <div key={idx} className="break-inside-avoid">
                            <div className="text-lg leading-relaxed font-medium flex items-baseline gap-1">
                                <span className="font-bold text-gray-400 mr-3">{idx + 1}.</span>
                                <span>
                                {parts.map((part, pIdx) => (
                                    part.toLowerCase() === item.word.toLowerCase() 
                                    ? <span key={pIdx} className="inline-block w-32 border-b-2 border-black mx-1 relative top-1"></span> 
                                    : <span key={pIdx}>{part}</span>
                                ))}
                                </span>
                            </div>
                            <div className="ml-8 text-gray-400 text-sm mt-1">{item.chineseSentence}</div>
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