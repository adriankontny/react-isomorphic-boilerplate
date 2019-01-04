import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.preloadedState = { query: { main: 'SSR HOME' } };
  res.react();
});

export default router;
