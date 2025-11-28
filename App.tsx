import React, { useState } from 'react';
import Navigation from './components/Navigation';
import LearnView from './components/LearnView';
import QuizView from './components/QuizView';
import StoryView from './components/StoryView';
import WorksheetView from './components/WorksheetView';
import Button from './components/Button';
import { AppMode } from './types';
import { ArrowRight, Printer } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);

  const renderContent = () => {
    switch (mode) {
      case AppMode.LEARN:
        return <LearnView />;
      case AppMode.PRACTICE:
        return <QuizView />;
      case AppMode.STORY:
        return <StoryView />;
      case AppMode.WORKSHEETS:
        return <WorksheetView />;
      case AppMode.HOME:
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
             <div className="mb-10 relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                 <h1 className="relative text-7xl md:text-9xl font-black text-blue-600 tracking-tight mb-2">OA</h1>
                 <p className="relative text-2xl md:text-3xl text-gray-500 font-bold">Word Explorer</p>
             </div>
             
             <div className="grid gap-5 w-full max-w-sm">
                 <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => setMode(AppMode.LEARN)}
                    className="w-full justify-between group py-5"
                 >
                    <span className="text-xl">Start Learning</span> <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                 </Button>
                 <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => setMode(AppMode.PRACTICE)}
                    className="w-full justify-between group py-5"
                 >
                    <span className="text-xl">Practice Games</span> <span className="text-3xl">🎮</span>
                 </Button>
                 <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => setMode(AppMode.STORY)}
                    className="w-full justify-between group bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 py-5"
                 >
                    <span className="text-xl">Magic Story</span> <span className="text-3xl">✨</span>
                 </Button>
                 <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => setMode(AppMode.WORKSHEETS)}
                    className="w-full justify-between group py-5 bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                 >
                    <span className="text-xl">Print Worksheets</span> <Printer className="text-yellow-600" size={28} />
                 </Button>
             </div>

             <div className="mt-16 flex gap-6 text-5xl opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span>🛥️</span>
                <span>🧼</span>
                <span>🍞</span>
                <span>🐐</span>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="fixed top-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm z-40 hidden md:block border-b border-gray-200 no-print">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
              <span className="font-black text-2xl text-blue-600 flex items-center gap-2 cursor-pointer" onClick={() => setMode(AppMode.HOME)}>
                  <span className="text-4xl">⛵</span> OA Explorer
              </span>
          </div>
      </header>
      
      <main className="max-w-5xl mx-auto p-4 pt-8 md:pt-4">
        {renderContent()}
      </main>

      <Navigation currentMode={mode} setMode={setMode} />
    </div>
  );
};

export default App;