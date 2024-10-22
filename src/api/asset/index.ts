import { Router } from 'express';

import {
  createAssetHandler,
  deleteAssetHandler,
  getAllAssetsHandler,
  getOneAssetHandler,
  updateAssetHandler,
} from './asset.controller';

const router = Router();

router.get('/', getAllAssetsHandler);
router.get('/:id', getOneAssetHandler);
router.post('/', createAssetHandler);
router.patch('/:id', updateAssetHandler);
router.delete('/:id', deleteAssetHandler);

export default router;
