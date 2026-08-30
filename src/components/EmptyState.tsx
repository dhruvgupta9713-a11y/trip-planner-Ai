import React from 'react';
import { Plane, Map, Calendar, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm shadow-xl p-8 max-w-2xl mx-auto my-8">
      {/* Decorative Floating Icons */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6 bg-slate-850 border border-slate-700/60 rounded-full shadow-inner">
        <Plane className="w-8 h-8 text-indigo-400 transform -rotate-12 animate-bounce-slow" />
        <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-sky-400 animate-pulse" />
      </div>

      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-350 bg-clip-text text-transparent mb-2">
        Your adventure starts here ✈️
      </h3>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
        Describe where you are going, what you love to do, and your duration. We will build a customized day-by-day itinerary instantly.
      </p>

      {/* Feature Pills */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md pt-2 border-t border-slate-800/60 text-left">
        <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-850/30">
          <Map className="w-4 h-4 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-slate-300">Customized Stops</h4>
            <p className="text-[10px] text-slate-500">Curated places matching your interests.</p>
          </div>
        </div>
        <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-850/30">
          <Calendar className="w-4 h-4 text-sky-400 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-slate-300">Day-by-Day Flow</h4>
            <p className="text-[10px] text-slate-500">Perfectly timed schedules and durations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
