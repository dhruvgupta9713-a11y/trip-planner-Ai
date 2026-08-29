import { useState, useEffect, useRef, useCallback } from 'react';
import { Itinerary } from '../types/itinerary.ts';
import { planTrip, TripApiError } from '../services/tripApi.ts';

export interface UseTripPlannerResult {
  itinerary: Itinerary | null;
  loading: boolean;
  error: { code: string; message: string } | null;
  lastPrompt: string;
  planTrip: (prompt: string, mockMode?: string) => Promise<void>;
  completeStop: (dayIndex: number, stopId: string) => void;
  removeStop: (dayIndex: number, stopId: string) => void;
  reorderStop: (dayIndex: number, stopId: string, direction: 'up' | 'down') => void;
  retry: (mockMode?: string) => Promise<void>;
  reset: () => void;
}

export function useTripPlanner(): UseTripPlannerResult {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');

  // Use a ref to store the current AbortController for race condition protection
  const abortControllerRef = useRef<AbortController | null>(null);

  // Clean up any pending request when the hook unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const executePlanTrip = useCallback(async (prompt: string, mockMode?: string) => {
    // 1. Abort any active, pending request to prevent race conditions
    if (abortControllerRef.current) {
      console.log('[useTripPlanner] Aborting stale pending request.');
      abortControllerRef.current.abort();
    }

    // 2. Instantiate a new AbortController for the current request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setLastPrompt(prompt);

    try {
      const result = await planTrip(prompt, mockMode, controller.signal);
      
      // If the request succeeded and hasn't been aborted, set state
      setItinerary(result);
      setError(null);
    } catch (err: any) {
      // 3. Ignore AbortError. A newer request is already running, which will set the state.
      if (err.name === 'AbortError') {
        console.log('[useTripPlanner] Caught AbortError (stale response ignored).');
        return;
      }

      console.error('[useTripPlanner] Error planning trip:', err);
      if (err instanceof TripApiError) {
        setError({ code: err.code, message: err.message });
      } else {
        setError({
          code: 'UNEXPECTED_ERROR',
          message: 'An unexpected client error occurred. Please try again.'
        });
      }
      setItinerary(null);
    } finally {
      // Only set loading to false if this is still the active request
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  // Action: Toggle completion status of a stop (immutable update)
  const completeStop = useCallback((dayIndex: number, stopId: string) => {
    setItinerary((prevItinerary) => {
      if (!prevItinerary) return null;

      const updatedDays = prevItinerary.days.map((day, idx) => {
        if (idx !== dayIndex) return day;

        return {
          ...day,
          stops: day.stops.map((stop) => {
            if (stop.id !== stopId) return stop;
            return { ...stop, completed: !stop.completed };
          })
        };
      });

      return {
        ...prevItinerary,
        days: updatedDays
      };
    });
  }, []);

  // Action: Delete a stop from a day (immutable update)
  const removeStop = useCallback((dayIndex: number, stopId: string) => {
    setItinerary((prevItinerary) => {
      if (!prevItinerary) return null;

      const updatedDays = prevItinerary.days.map((day, idx) => {
        if (idx !== dayIndex) return day;

        return {
          ...day,
          stops: day.stops.filter((stop) => stop.id !== stopId)
        };
      });

      return {
        ...prevItinerary,
        days: updatedDays
      };
    });
  }, []);

  // Action: Reorder a stop by swapping it up or down (immutable update)
  const reorderStop = useCallback((dayIndex: number, stopId: string, direction: 'up' | 'down') => {
    setItinerary((prevItinerary) => {
      if (!prevItinerary) return null;

      const updatedDays = prevItinerary.days.map((day, idx) => {
        if (idx !== dayIndex) return day;

        const stops = [...day.stops];
        const stopIndex = stops.findIndex((s) => s.id === stopId);
        
        if (stopIndex === -1) return day;

        const targetIndex = direction === 'up' ? stopIndex - 1 : stopIndex + 1;

        // Boundary checks
        if (targetIndex < 0 || targetIndex >= stops.length) return day;

        // Swap the elements immutably
        const temp = stops[stopIndex];
        stops[stopIndex] = stops[targetIndex];
        stops[targetIndex] = temp;

        return {
          ...day,
          stops
        };
      });

      return {
        ...prevItinerary,
        days: updatedDays
      };
    });
  }, []);

  // Action: Retry with last used prompt
  const retry = useCallback(async (mockMode?: string) => {
    if (lastPrompt) {
      await executePlanTrip(lastPrompt, mockMode);
    }
  }, [lastPrompt, executePlanTrip]);

  // Action: Reset hook to default state
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setItinerary(null);
    setLoading(false);
    setError(null);
    setLastPrompt('');
  }, []);

  return {
    itinerary,
    loading,
    error,
    lastPrompt,
    planTrip: executePlanTrip,
    completeStop,
    removeStop,
    reorderStop,
    retry,
    reset
  };
}
