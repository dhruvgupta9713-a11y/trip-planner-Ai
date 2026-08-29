import { Itinerary } from '../types/itinerary.ts';
import { validateItinerary } from '../utils/validation.ts';

export class TripApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'TripApiError';
    this.code = code;
  }
}

/**
 * Sends a prompt to the backend server to plan a trip.
 * Supports AbortController signals to safely cancel stale network requests.
 */
export async function planTrip(
  prompt: string,
  mockMode?: string,
  signal?: AbortSignal
): Promise<Itinerary> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Inject development mock header if specified
  if (mockMode && mockMode !== 'NONE') {
    headers['x-mock-mode'] = mockMode;
  }

  let response: Response;
  try {
    response = await fetch('/api/plan-trip', {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt }),
      signal
    });
  } catch (error: any) {
    // If request was aborted by useTripPlanner, forward the AbortError
    if (error.name === 'AbortError') {
      throw error;
    }
    // Handle standard connection issues
    throw new TripApiError(
      'NETWORK_ERROR',
      'Unable to connect to the server. Please check that the server is running and try again.'
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch (error) {
    throw new TripApiError(
      'INVALID_AI_RESPONSE',
      "Couldn't parse the server response as JSON."
    );
  }

  // If the server returns a custom error code
  if (!response.ok) {
    const code = data?.error?.code || 'INTERNAL_ERROR';
    const message = data?.error?.message || 'Something went wrong while planning your trip.';
    throw new TripApiError(code, message);
  }

  // Client-side Zod firewall check
  const validation = validateItinerary(data);
  if (!validation.success) {
    console.error('[CLIENT] Runtime Zod validation failed for server payload:', validation.error.format());
    throw new TripApiError(
      'INVALID_SCHEMA',
      'The generated itinerary did not match the expected structure.'
    );
  }

  return validation.data;
}
