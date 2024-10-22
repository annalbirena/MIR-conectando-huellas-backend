import type { Request, Response } from 'express';

import {
  createAsset,
  deleteAssetById,
  getAllAssets,
  getOneAssetById,
  updateAssetById,
} from './asset.service';

export async function getAllAssetsHandler(req: Request, res: Response) {
  const assets = await getAllAssets();
  res.json(assets);
}

export async function getOneAssetHandler(req: Request, res: Response) {
  const { id } = req.params;
  const asset = await getOneAssetById(id);

  if (!asset) {
    res.status(404).json({
      error: `Asset with id:${id} not found`,
    });
  } else {
    res.json(asset);
  }
}

export async function deleteAssetHandler(req: Request, res: Response) {
  const { id } = req.params;

  const confirmTransaction = await deleteAssetById(id);

  res.status(200).json(confirmTransaction);
}

export async function createAssetHandler(req: Request, res: Response) {
  const data = req.body;

  const newAsset = await createAsset(data);
  res.status(201).json(newAsset);
}

export async function updateAssetHandler(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const updatedAsset = await updateAssetById(id, data);

  if (!updatedAsset) {
    res.status(404).json({
      error: `Asset with id:${id} not found`,
    });
  } else {
    res.json(updatedAsset);
  }
}
