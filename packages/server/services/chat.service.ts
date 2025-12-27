import OpenAI from 'openai';
import template from '../prompts/chatbot.txt';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/fireworks-ai/inference/v1',
  apiKey: process.env.OPEN_API_KEY,
});

const parkInfo = fs.readFileSync(
  path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
  'utf-8'
);

const systemPrompt = template.replace('{{parkInfo}}', parkInfo);

type BotResponse = {
  message: string;
};

export const chatService = {
  async botResponse(prompt: string): Promise<BotResponse> {
    const response = await client.chat.completions.create({
      model: 'accounts/fireworks/models/deepseek-v3-0324',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });
    return {
      message: response.choices[0]?.message?.content ?? '',
    };
  },
};
