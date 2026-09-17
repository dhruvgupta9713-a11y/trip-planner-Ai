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
      return 'bg-amber-500/10 border-amber-500/25 text-amber-300';
    }
    if (cat.includes('sight') || cat.includes('visit') || cat.includes('view') || cat.includes('landmark')) {
      return 'bg-teal-500/10 border-teal-500/25 text-teal-300';
    }
    if (cat.includes('cultur') || cat.includes('art') || cat.includes('museum') || cat.includes('temple') || cat.includes('histor')) {
      return 'bg-purple-500/10 border-purple-500/25 text-purple-300';
    }
    if (cat.includes('advent') || cat.includes('sport') || cat.includes('hike') || cat.includes('nature') || cat.includes('walk')) {
      return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300';
    }
    if (cat.includes('shop') || cat.includes('market') || cat.includes('mall')) {
      return 'bg-rose-500/10 border-rose-500/25 text-rose-300';
    }
    if (cat.includes('relax') || cat.includes('beach') || cat.includes('spa') || cat.includes('rest')) {
      return 'bg-sky-500/10 border-sky-500/25 text-sky-300';
    }
    return 'bg-slate-800 border-slate-700 text-slate-300';
  };

  return (
    <div
      className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4.5 rounded-2xl border transition-all duration-300 ${
        stop.completed
          ? 'bg-slate-950/40 border-emerald-500/20 opacity-60 shadow-inner'
          : 'glass-card border-slate-800/80 hover:border-emerald-500/30 shadow-md hover:shadow-xl hover:shadow-emerald-950/10'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1">
        {/* Complete Checkbox */}
        <button
          onClick={onComplete}
          className={`mt-1 flex-shrink-0 flex items-center justify-center w-5.5 h-5.5 rounded-full border transition-all active:scale-90 cursor-pointer ${
            stop.completed
              ? 'bg-emerald-400 border-emerald-400 text-slate-950 font-bold'
              : 'bg-slate-900 border-slate-600 hover:border-emerald-400 text-transparent hover:text-emerald-400/40'
          }`}
          aria-label={stop.completed ? "Mark stop as incomplete" : "Mark stop as complete"}
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>

        {/* Stop Contents */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Start Time Badge */}
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {stop.time}
            </span>

            {/* Category Tag */}
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-lg border font-heading ${getCategoryStyles(stop.category)}`}>
              {stop.category}
            </span>

            {/* Duration Tag */}
            <span className="text-[10px] font-medium text-slate-400">
              ({formatDuration(stop.durationMinutes)})
            </span>
          </div>

          <h4 className={`text-base font-bold text-slate-100 tracking-tight leading-snug font-heading ${stop.completed ? 'line-through text-slate-500' : ''}`}>
            {stop.name}
          </h4>

          <p className={`text-xs text-slate-300/80 leading-relaxed font-sans ${stop.completed ? 'text-slate-500' : ''}`}>
            {stop.description}
          </p>
        </div>
      </div>

      {/* Sorting & Deletion Controls */}
      <div className="flex items-center justify-end border-t border-slate-800/40 pt-3 md:pt-0 md:border-t-0 gap-1.5">
        {/* Reordering Controls */}
        <div className="flex items-center bg-slate-900/90 rounded-xl p-0.5 border border-slate-800">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 text-slate-400 hover:text-emerald-300 transition-all disabled:pointer-events-none cursor-pointer"
            title="Move activity up"
            aria-label="Move activity up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-3.5 bg-slate-800"></div>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 text-slate-400 hover:text-emerald-300 transition-all disabled:pointer-events-none cursor-pointer"
            title="Move activity down"
            aria-label="Move activity down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Remove Stop Button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 transition-all active:scale-95 cursor-pointer ml-1"
          title="Remove stop"
          aria-label="Remove stop"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
