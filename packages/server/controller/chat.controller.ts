import z from 'zod';
import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
  prompt: z
    .string()
    .min(1, 'Prompt is required')
    .max(1000, 'Propmt is too long (max token required 1000)'),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parseResult = chatSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).send(parseResult.error.message);
      return;
    }
    try {
      const { prompt } = req.body;
      const response = await chatService.botResponse(prompt);
      res.json({ message: response.message });
    } catch (error) {
      res.status(500).json({ errpr: 'failed to generate response !!!' });
    }
  },
};
