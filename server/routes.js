import express from 'express';
import home from './routes/home';
import contact from './routes/contact';

const router = express.Router();

router.use('/', home);
router.use('/contact', contact);

export default router;
