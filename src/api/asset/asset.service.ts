import { PrismaClient } from '@prisma/client';

import type { Asset } from './asset.type';

const prisma = new PrismaClient();

export async function getAllAssets(): Promise<Asset[]> {
  const assets = await prisma.asset.findMany();
  return assets;
}

export async function getOneAssetById(id: string): Promise<Asset | null> {
  const asset = await prisma.asset.findUnique({
    where: { id },
  });
  return asset;
}

export async function deleteAssetById(id: string): Promise<Asset> {
  const assetDeleted = prisma.asset.delete({
    where: { id },
  });

  return assetDeleted;
}

export async function createAsset(asset: Asset): Promise<Asset> {
  const newAsset = await prisma.asset.create({
    data: asset,
  });

  return newAsset;
}

export async function updateAssetById(
  id: string,
  assetToUpdate: Asset,
): Promise<Asset> {
  const assetUpdated = await prisma.asset.update({
    where: { id },
    data: assetToUpdate,
  });

  return assetUpdated;
}
