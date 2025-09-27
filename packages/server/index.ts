//write the initial code to set up an express server
import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const OPEN_API_KEY = process.env.OPEN_API_KEY;

app.get('/', (req:Request, res:Response) => {
  res.send(OPEN_API_KEY);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
