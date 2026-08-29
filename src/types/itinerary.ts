export interface Stop {
  id: string;
  time: string;
  name: string;
  description: string;
  durationMinutes: number;
  category: string;
  completed?: boolean; // Tracks whether the user has completed this stop
}

export interface Day {
  day: number;
  title: string;
  summary: string;
  stops: Stop[];
}

export interface Itinerary {
  trip: {
    title: string;
    destination: string;
    duration: number;
    summary: string;
  };
  days: Day[];
}
