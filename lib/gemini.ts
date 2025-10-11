// lib/gemini.ts
import axios from 'axios';

const API_KEY = 'AIzaSyDMKG_PMWGUzgSTsGA0zt4h6HOW1X6p2c4';

export const askGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return 'Error fetching response from Gemini.';
  }
};
