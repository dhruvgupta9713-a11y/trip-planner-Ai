import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CalendarRange } from 'lucide-react';
import { Day } from '../types/itinerary.ts';
import { StopCard } from './StopCard.tsx';

interface DayCardProps {
  day: Day;
  dayIndex: number;
  onCompleteStop: (dayIndex: number, stopId: string) => void;
  onRemoveStop: (dayIndex: number, stopId: string) => void;
  onReorderStop: (dayIndex: number, stopId: string, direction: 'up' | 'down') => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  dayIndex,
  onCompleteStop,
  onRemoveStop,
  onReorderStop
}) => {
  // Default first day to expanded, others to collapsed for a clean look
  const [expanded, setExpanded] = useState(dayIndex === 0);

  const stopsCount = day.stops.length;

  return (
    <div className="glass-panel border border-slate-800/80 hover:border-emerald-500/20 rounded-3xl overflow-hidden shadow-xl transition-all duration-300">
      {/* Day Header Trigger */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between hover:bg-slate-850/40 transition-colors focus:outline-none cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex items-start space-x-4 mr-4 min-w-0">
          {/* Day Circle Badge */}
          <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-amber-500/20 border border-emerald-500/30 text-emerald-300 rounded-2xl flex flex-col items-center justify-center font-black shadow-inner">
            <span className="text-[9px] uppercase font-mono tracking-wider opacity-80">Day</span>
            <span className="text-base font-heading font-extrabold leading-none">{day.day}</span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight leading-tight font-heading">
                {day.title}
              </h3>
              <span className="text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                {stopsCount} {stopsCount === 1 ? 'stop' : 'stops'}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed font-sans">
              {day.summary}
            </p>
          </div>
        </div>

        {/* Chevron Expand Indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-900 border border-slate-750 flex items-center justify-center text-slate-400 group-hover:text-emerald-300 transition-colors shadow-sm">
          {expanded ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Stops Section */}
      {expanded && (
        <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/20 space-y-3.5 transition-all duration-300 animate-in slide-in-from-top-1">
          {/* Timeline Connector Line (only shown if there are multiple stops) */}
          <div className="relative pt-4 space-y-3.5">
            {stopsCount > 1 && (
              <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500/25 via-teal-500/15 to-amber-500/20 pointer-events-none hidden md:block"></div>
            )}

            {stopsCount > 0 ? (
              day.stops.map((stop, stopIndex) => (
                <StopCard
                  key={stop.id}
                  stop={stop}
                  isFirst={stopIndex === 0}
                  isLast={stopIndex === stopsCount - 1}
                  onComplete={() => onCompleteStop(dayIndex, stop.id)}
                  onRemove={() => onRemoveStop(dayIndex, stop.id)}
                  onMoveUp={() => onReorderStop(dayIndex, stop.id, 'up')}
                  onMoveDown={() => onReorderStop(dayIndex, stop.id, 'down')}
                />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40 flex flex-col items-center justify-center p-4">
                <CalendarRange className="w-6 h-6 text-slate-600 mb-2" />
                <p className="text-xs font-semibold text-slate-400">No stops scheduled for this day</p>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">All stops have been removed from this day's schedule.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
