import express from 'express-promise-router';

const router = express();

router.get(`/`, (req, res) => {
  res.initialData = { ssr: 'SSR Home page from routing' }
  res.react();
});
module.exports = router;