const fs = require('fs');
import { Request, Response } from 'express';
import { removeImage, uploadImage } from '../services/imageService';

async function uploadSingleImage(req: Request, res: Response) {
  const { path, size } = req.file as Express.Multer.File;
  const maxSize = 1024 * 1024 * 2; // 2mb
  if (size > maxSize) {
    return res.status(400).json({ message: 'File is too large' });
  }
  try {
    const result = await uploadImage(path);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    fs.unlinkSync(path);
  }
}

export async function deleteImage(req: Request, res: Response) {
  const { petId } = req.params;
  console.log(req);
  if (!petId) {
    return res.status(400).json({ message: 'Pet ID is required' });
  }

  try {
    await removeImage(petId);
    return res.status(200).json({ message: 'Image successfully deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete image', error });
  }
}

module.exports = {
  uploadSingleImage,
  deleteImage,
};
