import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.preloadedState = { query: { main: 'SSR CONTACT' } };
  res.react();
});

export default router;
