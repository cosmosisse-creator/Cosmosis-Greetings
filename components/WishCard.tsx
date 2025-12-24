
import React from 'react';
import { GeneratedWish } from '../types';
import { Copy, Sparkles, Check, Send } from 'lucide-react';

interface WishCardProps {
  wish: GeneratedWish | null;
  loading: boolean;
}

const WishCard: React.FC<WishCardProps> = ({ wish, loading }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    if (!wish) return;
    const fullText = `${wish.subjectLine}\n\n${wish.text}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full glass rounded-[40px] p-12 flex flex-col items-center justify-center min-h-[400px] border-indigo-500/30">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-[3px] border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-[3px] border-purple-500/0 border-b-purple-500 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" size={28} />
        </div>
        <p className="text-indigo-300 font-bold tracking-[0.2em] text-xs uppercase animate-pulse">
          Sourcing stardust for your message
        </p>
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="w-full glass rounded-[40px] p-12 flex flex-col items-center justify-center min-h-[200px] text-slate-500 text-center border-dashed border-white/10 opacity-60">
        <p className="text-sm font-medium">Your personalized seasonal transmission awaits.</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="relative group">
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-[42px] blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        
        <div className="relative glass rounded-[40px] p-10 md:p-16 text-left border-white/10 overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
            <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-12 right-12 w-0.5 h-0.5 bg-white/40 rounded-full"></div>
            <div className="absolute top-6 right-16 w-0.5 h-0.5 bg-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <header className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2 text-indigo-400">
                <Send size={14} />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Transmission Confirmed</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-slate-400" />}
                <span className="text-[10px] font-bold text-slate-300">{copied ? 'COPIED' : 'SAVE'}</span>
              </button>
            </header>

            <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              {wish.subjectLine}
            </h3>

            <div className="w-12 h-1 bg-indigo-500 mb-10 rounded-full"></div>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
              {wish.text}
            </p>

            <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">From</p>
                <p className="text-lg font-black text-white italic">Cosmosis</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5">
                <div className="w-8 h-8 rounded bg-indigo-500/20 border border-indigo-500/40 rotate-12"></div>
                <div className="absolute w-8 h-8 rounded bg-purple-500/20 border border-purple-500/40 -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
