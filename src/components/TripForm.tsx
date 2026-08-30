import React, { useState } from 'react';
import { Send, MapPin, AlertCircle, Sparkles } from 'lucide-react';

interface TripFormProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

export const TripForm: React.FC<TripFormProps> = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const EXAMPLES = [
    {
      label: '5 days in Japan 🇯🇵',
      text: '5 days in Japan visiting Tokyo and Kyoto. I love food, temples, anime and local experiences. My budget is moderate.'
    },
    {
      label: 'Weekend in Paris 🇫🇷',
      text: 'Plan a romantic 3-day weekend trip to Paris. Interested in world-class art museums, cozy local bakeries, and viewing the Eiffel Tower at night.'
    },
    {
      label: '7 days in Italy 🇮🇹',
      text: '7 days in Italy, budget friendly, interested in history, ancient ruins, and gorgeous coastal beaches.'
    },
    {
      label: '3 days in Goa 🇮🇳',
      text: '3 days in Goa for a relaxing beach vacation. Focus on fresh seafood, sunset beach walks, historic Portuguese forts, and water sports.'
    }
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setPrompt(val);
    if (error) {
      setError(null);
    }
  };

  const handleChipClick = (text: string) => {
    if (loading) return;
    setPrompt(text);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();

    if (!trimmed) {
      setError('Trip description cannot be empty.');
      return;
    }
    if (trimmed.length < 10) {
      setError('Please add a bit more details about your adventure (minimum 10 characters).');
      return;
    }
    if (trimmed.length > 1000) {
      setError('Your trip description is too long (maximum 1000 characters).');
      return;
    }

    setError(null);
    onSubmit(trimmed);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
          Plan your next adventure
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Tell us where you're going, how long you're staying, and what you love. We'll build your perfect itinerary.
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all duration-300">
          <div className="flex items-center space-x-2 text-slate-450 mb-2.5">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <label htmlFor="trip-prompt" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Describe your dream trip
            </label>
          </div>

          <textarea
            id="trip-prompt"
            value={prompt}
            onChange={handleTextChange}
            disabled={loading}
            placeholder="Example: 5 days in Japan visiting Tokyo and Kyoto. I love food, temples, anime and local experiences. My budget is moderate."
            className="w-full min-h-[140px] bg-transparent border-0 resize-none text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 leading-relaxed disabled:opacity-50"
            maxLength={1050}
          />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
            {/* Character Counter */}
            <span className={`text-[10px] font-mono ${prompt.length > 1000 ? 'text-red-400 font-bold' : 'text-slate-500'}`}>
              {prompt.length} / 1000 chars
            </span>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-650 to-indigo-550 hover:from-indigo-600 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-950/20 active:scale-95 disabled:scale-100 disabled:opacity-50 border border-indigo-500/30 disabled:border-slate-700 disabled:text-slate-500 group"
            >
              <span>{loading ? 'Planning...' : 'Plan My Trip'}</span>
              <Send className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'}`} />
            </button>
          </div>
        </div>

        {/* Local validation warning */}
        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-500/5 border border-red-500/20 rounded-xl p-3 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Quick Example Chips */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium">Quick Ideas:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleChipClick(ex.text)}
                disabled={loading}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 active:scale-95 text-slate-350 hover:text-white text-xs font-medium rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
