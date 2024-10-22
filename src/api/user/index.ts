import { Router } from 'express';

import { createUserHandler, getAllUserHandler } from './user.controller';

const router = Router();

router.get('/', getAllUserHandler);
// router.get('/:id', );
// router.delete('/:id', );
router.post('/', createUserHandler);
// router.patch('/:id', );

export default router;
