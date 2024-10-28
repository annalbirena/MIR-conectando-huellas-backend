const fs = require('fs');
import { Request, Response } from 'express';
const { uploadImage } = require('./../services/upload.service');

async function uploadSingleHandler(req: Request, res: Response) {
  console.log('single');
  console.log(req);
  const { path, size } = req.file; // as Express.Multer.File;

  const maxSize = 1024 * 1024 * 2; // 2mb

  if (size > maxSize) {
    fs.unlinkSync(path);
    return res.status(400).json({ message: 'File is too large' });
  }

  try {
    const result = await uploadImage(path);
    pet.image = result.url;
    return res.status(201).json(result.url);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    fs.unlinkSync(path);
  }
}

// async function uploadMultipleHandler(req: Request, res: Response) {
//   const files = req.files; // as Express.Multer.File[];

//   if (!files.length) {
//     return res.status(400).json({ message: 'No files provided' });
//   }

//   try {
//     const promises = files.map((file) => uploadImage(file.path));

//     const results = await Promise.all(promises);

//     return res.status(201).json(results);
//   } catch (error) {
//     return res.status(500).json(error);
//   } finally {
//     files.forEach((file) => fs.unlinkSync(file.path));
//   }
// }

module.exports = {
  uploadSingleHandler,
  //uploadMultipleHandler,
};
