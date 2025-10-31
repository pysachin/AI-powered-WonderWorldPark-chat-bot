import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/fireworks-ai/inference/v1',
  apiKey: process.env.OPEN_API_KEY,
});

type BotResponse = {
  message: string;
};

export const chatService = {
  async botResponse(prompt: string): Promise<BotResponse> {
    const response = await client.chat.completions.create({
      model: 'accounts/fireworks/models/deepseek-v3-0324',
      messages: [{ role: 'user', content: prompt }],
    });
    return {
      message: response.choices[0]?.message?.content ?? '',
    };
  },
};
