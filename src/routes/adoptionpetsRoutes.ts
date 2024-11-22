import { Router } from 'express';
import { AdoptionPetsController } from '../controllers/adoptionPetsController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/rolesMiddleware';

const router = Router();
const PREFIX = '/adoptionpets';

router.get(PREFIX, AdoptionPetsController.getAdoptionPets);
router.get(`${PREFIX}/:id`, AdoptionPetsController.getAdoptionPetById);
router.get(
  `${PREFIX}/filters/filter`,
  AdoptionPetsController.getAdoptionPetsByFilters,
);
router.get(
  `${PREFIX}/user/:userId`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  AdoptionPetsController.getAdoptionPetsByUserId,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* AdoptPetValidator,
  validate, */
  AdoptionPetsController.createAdoptionPet,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* AdoptPetValidator,
  validate, */
  AdoptionPetsController.updateAdoptionPet,
);

export default router;
