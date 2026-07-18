# Promise Radar

Promise Radar is a focused prototype / idea (early-stage). It finds commitments hidden inside everyday conversations and turns them into socially-aware next actions.

## Why this is different

Most productivity tools start with explicit tasks. Promise Radar starts with the invisible backlog: the “I’ll send that Thursday,” the “can you intro me next week,” and the people quietly waiting on follow-through. It separates real commitments from polite noise, assigns a confidence signal, and recommends a low-friction next move.

## Run it

Install dependencies and start the React/Vite app:

```bash
npm install
npm run dev
```

The app starts with fast offline rules. In a Chromium browser with WebGPU, click **enable local AI** to lazy-load the open-source Qwen2.5 0.5B model through WebLLM. The model runs in the browser and returns structured JSON; the app validates that JSON and falls back to the rule engine if loading or inference fails. The first local-AI use downloads and caches the model, so it may take a few minutes and roughly 1 GB of model storage.

The current UI also includes **your AI key** mode. Choose a compatible provider, enter a key in the password field, and use it for the current session only. The key is held in React memory and is not written to local storage or sent to this project’s server. Direct browser calls depend on provider CORS support; for production, use a server-side OAuth/API proxy.

## 3-minute demo script

1. Explain that normal task apps miss commitments because they live in conversations.
2. Paste the sample thread and click **Find my promises**.
3. Show the two different signals: “you promised” versus “they asked,” plus the socially-aware next move.
4. Click **draft a message** to show the loop closing.

## Codex collaboration

Codex was used to turn the hackathon rules into a narrow product thesis, choose the promise-detection wedge, scaffold the responsive interface, and iterate the interaction around a fast demo loop. Product decisions (privacy by default, confidence signals, and separating “you promised” from “they asked”) were intentional human-led choices; GPT-5.6 is planned as the extraction and recommendation engine in the next integration pass.
