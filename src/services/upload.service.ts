/* const cloudinary = require('cloudinary').v2; */
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image: any): Promise<UploadApiResponse> {
  console.log({ image });
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'upload-images',
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.log('🚀 ~ file: upload.service.js:42 ~ uploadImage ~ error', error);
    throw error;
  }
}

module.exports = {
  uploadImage,
};
