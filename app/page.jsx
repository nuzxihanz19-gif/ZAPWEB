import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Ziyad Template Studio Admin</h1>
      <Link href="/admin" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go to Admin Panel
      </Link>
    </div>
  )
}
