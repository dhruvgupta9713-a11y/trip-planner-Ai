# AI Trip Planner

An interactive, production-quality AI-powered Trip Planner. Describe your next adventure in free-form natural language, and our AI service will generate a day-by-day travel itinerary. Built with React, Vite, TypeScript, Express, Zod, and the Google Gemini API.

---

## Architecture Flow

```
User Input (Free-form text)
       ↓
React Form (Basic Validation: Length & Emptiness)
       ↓
Backend API (POST /api/plan-trip)
       ↓
Gemini AI Client (System instructions enforcing JSON schema)
       ↓
Raw AI Output (JSON String)
       ↓
JSON Parsing & Sanitization (Strips markdown blockticks if present)
       ↓
Zod Runtime Validation (Checks JSON types & keys against schema)
       ↓
JSON Response to Client
       ↓
React Client-Side Zod Validation (Firewall validation)
       ↓
React State Injection
       ↓
Interactive Itinerary UI (Collapsible cards, Stop completion, Reordering, Deletion)
```

---

## Features

- **Free-Form Trip Input**: Accepts any natural-language description of your trip. No rigid, complex form fields.
- **Real LLM Integration**: Uses the Google Gemini API (`gemini-1.5-flash`) via the official SDK to generate structured travel plans.
- **Double Zod Validation**: AI outputs are validated using Zod schemas on both the backend and client-side to enforce full data integrity.
- **Development Mock Panel**: A built-in Dev Tools panel (active only in `development` mode) that allows you to simulate failure cases (`MALFORMED_JSON`, `INVALID_SCHEMA`, `API_ERROR`, `SLOW_RESPONSE`, etc.) at the click of a button to demo robustness.
- **Interactive Day-by-Day Itinerary**:
  - Days are expandable and collapsible.
  - Mark activities/stops as completed.
  - Delete stops from the itinerary.
  - Reorder stops within a day (Move Up / Move Down buttons).
- **Stale Response Protection**: Uses `AbortController` in the state hook to ignore late-arriving responses when a new request is fired, preventing race conditions.
- **Graceful Error Handling**: Catches network loss, API limits, bad JSON, or schema failures, presenting clean, user-friendly cards with "Try Again" or "Reset" options.
- **Sleek & Premium UI**: Built with a responsive dark-themed styling system using Tailwind CSS, featuring modern typography and glassmorphism cards.

---

## Tech Stack

- **Frontend**: React (Hooks), TypeScript, Vite, Tailwind CSS, Lucide Icons, Zod (Client-side validation)
- **Backend**: Node.js, Express, TypeScript, tsx (dev runner), dotenv, CORS, Zod (Server-side validation)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash` model)

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher is recommended)
- npm (Node Package Manager)
- A Google Gemini API Key. You can get one for free at [Google AI Studio](https://aistudio.google.com/).

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd trip-planner
   ```

2. Install dependencies for both backend and frontend automatically:
   ```bash
   npm install
   ```

3. Configure environment variables. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and insert your API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3000
   ```

### Start Development Server

Run the unified start command:
```bash
npm start
```
This runs the Express backend (port 3000) and the Vite frontend (port 5173) concurrently.

Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

---

## Interview Guide: Engineering Decisions

Evaluators can review the answers to the core questions here:

### 1. Why is the API key kept on the backend?
Exposing the `GEMINI_API_KEY` on the client-side allows anyone who inspects the network calls or bundle to steal it. This could result in cost usage abuse, rate-limiting, and suspension. Keeping the key in the server's environment variables protects our secrets and ensures all requests are routed through our own API gateway.

### 2. Why can't TypeScript validate AI responses at runtime?
TypeScript is a compile-time system. Its types and interfaces are entirely stripped away during transpilation, leaving only standard Javascript in the browser. Since the AI response arrives dynamically at runtime, TypeScript cannot perform structural checks on the incoming JSON payload. We must use a runtime schema checker like Zod to ensure the data is safe to ingest.

### 3. Why use Zod?
Zod is a TypeScript-first schema declaration and validation library. It allows us to write a single schema that generates both the static TypeScript types AND performs actual runtime validation. If the LLM returns an unexpected format, Zod rejects it immediately, raising a predictable catchable error rather than letting undefined properties crash React components downstream.

### 4. What happens when the AI returns malformed JSON or the wrong schema?
- **Malformed JSON**: The backend catches the parsing exception, logs it, and returns an `INVALID_AI_RESPONSE` error code with a 502 status. The frontend shows a friendly error card explaining the response couldn't be parsed, with a "Try Again" button.
- **Wrong Schema**: Zod's `safeParse` returns `success: false`. The backend intercepts this, logs the schema mismatch, and returns an `INVALID_SCHEMA` error (502). The client intercepts this and blocks it from updating React state, preventing crashes.

### 5. How do you prevent stale requests from overwriting newer results (Race Conditions)?
If a user fires Request A, quickly changes the prompt, and fires Request B, Request A could complete *after* B due to server latency. If unhandled, Request A would overwrite the newer results.
We use **`AbortController`** inside our `useTripPlanner` hook:
- When a new request is launched, we call `.abort()` on any active controller ref.
- The browser halts the fetch request immediately, and `useTripPlanner` catches an `AbortError`, ignoring the state updates. Only the latest active request is permitted to modify the itinerary state.

### 6. Why are React state updates immutable?
Directly mutating React state (e.g. `itinerary.days[0].stops.pop()`) does not trigger a re-render because React uses reference equality checks (`Object.is`) to detect state changes. By using immutable patterns (like spreading `{ ...day }` and mapping arrays), we produce new object references. This ensures React schedules a re-render and updates the virtual DOM correctly.

### 7. How does stop reordering work?
Reordering utilizes standard index-swapping:
1. Locate the day's stops array.
2. Determine the index of the target stop.
3. Calculate the target index (index - 1 for 'up', index + 1 for 'down').
4. If within bounds, clone the array and swap the two elements.
5. Apply the updated days array to the main React itinerary state.

---

## Failure Handling Strategy Details

The application implements a multi-tier defense:
1. **User Input Validation**: Validates emptiness, < 10 characters, or > 1000 characters immediately in the form to avoid wasted API calls.
2. **AI Instruction**: The system prompt instructs Gemini to output raw JSON without markdown markers and explicitly forbids comments or external explanations.
3. **Markdown Cleansing**: If the LLM wraps the response in ```json codeblocks, the server cleanses it before parsing.
4. **JSON Parsing & Schema Validation**: The backend parses the JSON and runs Zod schema checks. Any structural errors are converted to safe, generic JSON errors.
5. **Client Firewall Check**: The frontend re-validates the response body using Zod. If the backend was bypassed or is returning bad structures, the frontend intercepts it.
6. **Network & Rate Limits**: Capture status 429 (`RATE_LIMITED`), server timeouts (`AI_ERROR`), and client offline states, providing a clean error layout.

---

## Known Limitations

- **AI Accuracy**: Itinerary recommendations are subject to LLM hallucinations and outdated training data (e.g., closed restaurants or changed schedules).
- **No Map/Hours Verification**: Does not verify active opening hours, route distances, or geolocations.
- **Day-Bound Sorting**: Stop reordering is restricted to shifting activities within their respective days. Shifting stops across multiple days is not currently supported.
- **No Persistence**: Reordering, deletion, and completion edits are stored in-memory (local state) and will reset upon page reload or regeneration.

---

## AI Usage Note
This project was scaffolded and implemented with pair-programming assistance from **Antigravity (Google DeepMind)**, which aided in generating boilerplate layouts, configuring Express routing, and setting up Zod models.

---

## Time Spent
Approximately 8 hours.
