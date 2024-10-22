import { Router } from 'express';
import { PetsController } from '../controllers/petsController';

const router = Router();
const PREFIX = '/pets';

router.get(PREFIX, PetsController.getPets);

export default router;
