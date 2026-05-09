import type { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
  async getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId);
  },

  async summarizeReviews(productId: number): Promise<string> {
    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map(r => r.content).join('\n\n');
    const prompt = `
      Summarize the following customer reviews into a short paragraph
    `;
    const summary = 'This is placeholder summary';
    return summary;
  },
};
