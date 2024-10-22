import { Router } from 'express';

import { hasRole, isAuthenticated } from '@auth/auth.controller';
import validate from '@middlewares/validateRequest';
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getOneNoteHandler,
  updateNoteHandler,
} from './note.controller';
import { createNoteSchema } from './note.schema';

const router = Router();

router.get('/', getAllNotesHandler);
router.get('/:id', getOneNoteHandler);
router.delete('/:id', hasRole(['ADMIN']), deleteNoteHandler);
router.post('/', validate(createNoteSchema), createNoteHandler);
router.patch('/:id', updateNoteHandler);

export default router;
