import { z } from 'zod';

// Client-side Zod schema to validate API responses at runtime
export const StopSchema = z.object({
  id: z.string().min(1, 'Stop ID is required'),
  time: z.string().min(1, 'Stop time is required'),
  name: z.string().min(1, 'Stop name is required'),
  description: z.string().min(1, 'Stop description is required'),
  durationMinutes: z.number().positive('Duration must be positive'),
  category: z.string().min(1, 'Category is required')
});

export const DaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, 'Day title is required'),
  summary: z.string().min(1, 'Day summary is required'),
  stops: z.array(StopSchema)
});

export const TripSchema = z.object({
  title: z.string().min(1, 'Trip title is required'),
  destination: z.string().min(1, 'Trip destination is required'),
  duration: z.number().int().positive(),
  summary: z.string().min(1, 'Trip summary is required')
});

export const ItinerarySchema = z.object({
  trip: TripSchema,
  days: z.array(DaySchema)
});

/**
 * Validates a generated itinerary response using Zod.
 * TypeScript types exist only during compilation and are stripped in the browser,
 * whereas Zod guarantees shape correctness at runtime in the client's browser.
 */
export function validateItinerary(data: unknown) {
  return ItinerarySchema.safeParse(data);
}
