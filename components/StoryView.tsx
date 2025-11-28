import React, { useState } from 'react';
import { generateStory, playTextToSpeech } from '../services/geminiService';
import { OA_WORDS } from '../constants';
import Button from './Button';
import { Sparkles, PlayCircle, Loader2 } from 'lucide-react';

const StoryView: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setStory("");
    const words = OA_WORDS.map(w => w.word);
    const result = await generateStory(words);
    setStory(result);
    setLoading(false);
  };

  const renderStory = (text: string) => {
      // Very basic markdown parsing for bolding *word*
      const parts = text.split(/(\*[^*]+\*)/g);
      return parts.map((part, i) => {
          if (part.startsWith('*') && part.endsWith('*')) {
              const word = part.slice(1, -1);
              return <span key={i} className="font-bold text-blue-600 bg-blue-50 px-2 rounded mx-1 border border-blue-100">{word}</span>
          }
          return <span key={i}>{part}</span>
      })
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <div className="inline-block p-6 bg-purple-100 rounded-full mb-6">
            <Sparkles className="text-purple-600 w-20 h-20" />
        </div>
        <h2 className="text-5xl font-bold text-gray-800">Magical OA Story</h2>
        <p className="text-gray-500 mt-4 text-xl max-w-lg mx-auto">
            Ask the AI to weave all our 'oa' words into a fun adventure!
        </p>
      </div>

      {!story && !loading && (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mb-4">
                {OA_WORDS.map(w => (
                    <span key={w.word} className="bg-white border border-gray-200 px-6 py-3 rounded-full text-2xl font-medium text-gray-600 shadow-sm">
                        {w.word}
                    </span>
                ))}
            </div>
            <Button size="lg" onClick={handleGenerate} className="bg-purple-600 hover:bg-purple-700 shadow-purple-500/30 px-10 py-5 text-2xl">
                Generate Story
            </Button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center p-16 text-purple-600">
          <Loader2 className="animate-spin w-20 h-20 mb-8" />
          <p className="font-bold animate-pulse text-2xl">Thinking up a great adventure...</p>
        </div>
      )}

      {story && (
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-purple-100 w-full relative">
            <div className="prose prose-xl md:prose-2xl text-gray-700 leading-relaxed font-medium max-w-none">
                <p>{renderStory(story)}</p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                    variant="primary" 
                    size="lg"
                    icon={<PlayCircle size={32} />} 
                    onClick={() => playTextToSpeech(story.replace(/\*/g, ''))} // Remove asterisks for TTS
                >
                    <span className="text-xl">Read to Me</span>
                </Button>
                <Button variant="secondary" size="lg" onClick={handleGenerate} icon={<Sparkles className="text-purple-500" size={32} />}>
                   <span className="text-xl">New Story</span>
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StoryView;