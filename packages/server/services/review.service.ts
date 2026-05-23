import OpenAI from 'openai';
import type { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.OPEN_API_KEY,
});


export const reviewService = {
  async getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId);
  },

  async summarizeReviews(productId: number): Promise<string> {
    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map(r => r.content).join('\n\n');

    const prompt = `
      Summarize the following customer reviews into a short paragraph
      highlighting key themes, both positive and negative:

      ${joinedReviews}
    `;
    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V4-Flash:fireworks-ai',
      temperature: 0.2,
      messages: [
        { role: 'user', content: prompt },
      ],
    });


    return response.choices[0]?.message?.content ?? ''
  },
};


