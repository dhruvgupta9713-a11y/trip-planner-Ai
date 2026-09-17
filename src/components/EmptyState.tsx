import React from 'react';
import { Plane, Map, Calendar, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center rounded-3xl glass-panel shadow-2xl p-8 max-w-2xl mx-auto my-6 border border-emerald-500/10">
      {/* Decorative Floating Icons */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-tr from-emerald-950/80 to-slate-900 border border-emerald-500/25 rounded-full shadow-lg shadow-emerald-950/30">
        <Plane className="w-8 h-8 text-emerald-300 transform -rotate-12 animate-bounce-slow" />
        <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-pulse" />
      </div>

      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-amber-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent mb-2.5 font-heading">
        Your adventure starts here ✈️
      </h3>
      <p className="text-slate-300/80 text-sm max-w-sm leading-relaxed mb-6 font-sans">
        Describe where you are going, what you love to do, and your trip duration. We will build a customized day-by-day itinerary instantly.
      </p>

      {/* Feature Pills */}
      <div className="grid grid-cols-2 gap-3.5 w-full max-w-md pt-4 border-t border-slate-800/80 text-left">
        <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200 font-heading">Bespoke Activities</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Curated places matching your taste.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200 font-heading">Smart Scheduling</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Optimized daily time allocations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
