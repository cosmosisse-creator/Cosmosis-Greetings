
import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import BackgroundEffect from './components/BackgroundEffect';
import WishCard from './components/WishCard';
import { generateWish } from './services/geminiService';
import { GeneratedWish } from './types';

const LOGO_URL = "https://cosmosis.se/wp-content/uploads/2025/12/Asset-6-scaled.png";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [wish, setWish] = useState<GeneratedWish | null>(null);

  const handleReveal = async () => {
    setLoading(true);
    try {
      const result = await generateWish();
      setWish(result);
    } catch (error) {
      console.error("Failed to generate wish:", error);
      alert("The stars are currently misaligned. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden cosmic-gradient">
      <BackgroundEffect />
      
      {/* Navigation / Logo */}
      <nav className="relative z-10 px-6 py-8 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img 
            src={LOGO_URL} 
            alt="Cosmosis Logo" 
            className="h-10 w-auto object-contain brightness-0 invert" 
          />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <span className="text-indigo-400 flex items-center gap-2">
             Client Appreciation
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
        <div className="space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest text-indigo-400 uppercase">
            <Sparkles size={12} />
            A Special Transmission for You
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-white">
            Thank You for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">Trusting Our Vision.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            As the year closes, we wanted to send a unique message of gratitude. 
            Click below to reveal a cosmic greeting crafted personally for our partnership.
          </p>

          <div className="pt-4">
            <button
              onClick={handleReveal}
              disabled={loading}
              className="group relative inline-flex items-center gap-3 bg-white text-slate-950 hover:bg-indigo-50 font-black px-10 py-5 rounded-full transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin"></div>
                  <span>GENERATING...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>{wish ? 'GENERATE ANOTHER WISH' : 'UNVEIL YOUR GREETING'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <WishCard wish={wish} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt="Cosmosis Logo" 
              className="h-6 w-auto object-contain brightness-0 invert" 
            />
          </div>
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Cosmosis. Framing the future together.
          </p>
          <div className="flex gap-6 text-sm font-semibold text-slate-500">
            <a 
              href="https://www.instagram.com/cosmosis.se/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/company/cosmosisgroup/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white cursor-pointer transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default App;
