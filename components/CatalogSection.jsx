'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Search } from 'lucide-react';

export default function CatalogSection({ products }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="katalog" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Katalog <span className="text-emerald-500">Template</span>
          </h2>
          <p className="text-gray-400 text-lg">Pilih template yang sesuai dengan kebutuhan bisnis atau project Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300 shadow-xl group">
              <div
                className="relative aspect-[4/3] cursor-pointer overflow-hidden border-b border-gray-700"
                onClick={() => setSelectedImage(product.images[0]?.url || 'https://via.placeholder.com/800x600')}
              >
                {/* Fallback image logic handled by Next.js Image or conditional rendering */}
                <img
                  src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full font-medium">
                        <Search size={18} /> Lihat Detail
                    </span>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {product.title}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">{product.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <p className="text-lg font-bold text-emerald-500">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <a
                    href={product.lynkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Pesan
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Fallback if no products */}
          {products.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada produk yang diupload.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
