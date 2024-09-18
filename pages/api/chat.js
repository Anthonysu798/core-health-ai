import { getSession } from 'next-auth/react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI assistant specialized in fitness, health, real-time progress tracking, fitness wearables, fitness goals, fitness routines, and diet. Only respond to queries related to these topics. If asked about anything else, politely redirect the user to ask about fitness-related topics." },
          { role: "user", content: message }
        ],
      });

      const aiResponse = completion.choices[0].message.content;
      res.status(200).json({ message: aiResponse });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Failed to get AI response' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}