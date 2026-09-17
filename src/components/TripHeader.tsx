import React from 'react';
import { MapPin, Calendar, Undo2, Compass } from 'lucide-react';
import { Itinerary } from '../types/itinerary.ts';

interface TripHeaderProps {
  trip: Itinerary['trip'];
  onReset: () => void;
}

export const TripHeader: React.FC<TripHeaderProps> = ({ trip, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-6">
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-500/15">
        {/* Abstract Background Accents */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2.5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-heading">
              {trip.title}
            </h2>
            
            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}</span>
              </div>
            </div>
          </div>

          {/* Reset / Plan New Button */}
          <button
            onClick={onReset}
            className="flex items-center justify-center space-x-2 self-start px-4.5 py-2.5 bg-slate-900/90 hover:bg-emerald-950/40 active:scale-95 text-slate-300 hover:text-emerald-200 text-xs font-bold rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all w-full sm:w-auto shadow-sm cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Plan Another Trip</span>
          </button>
        </div>

        {/* Summary Description */}
        <div className="mt-5 pt-4.5 border-t border-slate-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trip Overview</span>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {trip.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
