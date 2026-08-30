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
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm">
        {/* Error icon with pulse animation */}
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 text-red-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2">
          {title}
        </h3>

        {code && (
          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 mb-3">
            Error Code: {code}
          </span>
        )}

        <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-6">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-650 to-red-550 hover:from-red-600 hover:to-red-500 active:scale-95 transition-all text-xs font-semibold rounded-xl text-white shadow-lg shadow-red-900/10 border border-red-500/30 w-full sm:w-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-755 hover:text-white active:scale-95 transition-all text-xs font-semibold rounded-xl text-slate-300 border border-slate-700 w-full sm:w-auto"
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
