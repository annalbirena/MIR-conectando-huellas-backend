import { Router } from 'express';
import { LostPetsController } from '../controllers/lostPetsController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';
const multer = require('multer');
const { uploadSingleHandler } = require('../controllers/upload.controller');

const router = Router();
const PREFIX = '/lostpets';
const upload = multer({ dest: './temp' });

router.get(PREFIX, LostPetsController.getLostPets);
router.get(`${PREFIX}/:id`, LostPetsController.getLostPetById);
router.get(
  `${PREFIX}/user/:userId`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  LostPetsController.getLostPetsByUserId,
);
router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* lostPetValidator,
  validate, */
  LostPetsController.createLostPet,
);
router.put(
  `${PREFIX}/:id`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  /* lostPetValidator,
  validate, */
  LostPetsController.updateLostPet,
);
router.post(
  `${PREFIX}/upload`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  upload.single('image'),
  uploadSingleHandler,
);

export default router;
