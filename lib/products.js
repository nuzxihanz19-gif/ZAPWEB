import connectDB from '@/lib/db';
import Product from '@/models/product.model';

export async function getProducts() {
  try {
    await connectDB();
    // Fetch products, sort by newest first
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    // Convert _id and dates to string to avoid serialization issues in Next.js
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
