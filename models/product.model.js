import mongoose from 'mongoose';
import slugify from 'slugify';

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String }, // Cloudinary public_id or filename
  width: { type: Number },
  height: { type: Number },
  isThumbnail: { type: Boolean, default: false }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true,
    maxlength: [100, 'Nama produk maksimal 100 karakter']
  },
  title: {
    type: String,
    required: [true, 'Judul singkat wajib diisi'],
    trim: true,
    maxlength: [100, 'Judul maksimal 100 karakter']
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi wajib diisi']
  },
  price: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [1, 'Harga harus lebih dari 0']
  },
  lynkUrl: {
    type: String,
    required: [true, 'URL Lynk wajib diisi'],
    match: [/^https?:\/\/.+/, 'URL tidak valid']
  },
  images: {
    type: [ImageSchema],
    validate: {
      validator: function(v) {
        return v && v.length >= 5 && v.length <= 10;
      },
      message: 'Jumlah gambar harus antara 5 dan 10'
    }
  }
}, {
  timestamps: true
});

// Middleware to generate slug before validate/save
ProductSchema.pre('validate', function(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name + '-' + this.title, { lower: true, strict: true });
  }
  next();
});

// Create index
ProductSchema.index({ createdAt: -1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
