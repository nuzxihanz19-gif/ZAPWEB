'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, UploadCloud, MoveLeft, MoveRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { validateProductData } from '@/utils/validation';

export default function AdminForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    price: '',
    lynkUrl: ''
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [fieldErrors, setFieldErrors] = useState({});

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onDrop = useCallback(acceptedFiles => {
    // Add preview URL to files
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    setFiles(prev => [...prev, ...newFiles]);
    // Clear image error if any
    if (fieldErrors.images) {
      setFieldErrors(prev => ({ ...prev, images: null }));
    }
  }, [fieldErrors]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: (rejectedFiles) => {
        const errors = rejectedFiles.map(f => `${f.file.name}: ${f.errors[0].message}`).join(', ');
        setStatus({ type: 'error', message: `File rejected: ${errors}` });
    }
  });

  const removeFile = (index) => {
    setFiles(prev => {
        const newFiles = [...prev];
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        return newFiles;
    });
  };

  const moveFile = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === files.length - 1)) return;

    setFiles(prev => {
        const newFiles = [...prev];
        const temp = newFiles[index];
        newFiles[index] = newFiles[index + direction];
        newFiles[index + direction] = temp;
        return newFiles;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setFieldErrors({});

    // Client Side Validation
    const validation = validateProductData(formData, files);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setStatus({ type: 'error', message: 'Mohon perbaiki kesalahan pada formulir.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build FormData
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('lynkUrl', formData.lynkUrl);

      files.forEach(file => {
        data.append('images', file);
      });

      // API Call
      // In a real app, you'd get the token from a context or storage
      const token = 'YOUR_JWT_TOKEN_HERE';

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.details || 'Terjadi kesalahan');
      }

      setStatus({ type: 'success', message: 'Produk berhasil ditambahkan!' });

      // Reset form
      setFormData({ name: '', title: '', description: '', price: '', lynkUrl: '' });
      setFiles([]);

      // Redirect after delay (optional)
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'Gagal menyimpan produk.' });
      if (typeof error.message === 'string' && error.message.includes('Validation')) {
          // If server sends detailed validation objects, map them here if structure matches
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Status Message */}
      {status && (
        <div className={`p-4 rounded-md flex items-center gap-2 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Produk *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${fieldErrors.name ? 'border-red-500' : ''}`}
            placeholder="Contoh: Template Toko Online"
          />
          {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul Singkat *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${fieldErrors.title ? 'border-red-500' : ''}`}
            placeholder="Contoh: Modern & Responsif"
          />
          {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Deskripsi *</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${fieldErrors.description ? 'border-red-500' : ''}`}
          placeholder="Jelaskan fitur dan keunggulan produk..."
        />
        {fieldErrors.description && <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Harga (Rp) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${fieldErrors.price ? 'border-red-500' : ''}`}
            placeholder="150000"
          />
          {fieldErrors.price && <p className="mt-1 text-sm text-red-600">{fieldErrors.price}</p>}
        </div>

        {/* Lynk URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Link Produk (Lynk.id/etc) *</label>
          <input
            type="url"
            name="lynkUrl"
            value={formData.lynkUrl}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${fieldErrors.lynkUrl ? 'border-red-500' : ''}`}
            placeholder="https://lynk.id/..."
          />
          {fieldErrors.lynkUrl && <p className="mt-1 text-sm text-red-600">{fieldErrors.lynkUrl}</p>}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk (5-10 Foto) *</label>

        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
                ${fieldErrors.images ? 'border-red-500 bg-red-50' : ''}
            `}
        >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag & drop gambar di sini, atau klik untuk memilih</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP maks 5MB</p>
        </div>
        {fieldErrors.images && <p className="mt-1 text-sm text-red-600">{fieldErrors.images}</p>}

        {/* Previews */}
        {files.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {files.map((file, index) => (
                    <div key={file.preview} className="relative group border rounded-lg overflow-hidden bg-gray-100 aspect-square">
                        <img
                            src={file.preview}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                            onLoad={() => { URL.revokeObjectURL(file.preview) }} // Optional cleanup logic
                        />

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2">
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                title="Hapus"
                            >
                                <X size={16} />
                            </button>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => moveFile(index, -1)}
                                    disabled={index === 0}
                                    className="p-1 bg-white text-gray-800 rounded disabled:opacity-50 hover:bg-gray-200"
                                    title="Geser Kiri"
                                >
                                    <MoveLeft size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveFile(index, 1)}
                                    disabled={index === files.length - 1}
                                    className="p-1 bg-white text-gray-800 rounded disabled:opacity-50 hover:bg-gray-200"
                                    title="Geser Kanan"
                                >
                                    <MoveRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Badge */}
                        {index === 0 && (
                            <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow">
                                Thumbnail
                            </span>
                        )}
                    </div>
                ))}
            </div>
        )}
        <p className="mt-2 text-sm text-gray-500 text-right">{files.length} / 10 Gambar</p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Menyimpan...
            </>
          ) : (
            'Simpan Produk'
          )}
        </button>
      </div>
    </form>
  );
}
