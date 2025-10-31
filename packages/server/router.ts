import express from 'express';
import { chatController } from './controller/chat.controller';

const router = express.Router();

router.post('/api/chat', chatController.sendMessage);

export default router;
