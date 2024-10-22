import { Router } from 'express';

import { loginHandler, activateAccountHandler } from './local.controller';

const router = Router();

// POST -> /auth/local/login
router.post('/login', loginHandler);
router.patch('/activate/:token', activateAccountHandler);
router.patch('/forgot-password', (req, res) => {});

export default router;
