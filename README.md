# ✈️ Trip Planner AI

An AI-powered trip planner that turns a simple travel idea into a structured, day-by-day itinerary.

Instead of filling out a long form with destinations, dates, activities, and preferences, you can describe your trip in normal language. The application sends that request to Google Gemini, validates the generated response, and turns it into an interactive itinerary that you can modify.

> **Example:**
> "I'm planning a 5-day trip to Rajasthan with my friends. I want to visit Jaipur, Jodhpur and Udaipur, try local food, and keep the trip reasonably budget-friendly."

The application then generates a structured itinerary that can be explored and edited directly from the UI.

---

## 🚀 Features

### Natural-Language Trip Planning

Describe your trip however you want. There is no need to fill in a complicated form with multiple fields.

### 🤖 AI-Generated Itineraries

The application uses the Google Gemini API to generate a structured day-by-day travel plan.

### 🔐 Double Validation with Zod

AI responses cannot be trusted blindly.

The response is validated on:

* **Backend** — validates the AI response before sending it to the frontend.
* **Frontend** — validates the response again before putting it into React state.

This gives the application an additional layer of protection against unexpected AI output.

### 🗓️ Interactive Itinerary

Once the itinerary is generated, users can:

* Expand and collapse individual days
* Mark activities as completed
* Delete stops
* Move stops up or down within a day
* Regenerate the trip if needed

### 🧪 Development Error Simulator

The application includes a development-only Dev Tools panel that can simulate different failure scenarios, such as:

* Malformed JSON
* Invalid schema
* API errors
* Slow responses

This makes it easier to test how the application behaves when things go wrong.

### ⚡ Stale Request Protection

If a user submits one request and quickly submits another, the older request should not overwrite the newer result.

The application handles this using `AbortController` inside the trip-planning hook.

### 🛡️ Graceful Error Handling

The application handles cases such as:

* Invalid AI responses
* Network failures
* API errors
* Rate limiting
* Schema validation failures

Instead of showing a broken UI, the user gets a clear error message with options such as **Try Again** or **Reset**.

---

# 🏗️ How It Works

The overall flow is:

```text
User enters trip description
          ↓
React form validates the input
          ↓
POST /api/plan-trip
          ↓
Express backend
          ↓
Google Gemini API
          ↓
AI returns JSON
          ↓
Backend parses and sanitizes response
          ↓
Backend validates response with Zod
          ↓
Validated JSON sent to frontend
          ↓
Frontend validates response again with Zod
          ↓
React state is updated
          ↓
Interactive itinerary is displayed
```

This approach is intentional: the application treats the AI response as **untrusted external data** rather than assuming that the model will always return exactly what we expect.

---

# 🧩 Architecture

The project is divided into two main parts:

```text
                    Trip Planner AI
                          │
              ┌───────────┴───────────┐
              │                       │
          Frontend                 Backend
              │                       │
        React + Vite             Express
        TypeScript               TypeScript
        Tailwind CSS                 │
        Zod                         Zod
              │                       │
              └────────── API ────────┘
                                      │
                              Google Gemini API
```

### Frontend

The frontend is responsible for:

* Collecting the user's trip description
* Basic input validation
* Calling the backend API
* Validating the backend response
* Managing itinerary state
* Rendering the interactive itinerary
* Handling loading and error states

### Backend

The backend is responsible for:

* Receiving trip-planning requests
* Keeping the Gemini API key private
* Calling the Gemini API
* Parsing the AI response
* Cleaning markdown code blocks when necessary
* Validating the response with Zod
* Returning a predictable API response to the frontend

---

# 🛠️ Tech Stack

| Layer       | Technology                   |
| ----------- | ---------------------------- |
| Frontend    | React, TypeScript, Vite      |
| Styling     | Tailwind CSS                 |
| Icons       | Lucide Icons                 |
| Backend     | Node.js, Express, TypeScript |
| Validation  | Zod                          |
| AI          | Google Gemini API            |
| Development | tsx, dotenv, CORS            |

---

# 📁 Project Setup

## Prerequisites

Make sure you have:

* Node.js 18 or higher
* npm
* A Google Gemini API key

You can get a Gemini API key from Google AI Studio.

[Google AI Studio](https://aistudio.google.com/?utm_source=chatgpt.com)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/dhruvgupta9713-a11y/trip-planner-Ai.git
```

Move into the project directory:

```bash
cd trip-planner
```

Install the dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Then add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

> **Important:** Never commit your real API key to GitHub.

---

# ▶️ Running the Project

Start the application with:

```bash
npm start
```

This starts both the backend and frontend development servers.

The application will be available at:

```text
http://localhost:5173
```

The Express backend runs on:

```text
http://localhost:3000
```

---

# 🔒 Why Is the Gemini API Key on the Backend?

The Gemini API key is never exposed to the React application.

If the key were placed directly in the frontend, a user could inspect the browser bundle or network requests and potentially obtain it.

That could lead to:

* Unauthorized API usage
* Unexpected costs
* Rate-limit problems
* Potential suspension of the API key

Instead, the frontend communicates with our backend:

```text
React
  ↓
Express API
  ↓
Gemini API
```

The API key stays inside the server's environment variables.

---

# 🧠 Why Use Zod?

One of the important parts of this project is understanding that **TypeScript types alone are not enough when dealing with AI responses.**

TypeScript mainly provides compile-time type checking.

For example:

```typescript
interface Trip {
  days: Day[];
}
```

This tells TypeScript what we expect.

But if Gemini sends this at runtime:

```json
{
  "somethingUnexpected": true
}
```

TypeScript will not automatically inspect that incoming JSON and reject it.

That's where Zod comes in.

We define a schema and validate the actual runtime data:

```text
AI Response
     ↓
JSON.parse()
     ↓
Zod.safeParse()
     ↓
Valid? ── Yes ──→ Continue
     │
     No
     ↓
Return controlled error
```

This prevents unexpected AI responses from reaching components that assume a specific structure.

---

# 🔄 What Happens If Gemini Returns Bad JSON?

The application handles two different situations.

### 1. Malformed JSON

For example, if the model returns something that cannot be parsed as JSON:

```text
AI response
    ↓
JSON.parse()
    ↓
Parsing fails
    ↓
Backend returns INVALID_AI_RESPONSE
    ↓
Frontend shows error state
```

The API responds with a `502` error instead of passing broken data to the frontend.

### 2. Valid JSON, Wrong Structure

Sometimes the response may be valid JSON but still not match the structure expected by the application.

For example:

```json
{
  "message": "Here is your trip!"
}
```

The JSON itself is valid, but it isn't a valid itinerary according to our schema.

Zod catches this:

```text
Valid JSON
    ↓
Zod validation
    ↓
Schema mismatch
    ↓
INVALID_SCHEMA
```

The frontend then prevents the invalid response from entering React state.

---

# 🧹 AI Response Sanitization

LLMs sometimes return JSON wrapped inside markdown:

````text
```json
{
  "days": [...]
}
````

````

Before parsing the response, the backend removes these markdown code-block markers when necessary.

The cleaned string can then be passed to `JSON.parse()`.

---

# ⚔️ Handling Race Conditions

Consider this situation:

```text
Request A → User asks for Delhi trip
Request B → User immediately asks for Goa trip
````

Because network and AI response times can vary, it is possible for Request B to finish first:

```text
Request A ───────────────────────→ Response A
Request B ─────────→ Response B
```

Without protection, Response A could arrive later and overwrite the newer Goa itinerary.

The project uses `AbortController` to handle this.

When a new request starts:

1. The previous request is aborted.
2. A new `AbortController` is created.
3. The latest request becomes the active request.
4. Aborted requests are ignored by the state-management logic.

This ensures an older request does not unexpectedly replace newer results.

---

# ♻️ Why Are React State Updates Immutable?

React relies on object references to determine when state has changed.

Directly changing an existing array is therefore avoided.

Instead of doing something like:

```javascript
itinerary.days[0].stops.pop();
```

the application creates new arrays/objects when updating state.

For example:

```javascript
const updatedDays = days.map(...)
```

This gives React a new reference and allows it to correctly trigger a re-render.

---

# 🔀 How Does Stop Reordering Work?

Reordering stops is handled using their array indexes.

For moving a stop up:

```text
current index → index - 1
```

For moving a stop down:

```text
current index → index + 1
```

The application:

1. Finds the selected day.
2. Finds the selected stop.
3. Calculates the new index.
4. Checks that the new index is within bounds.
5. Creates a copy of the stops array.
6. Swaps the two stops.
7. Updates the itinerary state immutably.

The reordering is currently limited to stops within the same day.

---

# 🛡️ Failure Handling

The application uses multiple layers of validation and error handling.

### Layer 1 — User Input

The frontend checks:

* Empty input
* Input shorter than 10 characters
* Input longer than 1000 characters

This prevents obviously invalid requests from reaching the API.

### Layer 2 — AI Instructions

The Gemini system instructions ask the model to return raw JSON and avoid additional explanations or markdown.

### Layer 3 — Response Sanitization

If markdown code blocks are returned, they are removed before parsing.

### Layer 4 — JSON Parsing

The backend attempts to parse the cleaned response.

### Layer 5 — Backend Zod Validation

The parsed response is checked against the expected schema.

### Layer 6 — Frontend Zod Validation

The frontend validates the response again before updating React state.

### Layer 7 — Network/API Errors

The application handles situations such as:

* `429 RATE_LIMITED`
* AI/API errors
* Network failures
* Offline client state

This gives the application several checkpoints instead of trusting a single layer.

---

# 🧪 Testing Failure Scenarios

During development, the Dev Tools panel can be used to simulate different situations.

Examples include:

```text
MALFORMED_JSON
INVALID_SCHEMA
API_ERROR
SLOW_RESPONSE
```

This is useful because error handling is difficult to test if everything always works normally.

Instead of waiting for a real API failure, these scenarios can be triggered manually and the resulting UI can be checked.

---

# ⚠️ Known Limitations

This project is intentionally focused on generating and editing itineraries. It does not currently try to solve every part of trip planning.

### AI Accuracy

The generated itinerary can contain inaccurate or outdated information because it depends on the AI model's output.

For example, a restaurant may have closed or an attraction's schedule may have changed.

### No Live Map or Opening-Hours Verification

The application does not currently verify:

* Current opening hours
* Real-time route distances
* Live geolocation information

### Stops Cannot Move Between Days

A stop can be reordered within its current day, but it cannot currently be dragged from one day to another.

### No Persistent User Data

Changes such as:

* Completed stops
* Deleted stops
* Reordered activities

are currently stored in React state.

They will therefore be lost after a page reload or when a new itinerary is generated.

---

# 🔮 Possible Future Improvements

Some natural next steps for the project would be:

* Add Google Maps integration
* Verify restaurant and attraction opening hours
* Add authentication
* Save itineraries to a database
* Allow moving activities between days
* Add hotel and flight suggestions
* Add budget estimation
* Add weather information
* Add shareable trip links
* Add streaming AI responses
* Add automated tests for API and validation logic

---

# 🤖 AI Usage

This project was developed with pair-programming assistance from **Antigravity (Google DeepMind)**.

AI assistance was used for parts of the implementation such as:

* Boilerplate UI
* Express routing setup
* Zod model setup
* Development configuration

The architecture, validation strategy, error-handling approach, and overall application behavior were reviewed and integrated into the project.

---

# ⏱️ Development Time

Approximately **8 hours**.

---

# 💡 What I Learned

The most important takeaway from this project was that **getting an AI response is only one part of building an AI application**.

The more interesting engineering problems are what happens around the model:

* How do we validate unpredictable output?
* How do we keep API keys secure?
* What happens when JSON is malformed?
* What happens when the AI returns the wrong structure?
* How do we prevent race conditions?
* How do we keep the UI stable when an API fails?
* How do we test failure cases intentionally?

The project therefore focuses not only on calling an LLM, but also on building a reliable application around it.

---

## 👨‍💻 Author

**Dhruv Gupta**

Built as an AI-powered trip-planning project using React, TypeScript, Express, Zod, and Google Gemini.
