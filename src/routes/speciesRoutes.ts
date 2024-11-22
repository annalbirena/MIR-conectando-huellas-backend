import { Router } from 'express';
import { SpecieController } from '../controllers/speciesController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';
import validate from '@middlewares/validate';
import { entityNameValidator } from '../validators/base';

const router = Router();
const PREFIX = '/species';

router.get(PREFIX, SpecieController.getSpecies);
router.get(`${PREFIX}/:id`, SpecieController.getSpecieById);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['admin']),
  entityNameValidator,
  validate,
  SpecieController.createSpecie,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(['admin']),
  entityNameValidator,
  validate,
  SpecieController.updateSpecie,
);
router.patch(
  `${PREFIX}/:id/activate`,
  authenticateToken,
  authorizeRoles(['admin']),
  SpecieController.activateSpecie,
);
router.patch(
  `${PREFIX}/:id/deactivate`,
  authenticateToken,
  authorizeRoles(['admin']),
  SpecieController.deactivateSpecie,
);
router.delete(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(['admin']),
  SpecieController.deleteSpecie,
);

export default router;
