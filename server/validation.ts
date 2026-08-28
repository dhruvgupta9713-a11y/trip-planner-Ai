import { z } from 'zod';

// Schema for client request input
export const PlanTripRequestSchema = z.object({
  prompt: z.string()
    .min(1, { message: 'Trip description cannot be empty.' })
    .min(10, { message: 'Please describe your trip in more detail (minimum 10 characters).' })
    .max(1000, { message: 'Trip description is too long (maximum 1000 characters).' })
});

// Schema for each stop in the day's itinerary
export const StopSchema = z.object({
  id: z.string().min(1, 'Stop ID is required'),
  time: z.string().min(1, 'Stop time is required'),
  name: z.string().min(1, 'Stop name is required'),
  description: z.string().min(1, 'Stop description is required'),
  durationMinutes: z.number({ invalid_type_error: 'Duration must be a number' }).int().positive('Duration must be positive'),
  category: z.string().min(1, 'Category is required')
});

// Schema for each day in the itinerary
export const DaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, 'Day title is required'),
  summary: z.string().min(1, 'Day summary is required'),
  stops: z.array(StopSchema)
});

// Schema for the overall trip overview
export const TripSchema = z.object({
  title: z.string().min(1, 'Trip title is required'),
  destination: z.string().min(1, 'Trip destination is required'),
  duration: z.number().int().positive(),
  summary: z.string().min(1, 'Trip summary is required')
});

// Full itinerary response schema
export const ItinerarySchema = z.object({
  trip: TripSchema,
  days: z.array(DaySchema)
});

export type PlanTripRequest = z.infer<typeof PlanTripRequestSchema>;
export type Stop = z.infer<typeof StopSchema>;
export type Day = z.infer<typeof DaySchema>;
export type Itinerary = z.infer<typeof ItinerarySchema>;
