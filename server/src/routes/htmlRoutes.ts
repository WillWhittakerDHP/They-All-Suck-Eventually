//!dropped in
import express, { type Request, type Response } from 'express';import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const router = Router();
//!This is the file that needed editing
// // TODO: Define route to serve index.html
// 25/server/src/routes/htmlRoutes
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

router.get('/feedback', (_req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../../client/dist/feedback.html'))
);

export default router;
