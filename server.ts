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

  const isProduction = process.env.NODE_ENV === 'production';
  const __dirname = path.resolve();

  let vite: any;
  if (!isProduction) {
    process.env.DISABLE_HMR = 'true';
    vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // API endpoint for AI notification processing & translation into spoken English
  app.post('/api/translate-and-summarize', async (req, res) => {
    try {
      const { title, body, appName, originalLanguage } = req.body;

      if (!title && !body) {
        return res.status(400).json({ error: 'Notification title or body is required' });
      }

      const prompt = `You are NotifyVoice AI, an intelligent smartphone notification reader and translator.
An incoming notification arrived on the user's phone from app "${appName || 'System'}".
Original Title: "${title || ''}"
Original Body: "${body || ''}"
Original Language: "${originalLanguage || 'auto-detected'}"

Your task:
1. Understand the notification content regardless of language (Marathi, Hindi, Spanish, etc.).
2. Translate and summarize it into a natural, polite, and clear English spoken announcement sentence that is pleasant to hear out loud (e.g., "You have a WhatsApp message from Rahul: Are you coming tonight?").
3. Also provide a category tag (e.g., "Chat", "Call", "Email", "Finance", "Alert", "Social").
4. Rate urgency (High, Medium, Low).

Return ONLY valid JSON matching this schema:
{
  "spokenAnnouncement": "string (the natural English sentence to speak aloud)",
  "shortSummary": "string (brief text summary)",
  "category": "string",
  "urgency": "High | Medium | Low",
  "sender": "string (detected sender name or app)"
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
          spokenAnnouncement: `Notification from ${appName}: ${title} - ${body}`,
          shortSummary: body || title,
          category: 'Alert',
          urgency: 'Medium',
          sender: appName || 'App',
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

  if (isProduction) {
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NotifyVoice AI server running on http://localhost:${PORT}`);
  });
}

startServer();
