import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME &&
                               process.env.CLOUDINARY_API_KEY &&
                               process.env.CLOUDINARY_API_SECRET;

/**
 * Upload a file buffer to storage (Cloudinary or Local)
 * @param {Buffer} buffer - File buffer
 * @param {string} filename - Original filename
 * @param {string} mimeType - File mime type
 * @returns {Promise<object>} - { url, publicId, width, height }
 */
export async function uploadFile(buffer, filename, mimeType) {
  if (isCloudinaryConfigured) {
    return uploadToCloudinary(buffer, filename);
  } else {
    return uploadToLocal(buffer, filename, mimeType);
  }
}

/**
 * Delete a file from storage
 * @param {string} publicId - Public ID or file path
 */
export async function deleteFile(publicId) {
  if (isCloudinaryConfigured) {
    await cloudinary.uploader.destroy(publicId);
  } else {
    // For local, publicId is treated as relative path
    const filePath = path.join(process.cwd(), 'public', publicId);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

// --- Cloudinary Implementation ---

function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        resource_type: 'auto', // auto detect image/video
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height
        });
      }
    );
    uploadStream.end(buffer);
  });
}

// --- Local Disk Implementation ---

async function uploadToLocal(buffer, filename, mimeType) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const ext = path.extname(filename);
  const uniqueName = `${uuidv4()}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  fs.writeFileSync(filePath, buffer);

  // Return "fake" dimensions for local since we don't have an image processor lib like sharp installed
  // In production, use 'sharp' to get dimensions.
  return {
    url: `/uploads/${uniqueName}`,
    publicId: `/uploads/${uniqueName}`,
    width: 800, // Placeholder
    height: 600 // Placeholder
  };
}
