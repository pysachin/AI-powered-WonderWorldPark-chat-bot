import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
    } else {
      const reviews = reviewService.getReviews(productId);
      res.json(reviews);
    }
  },

  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (Number.isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID.' });
    } else {
      const summary = await reviewService.summarizeReviews(productId);
      res.status(200).json({ summary: summary });
    }
  },
};
