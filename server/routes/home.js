import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.initialData = { ssr: 'SSR Home page from routing' };
  res.react();
});

export default router;
