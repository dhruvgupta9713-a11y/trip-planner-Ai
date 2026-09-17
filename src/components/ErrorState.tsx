import React from 'react';
import { AlertCircle, RefreshCw, Undo2 } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
  code?: string;
  onRetry?: () => void;
  onReset?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  code,
  onRetry,
  onReset
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="glass-panel border border-rose-500/25 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-2xl backdrop-blur-xl">
        {/* Error icon with pulse animation */}
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mb-5 text-rose-400 shadow-lg shadow-rose-950/20">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-100 mb-2 font-heading">
          {title}
        </h3>

        {code && (
          <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300 mb-3.5 font-bold">
            Error Code: {code}
          </span>
        )}

        <p className="text-slate-300 text-sm max-w-md leading-relaxed mb-6 font-sans">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 active:scale-95 transition-all text-xs font-extrabold rounded-2xl text-slate-950 shadow-lg shadow-emerald-500/20 w-full sm:w-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 hover:text-white active:scale-95 transition-all text-xs font-bold rounded-2xl text-slate-300 border border-slate-700 w-full sm:w-auto cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Plan Another Trip</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
