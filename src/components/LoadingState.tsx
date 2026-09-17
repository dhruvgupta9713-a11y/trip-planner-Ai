import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4 animate-pulse">
      {/* Loading Status Indicator */}
      <div className="flex flex-col items-center justify-center text-center mb-10 py-4">
        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-emerald-950/80 to-slate-900 border border-emerald-500/30 rounded-full mb-4 shadow-xl shadow-emerald-950/40">
          <Compass className="w-7 h-7 text-emerald-300 animate-spin" />
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-100 mb-1.5 font-heading bg-gradient-to-r from-amber-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
          Crafting your custom adventure...
        </h3>
        <p className="text-xs text-emerald-300/80 font-medium font-sans">Consulting Gemini AI travel guide & building your bespoke itinerary</p>
      </div>

      {/* Skeleton Trip Header */}
      <div className="glass-panel border border-slate-800/80 rounded-3xl p-6 mb-6">
        <div className="h-7 bg-slate-800/80 rounded-xl w-1/3 mb-3.5"></div>
        <div className="h-4 bg-slate-800/60 rounded-lg w-1/4 mb-4"></div>
        <div className="space-y-2.5">
          <div className="h-3.5 bg-slate-800/40 rounded-lg w-full"></div>
          <div className="h-3.5 bg-slate-800/40 rounded-lg w-5/6"></div>
        </div>
      </div>

      {/* Skeleton Day Cards */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="glass-panel border border-slate-800/80 rounded-3xl overflow-hidden">
            {/* Day Bar Skeleton */}
            <div className="p-4.5 bg-slate-900/40 flex justify-between items-center border-b border-slate-800/60">
              <div className="flex items-center space-x-3.5 w-1/2">
                <div className="w-10 h-10 bg-slate-800/80 rounded-2xl"></div>
                <div className="h-4 bg-slate-800/80 rounded-lg w-2/3"></div>
              </div>
              <div className="w-6 h-6 bg-slate-800/80 rounded-lg"></div>
            </div>
            
            {/* Stop Cards Skeletons */}
            <div className="p-4 space-y-3">
              {[1, 2].map((j) => (
                <div key={j} className="p-4.5 bg-slate-900/30 border border-slate-800/60 rounded-2xl flex space-x-4">
                  <div className="w-12 h-6 bg-slate-800/80 rounded-lg"></div>
                  <div className="flex-1 space-y-2.5">
                    <div className="h-4.5 bg-slate-800/80 rounded-lg w-1/3"></div>
                    <div className="h-3.5 bg-slate-800/50 rounded-lg w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
