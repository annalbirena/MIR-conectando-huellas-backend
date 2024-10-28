import { Router } from 'express';
import { LostPetsController } from '../controllers/lostPetsController';
import { authenticateToken } from '@middlewares/authMiddleware';
import { authorizeRoles } from '@middlewares/rolesMiddleware';
const multer = require('multer');
const {
  uploadMultipleHandler,
  uploadSingleHandler,
} = require('../controllers/upload.controller');
const router = Router();
const PREFIX = '/lostpets';
const upload = multer({ dest: './temp' });
router.get(PREFIX, LostPetsController.getLostPets);
router.get(`${PREFIX}/:id`, LostPetsController.getLostPetById);
router.get(`${PREFIX}/pets/filter`, LostPetsController.getLostPetsByFilters); // Route for filtering

router.post(
  PREFIX,
  //authenticateToken,
  //authorizeRoles(['admin', 'user']),
  /* lostPetValidator,
  validate, */
  upload.single('image'),
  LostPetsController.createLostPet,
);

router.post(
  `${PREFIX}/upload`,

  upload.single('file'),
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
