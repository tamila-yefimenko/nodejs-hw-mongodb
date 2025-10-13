import cloudinary from 'cloudinary';
import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  cloud_name: getEnvVar(CLOUDINARY.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);

    return response.secure_url;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to upload image!');
  }
};
