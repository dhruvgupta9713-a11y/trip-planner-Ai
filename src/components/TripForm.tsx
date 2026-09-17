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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-amber-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent font-heading">
          Plan your next adventure
        </h1>
        <p className="text-sm sm:text-base text-slate-300/90 max-w-xl mx-auto leading-relaxed">
          Tell us where you're going, how long you're staying, and what you love. We'll curate your bespoke itinerary in seconds.
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative glass-panel rounded-3xl p-5 sm:p-6 shadow-2xl focus-within:border-emerald-500/40 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-300">
          <div className="flex items-center space-x-2.5 text-slate-300 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <label htmlFor="trip-prompt" className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading">
              Describe your dream trip
            </label>
          </div>

          <textarea
            id="trip-prompt"
            value={prompt}
            onChange={handleTextChange}
            disabled={loading}
            placeholder="Example: 5 days in Japan visiting Tokyo and Kyoto. I love food, temples, anime and local experiences. My budget is moderate."
            className="w-full min-h-[140px] bg-transparent border-0 resize-none text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 leading-relaxed disabled:opacity-50 font-sans"
            maxLength={1050}
          />

          <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-800/80">
            {/* Character Counter */}
            <span className={`text-[10px] font-mono ${prompt.length > 1000 ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
              {prompt.length} / 1000 chars
            </span>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:text-slate-500 group cursor-pointer"
            >
              <span>{loading ? 'Planning...' : 'Plan My Trip'}</span>
              <Send className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'}`} />
            </button>
          </div>
        </div>

        {/* Local validation warning */}
        {error && (
          <div className="flex items-center space-x-2 text-rose-300 text-xs bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Quick Example Chips */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-slate-300">Quick Inspiration:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleChipClick(ex.text)}
                disabled={loading}
                className="px-3.5 py-1.5 bg-slate-900/80 hover:bg-emerald-950/40 active:scale-95 text-slate-300 hover:text-emerald-200 text-xs font-medium rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-sm"
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
