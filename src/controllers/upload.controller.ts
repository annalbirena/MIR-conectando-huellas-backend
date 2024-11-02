const fs = require('fs');
import { Request, Response } from 'express';
import { uploadImage } from '../services/upload.service';

async function uploadSingleHandler(req: Request, res: Response) {
  const { path, size } = req.file as Express.Multer.File;
  const maxSize = 1024 * 1024 * 2; // 2mb
  if (size > maxSize) {
    return res.status(400).json({ message: 'File is too large' });
  }
  try {
    const result = await uploadImage(path);
    return res.json(result.url);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    fs.unlinkSync(path);
  }
}

module.exports = {
  uploadSingleHandler,
};
