import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const preloadedState = { query: { main: 'SSR CONTACT' } };
  res.react(preloadedState);
});

export default router;
