import React, { useState } from 'react';
import { Compass, Settings, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  mockMode: string;
  onChangeMockMode: (mode: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ mockMode, onChangeMockMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDev = (import.meta as any).env.DEV;

  const mockOptions = [
    { value: 'NONE', label: 'None (Real Gemini API)' },
    { value: 'VALID', label: 'Simulate Valid Response' },
    { value: 'MALFORMED_JSON', label: 'Simulate Malformed JSON' },
    { value: 'INVALID_SCHEMA', label: 'Simulate Wrong JSON Schema' },
    { value: 'EMPTY_RESPONSE', label: 'Simulate Empty Response' },
    { value: 'API_ERROR', label: 'Simulate API Timeout/Error (502)' },
    { value: 'SLOW_RESPONSE', label: 'Simulate Slow Response (5s delay)' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060A14]/80 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center text-slate-950 font-bold">
            <Compass className="w-5 h-5 animate-pulse-slow text-slate-950" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent font-heading">
              VoyageAI
            </span>
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20 tracking-wide">
              v1.0
            </span>
          </div>
        </div>

        {/* Action Controls & Mock Menu */}
        <div className="flex items-center space-x-3">
          {mockMode !== 'NONE' && (
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mocking: {mockMode}</span>
            </div>
          )}

          {isDev ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3.5 py-1.5 bg-slate-900/90 hover:bg-slate-800 active:scale-95 transition-all text-xs font-semibold rounded-xl text-slate-200 border border-slate-700/80 hover:border-emerald-500/40 shadow-sm"
                aria-expanded={isOpen}
                aria-label="Toggle developer settings"
              >
                <Settings className={`w-3.5 h-3.5 text-emerald-400 ${isOpen ? 'rotate-90' : ''} transition-transform duration-300`} />
                <span>Dev Settings</span>
              </button>

              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-750">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">Interview Dev Panel</span>
                    </div>
                    
                    <label htmlFor="mock-mode-select" className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                      Select Simulated Backend State:
                    </label>
                    <select
                      id="mock-mode-select"
                      value={mockMode}
                      onChange={(e) => {
                        onChangeMockMode(e.target.value);
                        setIsOpen(false);
                      }}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {mockOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <div className="mt-3 text-[10px] text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-750 leading-relaxed">
                      Changes apply instantly to the next "Plan My Trip" request. Simulate failures to demonstrate error-handling.
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Mode</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
