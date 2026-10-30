import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for AI notification processing & translation into spoken English
  app.post('/api/translate-and-summarize', async (req, res) => {
    try {
      const { title, body, appName, originalLanguage } = req.body;

      if (!title && !body) {
        return res.status(400).json({ error: 'Notification title or body is required' });
      }

      const prompt = `You are NotifyVoice AI, an intelligent smartphone notification reader.
An incoming notification arrived on the user's phone from app "${appName || 'System'}".
Original Title: "${title || ''}"
Original Body: "${body || ''}"
Original Language: "${originalLanguage || 'auto-detected'}"

Your task:
1. Identify the sender's name (e.g. "Ritesh"). If there is no person name or it is a phone number, extract the last 4 digits (e.g. "number ending in 4821"). If completely unknown, use "${appName}".
2. Construct the spoken announcement using ONE of these exact formats:
   - "Hello sir, you have a new message from [Sender] on ${appName}."
   - "Hello sir, [Sender] has sent you a message on ${appName}."
   - "Excuse me sir, [Sender] just messaged you on ${appName}."
   - "Hello sir, [Sender] has sent you a new message on ${appName}. Please check your phone."
   (If it's a phone call: "Hello sir, you have an incoming call from [Sender].")

Return ONLY valid JSON matching this schema:
{
  "spokenAnnouncement": "string (one of the exact templates above)",
  "shortSummary": "string (brief summary of message)",
  "category": "string",
  "urgency": "High | Medium | Low",
  "sender": "string (detected sender name or last 4 digits)"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const textResult = response.text || '{}';
      let parsed;
      try {
        parsed = JSON.parse(textResult);
      } catch (e) {
        parsed = {
          spokenAnnouncement: `Hello sir, you have a new message from ${title || appName} on ${appName}.`,
          shortSummary: body || title,
          category: 'Alert',
          urgency: 'Medium',
          sender: title || appName || 'App',
        };
      }

      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini notification translation error:', error);
      res.status(500).json({
        error: error.message || 'Failed to process notification with Gemini',
        spokenAnnouncement: `New notification from ${req.body.appName || 'Phone'}: ${req.body.title || req.body.body}`,
        shortSummary: req.body.body || req.body.title || '',
        category: 'Alert',
        urgency: 'Medium',
        sender: req.body.appName || 'System',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const __dirname = path.resolve();

  if (!isProduction) {
    process.env.DISABLE_HMR = 'true';
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NotifyVoice AI server running on http://localhost:${PORT}`);
  });
}

startServer();
