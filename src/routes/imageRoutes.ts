import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/rolesMiddleware';

const multer = require('multer');
const {
  uploadSingleImage,
  deleteImage,
} = require('../controllers/imageController');

const router = Router();
const PREFIX = '/images';
const upload = multer({ dest: './temp' });

router.post(
  `${PREFIX}/upload`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  upload.single('image'),
  uploadSingleImage,
);
router.delete(
  `${PREFIX}/delete/:petId`,
  authenticateToken,
  authorizeRoles(['admin', 'user']),
  deleteImage,
);

export default router;
