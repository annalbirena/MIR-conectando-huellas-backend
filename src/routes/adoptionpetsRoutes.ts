import { Router } from 'express';
import { AdoptionPetsController } from '../controllers/adoptionPetsController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';
const multer = require('multer');
const { uploadSingleHandler } = require('../controllers/upload.controller');

const router = Router();
const PREFIX = '/adoptionpets';
const upload = multer({ dest: './temp' });

router.get(PREFIX, AdoptionPetsController.getAdoptionPets);
router.get(`${PREFIX}/:id`, AdoptionPetsController.getAdoptionPetById);
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
router.post(
  `${PREFIX}/upload`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  upload.single('image'),
  uploadSingleHandler,
);

export default router;
