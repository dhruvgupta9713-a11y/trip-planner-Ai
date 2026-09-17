import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { TripForm } from './components/TripForm.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { LoadingState } from './components/LoadingState.tsx';
import { ErrorState } from './components/ErrorState.tsx';
import { TripHeader } from './components/TripHeader.tsx';
import { DayCard } from './components/DayCard.tsx';
import { useTripPlanner } from './hooks/useTripPlanner.ts';

const App: React.FC = () => {
  // State to hold selected development mock mode
  const [mockMode, setMockMode] = useState<string>('NONE');
  
  // Custom hook containing all network, cancellation, and immutable state updates logic
  const {
    itinerary,
    loading,
    error,
    planTrip,
    completeStop,
    removeStop,
    reorderStop,
    retry,
    reset
  } = useTripPlanner();

  const handleFormSubmit = async (prompt: string) => {
    await planTrip(prompt, mockMode);
  };

  const handleRetry = async () => {
    await retry(mockMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#060A14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Brand Navigation & Developer Panel */}
      <Header mockMode={mockMode} onChangeMockMode={setMockMode} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col justify-center">
        {loading && (
          <div className="animate-slide-up">
            <LoadingState />
          </div>
        )}

        {!loading && error && (
          <div className="animate-slide-up">
            <ErrorState
              title={error.code === 'INVALID_AI_RESPONSE' ? "Couldn't understand AI response" : "Couldn't plan your trip"}
              message={error.message}
              code={error.code}
              onRetry={handleRetry}
              onReset={reset}
            />
          </div>
        )}

        {!loading && !error && itinerary && (
          <div className="space-y-6 animate-slide-up">
            {/* Trip Title & Summary */}
            <TripHeader trip={itinerary.trip} onReset={reset} />

            {/* List of Days */}
            <div className="space-y-4 px-2 sm:px-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 font-heading">
                  Day-by-Day Itinerary
                </span>
                <span className="text-xs text-slate-400">
                  Click any day to expand or collapse stops
                </span>
              </div>
              
              {itinerary.days.map((day, dayIndex) => (
                <DayCard
                  key={day.day}
                  day={day}
                  dayIndex={dayIndex}
                  onCompleteStop={completeStop}
                  onRemoveStop={removeStop}
                  onReorderStop={reorderStop}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && !itinerary && (
          <div className="space-y-4 animate-slide-up">
            {/* Landing Input Form */}
            <TripForm onSubmit={handleFormSubmit} loading={loading} />
            
            {/* Aesthetic Landing Banner */}
            <EmptyState />
          </div>
        )}
      </main>

      {/* footer details */}
      <footer className="py-6 border-t border-slate-800/60 text-center text-xs text-slate-400 bg-[#04070F]">
        <p>© {new Date().getFullYear()} VoyageAI. Bespoke Travel Planner powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
