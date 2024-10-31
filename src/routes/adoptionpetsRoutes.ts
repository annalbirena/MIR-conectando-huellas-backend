import { Router } from 'express';
import { AdoptionPetsController } from '../controllers/adoptionPetsController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';

const router = Router();
const PREFIX = '/adoptionpets';

router.get(PREFIX, AdoptionPetsController.getAdoptionPets);
router.get(`${PREFIX}/:id`, AdoptionPetsController.getAdoptionPetById);
router.get(
  `${PREFIX}/filters/filter`,
  AdoptionPetsController.getAdoptionPetsByFilters,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* lostPetValidator,
  validate, */
  AdoptionPetsController.createAdoptionPet,
);

export default router;
