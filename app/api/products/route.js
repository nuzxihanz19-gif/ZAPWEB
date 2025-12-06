import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/product.model';
import { verifyAuth } from '@/lib/auth';
import { uploadFile, deleteFile } from '@/lib/storage';
import { validateProductData } from '@/utils/validation';

// Simple in-memory rate limiter for demonstration purposes
// In production, use Redis or a proper library (upstash/ratelimit)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;
const rateLimitMap = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    if (now - record.startTime > RATE_LIMIT_WINDOW) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    if (record.count >= MAX_REQUESTS) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(request) {
  // 0. Rate Limiting (based on IP)
  // Note: 'x-forwarded-for' is usually available in production
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  // 1. Auth Check
  const user = await verifyAuth(request);
  if (!user) {
    // Uncomment below to enforce:
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    // 2. Parse FormData
    const formData = await request.formData();

    // Extract fields
    const name = formData.get('name');
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const lynkUrl = formData.get('lynkUrl');

    // Extract files
    const files = formData.getAll('images');

    // 3. Validation
    const validation = validateProductData({ name, title, description, price, lynkUrl }, files);
    if (!validation.isValid) {
      return NextResponse.json({ error: 'Validation Error', details: validation.errors }, { status: 400 });
    }

    // 4. File Upload (Transactional-ish)
    const uploadedImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Convert Blob/File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await uploadFile(buffer, file.name, file.type);

        uploadedImages.push({
          url: result.url,
          publicId: result.publicId, // Store for deletion if needed
          width: result.width,
          height: result.height,
          isThumbnail: i === 0 // First image is thumbnail
        });
      }
    } catch (uploadError) {
      console.error('Upload Failed, rolling back...', uploadError);
      // Rollback: delete already uploaded files
      for (const img of uploadedImages) {
        await deleteFile(img.publicId);
      }
      return NextResponse.json({ error: 'File upload failed. Please try again.' }, { status: 500 });
    }

    // 5. Database Save
    const newProduct = await Product.create({
      name,
      title,
      description,
      price: Number(price),
      lynkUrl,
      images: uploadedImages
    });

    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error('Server Error:', error);
    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
