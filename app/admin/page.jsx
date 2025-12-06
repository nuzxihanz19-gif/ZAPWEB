export const metadata = {
  title: 'Admin Panel - Add Product',
  description: 'Add new products to the store',
};

import AdminForm from './AdminForm';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
          <p className="mt-2 text-gray-600">Isi detail produk dan upload gambar.</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <AdminForm />
        </div>
      </div>
    </div>
  );
}
