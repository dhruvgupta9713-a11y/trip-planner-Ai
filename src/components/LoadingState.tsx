import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4 animate-pulse">
      {/* Loading Status Indicator */}
      <div className="flex flex-col items-center justify-center text-center mb-10 py-4">
        <div className="relative flex items-center justify-center w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4 shadow-lg shadow-indigo-500/5">
          <Compass className="w-6 h-6 text-indigo-400 animate-spin" />
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-sky-400 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-1">Planning your adventure...</h3>
        <p className="text-xs text-indigo-400/80 font-medium">Consulting our AI travel guide & crafting your custom itinerary</p>
      </div>

      {/* Skeleton Trip Header */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="h-6 bg-slate-800 rounded-lg w-1/3 mb-3"></div>
        <div className="h-4 bg-slate-800/80 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-800/60 rounded w-full"></div>
          <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
        </div>
      </div>

      {/* Skeleton Day Cards */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-slate-900/30 border border-slate-850 rounded-xl overflow-hidden">
            {/* Day Bar Skeleton */}
            <div className="p-4 bg-slate-850/30 flex justify-between items-center border-b border-slate-800/50">
              <div className="flex items-center space-x-3 w-1/2">
                <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
                <div className="h-4 bg-slate-800 rounded w-2/3"></div>
              </div>
              <div className="w-4 h-4 bg-slate-800 rounded"></div>
            </div>
            
            {/* Stop Cards Skeletons */}
            <div className="p-4 space-y-3">
              {[1, 2].map((j) => (
                <div key={j} className="p-4 bg-slate-850/20 border border-slate-800/40 rounded-lg flex space-x-4">
                  <div className="w-10 h-6 bg-slate-800 rounded-md"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-800/60 rounded w-3/4"></div>
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
