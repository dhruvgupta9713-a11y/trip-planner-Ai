import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_INSTRUCTION } from './prompt.ts';

// High-quality valid mock itinerary for testing
const MOCK_VALID_ITINERARY = {
  trip: {
    title: "Dream Weekend in Paris",
    destination: "Paris, France",
    duration: 3,
    summary: "A carefully curated 3-day romantic and cultural trip through the City of Light, featuring world-class museums, delicious French cuisine, and iconic landmarks."
  },
  days: [
    {
      day: 1,
      title: "Iconic Landmarks & Seine Cruise",
      summary: "Start your adventure by exploring the Eiffel Tower and cruising along the Seine River.",
      stops: [
        {
          id: "day1-stop1",
          time: "09:00 AM",
          name: "Eiffel Tower Tour",
          description: "Ascend the iconic Eiffel Tower for breathtaking, panoramic views of the entire Paris skyline.",
          durationMinutes: 120,
          category: "Sightseeing"
        },
        {
          id: "day1-stop2",
          time: "01:00 PM",
          name: "Le Comptoir du Relais",
          description: "Enjoy a classic Parisian bistro lunch with authentic French onion soup and steak frites.",
          durationMinutes: 90,
          category: "Food"
        },
        {
          id: "day1-stop3",
          time: "03:00 PM",
          name: "Seine River Cruise",
          description: "Relax on a scenic 1-hour cruise, passing under historic bridges and beautiful monuments.",
          durationMinutes: 60,
          category: "Culture"
        }
      ]
    },
    {
      day: 2,
      title: "Art, History & Gothic Architecture",
      summary: "Immerse yourself in world-renowned art and stroll through the historic Latin Quarter.",
      stops: [
        {
          id: "day2-stop1",
          time: "09:00 AM",
          name: "Louvre Museum",
          description: "Explore the world's largest art museum, home to the Mona Lisa, Venus de Milo, and countless masterworks.",
          durationMinutes: 180,
          category: "Culture"
        },
        {
          id: "day2-stop2",
          time: "02:00 PM",
          name: "Shakespeare and Company",
          description: "Visit the famous, historic English-language bookstore near the banks of the Seine.",
          durationMinutes: 45,
          category: "Culture"
        },
        {
          id: "day2-stop3",
          time: "03:30 PM",
          name: "Notre-Dame Cathedral Area",
          description: "Admire the gothic architecture of the Notre-Dame Cathedral and enjoy gelato at Berthillon on Île Saint-Louis.",
          durationMinutes: 75,
          category: "Sightseeing"
        }
      ]
    },
    {
      day: 3,
      title: "Charming Streets of Montmartre",
      summary: "Explore the bohemian artistic district and end with a sunset view from Sacré-Cœur.",
      stops: [
        {
          id: "day3-stop1",
          time: "10:00 AM",
          name: "Montmartre Walking Tour",
          description: "Wander through winding cobblestone streets, past artists painting in Place du Tertre and vintage cafes.",
          durationMinutes: 120,
          category: "Culture"
        },
        {
          id: "day3-stop2",
          time: "01:00 PM",
          name: "La Maison Rose",
          description: "Dine at the famous pink restaurant, one of Montmartre's most photographic and charming cafes.",
          durationMinutes: 90,
          category: "Food"
        },
        {
          id: "day3-stop3",
          time: "04:30 PM",
          name: "Sacré-Cœur Basilica",
          description: "Sit on the steps of the Basilica of the Sacred Heart to watch the sunset over Paris with live street music.",
          durationMinutes: 90,
          category: "Sightseeing"
        }
      ]
    }
  ]
};

/**
 * Calls the AI provider or generates mock response based on development controls.
 */
export async function generateItinerary(
  userPrompt: string,
  mockMode?: string
): Promise<string> {
  const activeMockMode = mockMode || process.env.MOCK_MODE;

  if (activeMockMode && activeMockMode !== 'NONE') {
    console.log(`[AI SERVICE] Simulating mock mode: ${activeMockMode}`);
    switch (activeMockMode) {
      case 'VALID':
        return JSON.stringify(MOCK_VALID_ITINERARY);

      case 'MALFORMED_JSON':
        return `Here is your trip itinerary in JSON format: { "trip": { "title": "Malformed Paris Trip" }, "days": [ { "day": 1, "stops": [ { "id": "1", "name": "Eiffel Tower", "durationMinutes": "sixty"`; // Broken JSON structure and wrong durationMinutes type

      case 'INVALID_SCHEMA':
        return JSON.stringify({
          hello: "world",
          invalidField: true,
          trip: {
            title: "Missing fields trip"
            // destination, duration, summary are missing
          },
          days: [
            {
              day: "first day", // should be number
              title: "Day 1",
              stops: "No stops today" // should be array of stop objects
            }
          ]
        });

      case 'EMPTY_RESPONSE':
        return "";

      case 'API_ERROR':
        throw new Error("API_ERROR: Gemini API rate limit exceeded or quota exhausted (429).");

      case 'SLOW_RESPONSE':
        // Wait 5 seconds, then return valid itinerary
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return JSON.stringify(MOCK_VALID_ITINERARY);

      default:
        console.warn(`[AI SERVICE] Unknown mock mode: ${activeMockMode}. Falling back to real API.`);
    }
  }

  // Real Gemini API Execution
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY_MISSING: The GEMINI_API_KEY environment variable is not configured on the server.");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-3.6-flash as the default model
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
    });

    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim() === '') {
      return '';
    }

    return text;
  } catch (error: any) {
    console.error('[AI SERVICE ERROR]:', error);
    throw new Error(`AI_PROVIDER_ERROR: ${error.message || 'Error occurred during generation'}`);
  }
}
