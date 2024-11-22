import { DeleteApiResponse, UploadApiResponse } from 'cloudinary';
import prisma from './prisma';
const cloudinary = require('../utils/cloudinary');

export async function uploadImage(image: string): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'pets-photos',
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.log('🚀 ~ file: upload.service.js:42 ~ uploadImage ~ error', error);
    throw error;
  }
}

export async function removeImage(petId: string): Promise<DeleteApiResponse> {
  try {
    const pet = await prisma.pets.findUnique({
      where: { id: petId },
    });

    const imageId = pet?.imageId;
    const result = await cloudinary.uploader.destroy(imageId);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

module.exports = {
  uploadImage,
  removeImage,
};
