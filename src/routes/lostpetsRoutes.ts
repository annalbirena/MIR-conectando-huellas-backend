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
router.get(`${PREFIX}/pets/filter`, LostPetsController.getLostPetsByFilters); // Route for filtering

router.post(
  PREFIX,
  authenticateToken,
  authorizeRoles(['ADMIN', 'USER']),
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

  upload.single('image'),
  uploadSingleHandler,
);
// router.post(
//   `${PREFIX}/upload/multiple`,
//   authenticateToken,
//   authorizeRoles(['admin', 'user']),
//   upload.array('files'),
//   uploadMultipleHandler
// );

export default router;
