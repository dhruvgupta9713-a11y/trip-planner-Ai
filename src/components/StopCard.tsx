import React from 'react';
import { ArrowUp, ArrowDown, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Stop } from '../types/itinerary.ts';

interface StopCardProps {
  stop: Stop;
  isFirst: boolean;
  isLast: boolean;
  onComplete: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const StopCard: React.FC<StopCardProps> = ({
  stop,
  isFirst,
  isLast,
  onComplete,
  onRemove,
  onMoveUp,
  onMoveDown
}) => {
  // Format stop duration to look friendly
  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} min`;
    const minutes = mins % 60;
    const hrsCalculated = Math.floor(mins / 60);
    return minutes > 0 ? `${hrsCalculated}h ${minutes}m` : `${hrsCalculated}h`;
  };

  // Determine tag styling based on stop category
  const getCategoryStyles = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('food') || cat.includes('din') || cat.includes('eat') || cat.includes('cafe')) {
      return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
    }
    if (cat.includes('sight') || cat.includes('visit') || cat.includes('view') || cat.includes('landmark')) {
      return 'bg-sky-500/10 border-sky-500/20 text-sky-400';
    }
    if (cat.includes('cultur') || cat.includes('art') || cat.includes('museum') || cat.includes('temple') || cat.includes('histor')) {
      return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
    }
    if (cat.includes('advent') || cat.includes('sport') || cat.includes('hike') || cat.includes('nature') || cat.includes('walk')) {
      return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    }
    if (cat.includes('shop') || cat.includes('market') || cat.includes('mall')) {
      return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
    }
    if (cat.includes('relax') || cat.includes('beach') || cat.includes('spa') || cat.includes('rest')) {
      return 'bg-teal-500/10 border-teal-500/20 text-teal-400';
    }
    return 'bg-slate-800 border-slate-700 text-slate-400';
  };

  return (
    <div
      className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300 ${
        stop.completed
          ? 'bg-slate-900/10 border-emerald-500/25 opacity-55 shadow-inner'
          : 'bg-slate-850/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-750/80 shadow-md hover:shadow-lg hover:shadow-slate-950/20'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1">
        {/* Complete Checkbox */}
        <button
          onClick={onComplete}
          className={`mt-1 flex-shrink-0 flex items-center justify-center w-5.5 h-5.5 rounded-full border transition-all active:scale-90 ${
            stop.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'bg-transparent border-slate-600 hover:border-indigo-400 text-transparent hover:text-indigo-400/30'
          }`}
          aria-label={stop.completed ? "Mark stop as incomplete" : "Mark stop as complete"}
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>

        {/* Stop Contents */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Start Time Badge */}
            <span className="text-xs font-mono font-semibold text-indigo-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {stop.time}
            </span>

            {/* Category Tag */}
            <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getCategoryStyles(stop.category)}`}>
              {stop.category}
            </span>

            {/* Duration Tag */}
            <span className="text-[10px] font-medium text-slate-500">
              ({formatDuration(stop.durationMinutes)})
            </span>
          </div>

          <h4 className={`text-sm font-bold text-slate-200 tracking-tight leading-snug ${stop.completed ? 'line-through text-slate-500' : ''}`}>
            {stop.name}
          </h4>

          <p className={`text-xs text-slate-400 leading-relaxed font-light ${stop.completed ? 'text-slate-600' : ''}`}>
            {stop.description}
          </p>
        </div>
      </div>

      {/* Sorting & Deletion Controls */}
      <div className="flex items-center justify-end border-t border-slate-800/40 pt-3 md:pt-0 md:border-t-0 gap-1.5">
        {/* Reordering Controls */}
        <div className="flex items-center bg-slate-900/60 rounded-lg p-0.5 border border-slate-800">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-400 hover:text-white transition-all disabled:pointer-events-none cursor-pointer"
            title="Move activity up"
            aria-label="Move activity up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-3.5 bg-slate-800"></div>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-400 hover:text-white transition-all disabled:pointer-events-none cursor-pointer"
            title="Move activity down"
            aria-label="Move activity down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Remove Stop Button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 transition-all active:scale-95 cursor-pointer ml-1"
          title="Remove stop"
          aria-label="Remove stop"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
