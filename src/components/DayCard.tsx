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
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-lg transition-all duration-350">
      {/* Day Header Trigger */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-850/40 transition-colors focus:outline-none focus:bg-slate-850/30"
        aria-expanded={expanded}
      >
        <div className="flex items-start space-x-3.5 mr-4 min-w-0">
          {/* Day Circle Badge */}
          <div className="flex-shrink-0 w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex flex-col items-center justify-center font-black">
            <span className="text-[10px] uppercase font-mono tracking-tighter leading-none opacity-80">Day</span>
            <span className="text-sm mt-0.5 leading-none">{day.day}</span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-100 tracking-tight leading-tight">
                {day.title}
              </h3>
              <span className="text-[10px] font-semibold bg-slate-850 border border-slate-750 text-indigo-400 px-2 py-0.5 rounded-full">
                {stopsCount} {stopsCount === 1 ? 'stop' : 'stops'}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
              {day.summary}
            </p>
          </div>
        </div>

        {/* Chevron Expand Indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-850 border border-slate-750 flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-colors shadow-sm">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Stops Section */}
      {expanded && (
        <div className="p-4 pt-0 border-t border-slate-800/40 bg-slate-900/10 space-y-3.5 transition-all duration-300 animate-in slide-in-from-top-1">
          {/* Timeline Connector Line (only shown if there are multiple stops) */}
          <div className="relative pt-4 space-y-3.5">
            {stopsCount > 1 && (
              <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500/20 via-indigo-500/10 to-indigo-500/20 pointer-events-none hidden md:block"></div>
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
              <div className="text-center py-8 text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-950/20 flex flex-col items-center justify-center p-4">
                <CalendarRange className="w-6 h-6 text-slate-600 mb-2" />
                <p className="text-xs font-semibold">No stops scheduled for this day</p>
                <p className="text-[10px] text-slate-650 mt-1 max-w-[200px]">All stops have been removed from this day's schedule.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
