// Common validation logic for both client and server if needed
// Simple checks

export function validateProductData(data, files) {
    const errors = {};

    if (!data.name || data.name.trim().length === 0) errors.name = 'Nama produk wajib diisi';
    if (!data.title || data.title.trim().length === 0) errors.title = 'Judul wajib diisi';
    if (!data.description || data.description.trim().length === 0) errors.description = 'Deskripsi wajib diisi';

    if (!data.price) {
      errors.price = 'Harga wajib diisi';
    } else if (Number(data.price) <= 0) {
      errors.price = 'Harga harus lebih dari 0';
    }

    if (!data.lynkUrl) {
      errors.lynkUrl = 'URL wajib diisi';
    } else {
      try {
        new URL(data.lynkUrl);
      } catch (e) {
        errors.lynkUrl = 'URL tidak valid';
      }
    }

    if (!files || files.length < 5) {
      errors.images = 'Minimal 5 gambar harus diunggah';
    } else if (files.length > 10) {
      errors.images = 'Maksimal 10 gambar diperbolehkan';
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Size check
        if (file.size > MAX_SIZE) {
          errors.images = `File ${file.name} terlalu besar (Maks 5MB)`;
        }

        // MIME type check
        // Note: file.type depends on client browser for FormData,
        // but for server parsing it usually relies on file magic numbers or extension depending on the parser.
        // In this simple validation context, we check the provided type property.
        if (file.type && !ALLOWED_TYPES.includes(file.type)) {
            errors.images = `File ${file.name} format tidak didukung. Gunakan JPG, PNG, atau WEBP.`;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
