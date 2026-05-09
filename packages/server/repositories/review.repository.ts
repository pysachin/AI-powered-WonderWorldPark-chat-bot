import type { Review } from '../generated/prisma/client';
import { prisma } from '../services/prisma-client';

export const reviewRepository = {
  async getReviews(productId: number, limit?: number): Promise<Review[]> {
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },
};
