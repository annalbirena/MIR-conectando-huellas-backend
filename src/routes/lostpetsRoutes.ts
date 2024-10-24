import { Router } from 'express';
import { LostPetsController } from '../controllers/lostPetsController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';

const router = Router();
const PREFIX = '/lostpets';

router.get(PREFIX, LostPetsController.getLostPets);
router.get(`${PREFIX}/:id`, LostPetsController.getLostPetById);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* lostPetValidator,
  validate, */
  LostPetsController.createLostPet,
);

export default router;
