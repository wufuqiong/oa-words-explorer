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
        <section className="print-page w-full h-[297mm] relative p-8 box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Word Flashcards</h1>
                <div className="text-xl text-gray-400">Cut along dotted lines</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {OA_WORDS.slice(0, 8).map((item, idx) => (
                    <div key={idx} className="break-inside-avoid border-4 border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center h-[60mm]">
                        <div className="flex justify-between w-full items-center px-4">
                             <span className="text-7xl">{item.emoji}</span>
                             <div className="text-right">
                                 <div className="text-5xl font-bold">{item.word}</div>
                                 <div className="text-3xl text-gray-500 mt-1 font-sans">{item.chineseWord}</div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="page-break"></div>

         <section className="print-page w-full h-[297mm] relative p-8 box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Word Flashcards (Cont.)</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {OA_WORDS.slice(8).map((item, idx) => (
                    <div key={idx} className="break-inside-avoid border-4 border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center h-[60mm]">
                        <div className="flex justify-between w-full items-center px-4">
                             <span className="text-7xl">{item.emoji}</span>
                             <div className="text-right">
                                 <div className="text-5xl font-bold">{item.word}</div>
                                 <div className="text-3xl text-gray-500 mt-1 font-sans">{item.chineseWord}</div>
                             </div>
                        </div>
                    </div>
                ))}
                {/* Empty spacers to fill grid if needed */}
                <div className="break-inside-avoid border-4 border-dashed border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center h-[60mm] opacity-20">
                    <span className="text-3xl">Great Job!</span>
                </div>
                <div className="break-inside-avoid border-4 border-dashed border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center h-[60mm] opacity-20">
                    <span className="text-3xl">Keep Learning!</span>
                </div>
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 2: Writing Practice --- */}
        <section className="print-page w-full min-h-[297mm] p-8 box-border">
            <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Writing Practice</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>

            <div className="space-y-5">
                {OA_WORDS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 h-20 border-b border-gray-200 pb-1">
                        {/* Emoji */}
                        <div className="w-20 text-center text-5xl grayscale opacity-70">
                            {item.emoji}
                        </div>
                        
                        {/* Trace Word */}
                        <div className="w-32 text-5xl font-sans font-bold text-gray-200 tracking-wider">
                            {item.word}
                        </div>

                         {/* Chinese Hint */}
                        <div className="w-16 text-xl text-gray-400 font-sans">
                            {item.chineseWord}
                        </div>

                        {/* Writing Lines */}
                        <div className="flex-1 flex flex-col gap-4 px-2">
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                             <div className="border-b-2 border-dashed border-gray-300 h-full w-full relative"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 3: Matching --- */}
        <section className="print-page w-full min-h-[297mm] p-8 box-border pt-12">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Match the Word</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>
            
            <p className="text-2xl text-gray-600 mb-8 italic">Draw a line from the picture to the correct word.</p>

            <div className="flex justify-between px-12 gap-20">
                {/* Left Column: Emojis */}
                <div className="flex flex-col gap-8 w-1/3">
                    {OA_WORDS.map((item, idx) => (
                        <div key={`left-${idx}`} className="h-28 flex items-center justify-center bg-gray-50 border-2 border-gray-200 rounded-2xl relative break-inside-avoid">
                            <span className="text-6xl">{item.emoji}</span>
                            <div className="absolute -right-3 w-5 h-5 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Words (Shuffled) */}
                <div className="flex flex-col gap-8 w-1/3">
                    {shuffledWordsForMatching.map((item, idx) => (
                        <div key={`right-${idx}`} className="h-28 flex flex-col items-center justify-center border-2 border-gray-200 rounded-2xl relative break-inside-avoid">
                            <span className="text-4xl font-bold tracking-wide">{item.word}</span>
                            <span className="text-lg text-gray-400 mt-1">{item.chineseWord}</span>
                            <div className="absolute -left-3 w-5 h-5 bg-black rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className="page-break"></div>

        {/* --- Page 4: Fill in the Blanks --- */}
        <section className="print-page w-full min-h-[297mm] p-8 box-border pt-12">
             <div className="flex justify-between items-end border-b-4 border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl font-bold">Fill in the Blanks</h1>
                <div className="text-xl font-bold text-gray-400">Name: ____________________</div>
            </div>

            {/* Word Bank */}
            <div className="bg-gray-100 p-8 rounded-3xl mb-12 border-2 border-gray-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-500 uppercase tracking-widest text-center">Word Bank</h3>
                <div className="flex flex-wrap gap-6 justify-center">
                    {OA_WORDS.map(w => (
                        <div key={w.word} className="flex flex-col items-center bg-white px-5 py-2 rounded-xl border border-gray-300 shadow-sm">
                            <span className="text-2xl font-bold">{w.word}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sentences */}
            <div className="space-y-8 pl-4">
                {OA_WORDS.map((item, idx) => {
                    const parts = item.sentence.split(new RegExp(`(${item.word})`, 'gi'));
                    return (
                        <div key={idx} className="break-inside-avoid">
                            <div className="text-2xl leading-loose font-medium flex items-baseline gap-2">
                                <span className="font-bold text-gray-400 mr-4">{idx + 1}.</span>
                                <span>
                                {parts.map((part, pIdx) => (
                                    part.toLowerCase() === item.word.toLowerCase() 
                                    ? <span key={pIdx} className="inline-block w-40 border-b-4 border-black mx-2 relative top-1"></span> 
                                    : <span key={pIdx}>{part}</span>
                                ))}
                                </span>
                            </div>
                            <div className="ml-12 text-gray-400 text-lg mt-1">{item.chineseSentence}</div>
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