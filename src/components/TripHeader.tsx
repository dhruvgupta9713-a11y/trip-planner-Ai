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
      <div className="relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        {/* Abstract Background Accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {trip.title}
            </h2>
            
            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}</span>
              </div>
            </div>
          </div>

          {/* Reset / Plan New Button */}
          <button
            onClick={onReset}
            className="flex items-center justify-center space-x-2 self-start px-4 py-2 bg-slate-850 hover:bg-slate-800 active:scale-95 text-slate-350 hover:text-white text-xs font-semibold rounded-xl border border-slate-750 hover:border-slate-700 transition-all w-full sm:w-auto"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Plan Another Trip</span>
          </button>
        </div>

        {/* Summary Description */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Trip Overview</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            {trip.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
